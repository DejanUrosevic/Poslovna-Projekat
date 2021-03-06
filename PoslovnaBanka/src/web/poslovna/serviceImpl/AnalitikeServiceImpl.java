package web.poslovna.serviceImpl;

import java.io.StringReader;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Analitike;
import web.poslovna.model.xml.ListaAnalitika;
import web.poslovna.service.AnalitikeService;

@Service
public class AnalitikeServiceImpl implements AnalitikeService{

	@Override
	public Analitike findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Analitike> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<Analitike> lista = new ArrayList<Analitike>();
		//																								1								2							3							4							5							6							7							8							9								10							11								12							13							14						15								16								17							18							19								20							21					22					23										
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT ANALITIKA_IZVODA.ASI_BROJSTAVKE, ANALITIKA_IZVODA.VPL_OZNAKA, ANALITIKA_IZVODA.NM_SIFRA, ANALITIKA_IZVODA.ID_VALUTE, ANALITIKA_IZVODA.DSR_IZVOD, ANALITIKA_IZVODA.ASI_DUZNIK, ANALITIKA_IZVODA.ASI_SVRHA, ANALITIKA_IZVODA.ASI_POVERILAC, ANALITIKA_IZVODA.ASI_DATPRI, ANALITIKA_IZVODA.ASI_DATVAL, ANALITIKA_IZVODA.ASI_RACDUZ, ANALITIKA_IZVODA.ASI_MODZAD, ANALITIKA_IZVODA.ASI_PBZAD, ANALITIKA_IZVODA.ASI_RACPOV, ANALITIKA_IZVODA.ASI_MODODOB, ANALITIKA_IZVODA.ASI_PBODO, ANALITIKA_IZVODA.ASI_HITNO, ANALITIKA_IZVODA.ASI_IZNOS, ANALITIKA_IZVODA.ASI_TIPGRESKE, ANALITIKA_IZVODA.ASI_STATUS, NASELJENO_MESTO.NM_NAZIV, VALUTE.VA_NAZIV, VRSTE_PLACANJA.VPL_NAZIV  FROM ANALITIKA_IZVODA LEFT OUTER JOIN NASELJENO_MESTO ON ANALITIKA_IZVODA.NM_SIFRA = NASELJENO_MESTO.NM_SIFRA LEFT OUTER JOIN VALUTE ON ANALITIKA_IZVODA.ID_VALUTE = VALUTE.ID_VALUTE LEFT OUTER JOIN VRSTE_PLACANJA ON VRSTE_PLACANJA.VPL_OZNAKA = ANALITIKA_IZVODA.VPL_OZNAKA;");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new Analitike(rs.getInt(1), //id int
					rs.getString(6), //duznik string
					rs.getString(7), //svrha string
					rs.getString(8), //poverilac string
					rs.getDate(9), //datumPrijema date
					rs.getDate(10), //datumValute date
					rs.getString(11), //racunDuznika string
					rs.getDouble(12), //modelZaduzenja double
					rs.getString(13), //pbZaduzenja string
					rs.getString(14), //racunPoverioca string
					rs.getDouble(15), //modelOdobrenja double
					rs.getString(16), //pbOdobrenja string
					rs.getBoolean(17), //hitno boolean
					rs.getDouble(18), //iznos double
					rs.getDouble(19), //tipGreske double
					rs.getString(20), //status string 
					rs.getDouble(2), //idVrstePlacanja double
					rs.getString(23), //nazivPlacanja string
					rs.getInt(3),  //idNaselja int
					rs.getString(21), //naselje string
					rs.getInt(4), //idValute int
					rs.getString(22), //valuta string
					rs.getInt(5))); //idIzvoda int
		}
		
		return lista;
	}

	@Override
	public void save(Analitike object) throws SQLException 
	{
		Integer dnevnoStanjeID = null;
		Double proveraStanja = null;
		Double tipGreske = 1.0;
	
		//deo za izvlacenje iz racuna klijenata
		
		
		PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("SELECT dnevno_stanje_racuna.ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE FROM DNEVNO_STANJE_RACUNA WHERE " +
				"dnevno_stanje_racuna.ID_RACUNA = '" + object.getIdRacunaDuznika() + "'", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY); 
		ResultSet rs2 = stmt2.executeQuery();
		
		PreparedStatement stmt5 = DBConnection.getConnection().prepareStatement("SELECT dnevno_stanje_racuna.ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE FROM DNEVNO_STANJE_RACUNA WHERE " +
				"dnevno_stanje_racuna.ID_RACUNA = '" + object.getIdRacunaPoverioca() + "'", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
		ResultSet rs5 = stmt5.executeQuery();
		
		
		if(!rs2.next())
		{
			tipGreske = 8.0;
		}
		else if(!rs5.next())
		{
			tipGreske = 8.0;
		}
		else
		{
			rs2.beforeFirst();
			rs5.beforeFirst();
		}
		
		if(tipGreske == 1 && object.getHitno())
		{
				if(rs2.last())
				{
					dnevnoStanjeID = rs2.getInt(1);
					proveraStanja = rs2.getDouble("DSR_NOVOSTANJE") - object.getIznos();
					
					if(proveraStanja >= 0)
					{
						PreparedStatement stmt3 = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
						stmt3.setInt(1, object.getIdRacunaDuznika());
						stmt3.setDate(2, new Date(new java.util.Date().getTime()));
						stmt3.setDouble(3, rs2.getDouble("DSR_NOVOSTANJE"));
						stmt3.setDouble(4, 0.0);
						stmt3.setDouble(5, object.getIznos());
						stmt3.setDouble(6, proveraStanja);
						stmt3.executeUpdate();
						stmt3.close();
						
						DBConnection.getConnection().commit();
						if(rs5.last())
						{
							PreparedStatement stmt4 = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
							stmt4.setInt(1, object.getIdRacunaPoverioca());
							stmt4.setDate(2, new Date(new java.util.Date().getTime()));
							stmt4.setDouble(3, rs5.getDouble("DSR_NOVOSTANJE"));
							stmt4.setDouble(4, object.getIznos());
							stmt4.setDouble(5, 0.0);
							stmt4.setDouble(6, rs5.getDouble("DSR_NOVOSTANJE") + object.getIznos());
							stmt4.executeUpdate();
							stmt4.close();
							
							DBConnection.getConnection().commit();
						}
					}
					else
					{
						tipGreske = 2.0;
					}
				}
		}
		else
		{
			
		}
		
		
		
		
		PreparedStatement stmt6 = DBConnection.getConnection().prepareStatement("SELECT * FROM DNEVNO_STANJE_RACUNA WHERE " +
				"ID_RACUNA = '" + object.getIdRacunaDuznika() + "'", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
		ResultSet rs6 = stmt6.executeQuery();
		
		Integer redniBrojStanjaRacuna = null;
		
		rs6.afterLast();
	    while(rs6.previous())
	    {
	    	redniBrojStanjaRacuna = rs6.getInt("DSR_IZVOD");
	    	break;
	    }

		
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO ANALITIKA_IZVODA (ASI_BROJSTAVKE, VPL_OZNAKA, NM_SIFRA, ID_VALUTE, DSR_IZVOD, ASI_DUZNIK, ASI_SVRHA, ASI_POVERILAC, ASI_DATPRI, ASI_DATVAL, ASI_RACDUZ, ASI_MODZAD, ASI_PBZAD, ASI_RACPOV, ASI_MODODOB, ASI_PBODO, ASI_HITNO, ASI_IZNOS, ASI_TIPGRESKE, ASI_STATUS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
		stmt.setInt(1, object.getId());
		stmt.setDouble(2, object.getIdVrstePlacanja());
		stmt.setInt(3, object.getIdNaselje());
		stmt.setInt(4, object.getIdValute());
		stmt.setInt(5, redniBrojStanjaRacuna);
		stmt.setString(6, object.getDuznik());
		stmt.setString(7, object.getSvrha());
		stmt.setString(8, object.getPoverilac());
		stmt.setDate(9, object.getDatumPrijema());
		stmt.setDate(10, object.getDatumValute());
		stmt.setString(11, object.getRacunDuznika());
		stmt.setDouble(12, object.getModelZaduzenja());
		stmt.setString(13, object.getPbZaduzenja());
		stmt.setString(14, object.getRacunPoverioca());
		stmt.setDouble(15, object.getModelOdobrenja());
		stmt.setString(16, object.getPbOdobrenja());
		stmt.setBoolean(17, object.getHitno());
		stmt.setDouble(18, object.getIznos());
		stmt.setDouble(19, tipGreske);
		if(object.getHitno())
		{
			stmt.setString(20, "e");
		}
		else
		{
			stmt.setString(20, "p");
		}
		
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit();  
		
	    
	    if(object.getHitno()){
			PreparedStatement rtgs = DBConnection.getConnection().prepareStatement("INSERT INTO KLIRING (KRI_DATUM_VALUTE, KRI_DATUM, KRI_SIFRA, ID_RACUNA, RAC_ID_RACUNA, KRI_UKUPNO) VALUES (?, ?, ?, ?, ?, ?);");
			rtgs.setDate(1, new Date(new java.util.Date().getTime()));
			rtgs.setDate(2, new Date(new java.util.Date().getTime()));
			rtgs.setString(3, "MT-103");
			rtgs.setInt(4, object.getIdRacunaDuznika());
			rtgs.setInt(5, object.getIdRacunaPoverioca());
			rtgs.setDouble(6, object.getIznos());
			rtgs.executeUpdate();
			DBConnection.getConnection().commit();
			
			PreparedStatement rtgsId = DBConnection.getConnection().prepareStatement("select kri_id from kliring", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rsIdKliring = rtgsId.executeQuery();
			
			if(rsIdKliring.last())
			{
				PreparedStatement analitikaRtgs = DBConnection.getConnection().prepareStatement("INSERT INTO ANALITIKE_ZA_KLIRING (KRI_ID, KRI_SIFRA, ASI_BROJSTAVKE) VALUES (?, ?, ?);");
				analitikaRtgs.setInt(1, rsIdKliring.getInt(1));
				analitikaRtgs.setString(2, "MT-103");
				analitikaRtgs.setInt(3, object.getId());
				analitikaRtgs.executeUpdate();
				DBConnection.getConnection().commit();
			}
			
			
		}
	    /*else
	    {
	    	//ovde cemo za kliring
	    	PreparedStatement kliring = DBConnection.getConnection().prepareStatement("INSERT INTO KLIRING (KRI_DATUM_VALUTE, KRI_DATUM, KRI_SIFRA, ID_RACUNA, RAC_ID_RACUNA, KRI_UKUPNO) VALUES (?, ?, ?, ?, ?, ?);");
	    	kliring.setDate(1, new Date(new java.util.Date().getTime()));
	    	kliring.setDate(2, new Date(new java.util.Date().getTime()));
	    	kliring.setString(3, "MT-102");
	    	kliring.setInt(4, object.getIdRacunaDuznika());
	    	kliring.setInt(5, object.getIdRacunaPoverioca());
	    	kliring.setDouble(6, object.getIznos());
	    	kliring.executeUpdate();
	    	
			DBConnection.getConnection().commit();
			
			PreparedStatement analitikaKliring = DBConnection.getConnection().prepareStatement("INSERT INTO ANALITIKE_ZA_KLIRING (KRI_SIFRA, ASI_BROJSTAVKE) VALUES (?, ?);");
			analitikaKliring.setString(1, "MT-102");
			analitikaKliring.setInt(2, object.getId());
			analitikaKliring.executeUpdate();
			
			DBConnection.getConnection().commit();
	    }*/
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Analitike object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Analitike> pretraga(String postPayload) throws ParseException, SQLException 
	{
		// TODO Auto-generated method stub convert(date, KRI_DATUM_VALUTE) = convert(date,'"+ datumValute+ "',120)
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(postPayload);
		
		Integer sifra = -1;
		String duznik = "";
		String svrha = "";
		String poverilac = "";
		String valuta = "";
		Date datumValute = new Date(dateFormat.parse("9999-11-11").getTime());
		Double iznos = -1.0;
		String racunDuznika = "";
		Double modelZaduzenja = -1.0;
		String pbZaduzenje = "";
		String racunPoverioca = "";
		Double modelOdobrenja = -1.0;
		String pbOdobrenja = "";
		String nazivPlacanja = "";
		String naselje = "";
		Date datumPrijema = new Date(dateFormat.parse("9999-11-11").getTime());
		Boolean hitno = false;
		Double tipGreske = -1.0;
		String status = "";
		
		try
		{
			sifra = json.getInt("sifra");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			duznik = json.getString("duznik");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			svrha = json.getString("svrha");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			valuta = json.getString("valuta");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			String[] datum = (json.getString("datumValute")).split("T");
			datumValute = new Date((dateFormat.parse(datum[0])).getTime());
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			iznos = json.getDouble("iznos");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			racunDuznika = json.getString("racunDuznika");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			modelZaduzenja = json.getDouble("modelZaduzenja");
		}
		catch(Exception e)
		{
			
		}
		try
		{
			pbZaduzenje = json.getString("pbZaduzenje");
		}
		catch(Exception e)
		{
			
		}
		try
		{
			racunPoverioca = json.getString("racunPoverioca");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			modelOdobrenja = json.getDouble("modelOdobrenja");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivPlacanja = json.getString("nazivPlacanja");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			naselje = json.getString("naselje");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			String[] datum = (json.getString("datumPrijema")).split("T");
			datumPrijema = new Date((dateFormat.parse(datum[0])).getTime());
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			hitno = json.getBoolean("hitno");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			tipGreske = json.getDouble("tipGreske");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			status = json.getString("status");
		}
		catch(Exception e)
		{
			
		}
		
		List<Analitike> lista = new ArrayList<Analitike>();
			//																								1								2							3							4							5							6							7							8							9								10							11								12							13							14						15								16								17							18							19								20							21					22					23										
			PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT ANALITIKA_IZVODA.ASI_BROJSTAVKE, ANALITIKA_IZVODA.VPL_OZNAKA, ANALITIKA_IZVODA.NM_SIFRA, ANALITIKA_IZVODA.ID_VALUTE, ANALITIKA_IZVODA.DSR_IZVOD, ANALITIKA_IZVODA.ASI_DUZNIK, ANALITIKA_IZVODA.ASI_SVRHA, ANALITIKA_IZVODA.ASI_POVERILAC, ANALITIKA_IZVODA.ASI_DATPRI, ANALITIKA_IZVODA.ASI_DATVAL, ANALITIKA_IZVODA.ASI_RACDUZ, ANALITIKA_IZVODA.ASI_MODZAD, ANALITIKA_IZVODA.ASI_PBZAD, ANALITIKA_IZVODA.ASI_RACPOV, ANALITIKA_IZVODA.ASI_MODODOB, ANALITIKA_IZVODA.ASI_PBODO, ANALITIKA_IZVODA.ASI_HITNO, ANALITIKA_IZVODA.ASI_IZNOS, ANALITIKA_IZVODA.ASI_TIPGRESKE, ANALITIKA_IZVODA.ASI_STATUS, NASELJENO_MESTO.NM_NAZIV, VALUTE.VA_NAZIV, VRSTE_PLACANJA.VPL_NAZIV  FROM ANALITIKA_IZVODA LEFT OUTER JOIN NASELJENO_MESTO ON ANALITIKA_IZVODA.NM_SIFRA = NASELJENO_MESTO.NM_SIFRA LEFT OUTER JOIN VALUTE ON ANALITIKA_IZVODA.ID_VALUTE = VALUTE.ID_VALUTE LEFT OUTER JOIN VRSTE_PLACANJA ON VRSTE_PLACANJA.VPL_OZNAKA = ANALITIKA_IZVODA.VPL_OZNAKA "
					+ " WHERE ANALITIKA_IZVODA.ASI_BROJSTAVKE = '" + sifra + "' OR NASELJENO_MESTO.NM_NAZIV = '" + naselje + "' "
					+ " OR VALUTE.VA_NAZIV = '" + valuta + "' OR ANALITIKA_IZVODA.ASI_DUZNIK = '" + duznik + "' "
					+ " OR ANALITIKA_IZVODA.ASI_SVRHA = '" + svrha + "' OR ANALITIKA_IZVODA.ASI_POVERILAC = '" + poverilac + "' "
					+ " OR convert(date, ANALITIKA_IZVODA.ASI_DATPRI) = convert(date,'"+ datumPrijema+ "',120) OR convert(date, ANALITIKA_IZVODA.ASI_DATVAL) = convert(date,'"+ datumValute+ "',120)"
					+ " OR ANALITIKA_IZVODA.ASI_RACDUZ = '" + racunDuznika + "' OR ANALITIKA_IZVODA.ASI_MODZAD = " + modelZaduzenja + ""
					+ " OR ANALITIKA_IZVODA.ASI_PBZAD = '" + pbZaduzenje + "' OR ANALITIKA_IZVODA.ASI_RACPOV = '" + racunPoverioca + "' "
					+ " OR ANALITIKA_IZVODA.ASI_MODODOB = " + modelOdobrenja + " OR ANALITIKA_IZVODA.ASI_PBODO = '" + pbOdobrenja + "' "
					+ " OR ANALITIKA_IZVODA.ASI_HITNO = '" + hitno + "' OR ANALITIKA_IZVODA.ASI_IZNOS = " + iznos + " OR ANALITIKA_IZVODA.ASI_TIPGRESKE = " + tipGreske + ""
					+ " OR ANALITIKA_IZVODA.ASI_STATUS = '" + status + "' OR VRSTE_PLACANJA.VPL_NAZIV = '" + nazivPlacanja + "';");
			ResultSet rs = stmt.executeQuery();
			while(rs.next()){
				lista.add(new Analitike(rs.getInt(1), //id int
						rs.getString(6), //duznik string
						rs.getString(7), //svrha string
						rs.getString(8), //poverilac string
						rs.getDate(9), //datumPrijema date
						rs.getDate(10), //datumValute date
						rs.getString(11), //racunDuznika string
						rs.getDouble(12), //modelZaduzenja double
						rs.getString(13), //pbZaduzenja string
						rs.getString(14), //racunPoverioca string
						rs.getDouble(15), //modelOdobrenja double
						rs.getString(16), //pbOdobrenja string
						rs.getBoolean(17), //hitno boolean
						rs.getDouble(18), //iznos double
						rs.getDouble(19), //tipGreske double
						rs.getString(20), //status string 
						rs.getDouble(2), //idVrstePlacanja double
						rs.getString(23), //nazivPlacanja string
						rs.getInt(3),  //idNaselja int
						rs.getString(21), //naselje string
						rs.getInt(4), //idValute int
						rs.getString(22), //valuta string
						rs.getInt(5))); //idIzvoda int
			}
			
			return lista;
	}

	@Override
	public void doClearing() throws SQLException 
	{
		
		
		PreparedStatement kliring = DBConnection.getConnection().prepareStatement("INSERT INTO KLIRING (KRI_DATUM_VALUTE, KRI_DATUM, KRI_SIFRA, ID_RACUNA, RAC_ID_RACUNA, KRI_UKUPNO) VALUES (?, ?, ?, ?, ?, ?);");
    	kliring.setDate(1, new Date(new java.util.Date().getTime()));
    	kliring.setDate(2, new Date(new java.util.Date().getTime()));
    	kliring.setString(3, "MT-102");
    	kliring.setInt(4, 1);
    	kliring.setInt(5, 1);
    	kliring.setDouble(6, 0.0);
    	kliring.executeUpdate();
    	
		DBConnection.getConnection().commit();
		
		PreparedStatement idKliring = DBConnection.getConnection().prepareStatement("SELECT KRI_ID FROM KLIRING", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
		ResultSet rsIDKliringa = idKliring.executeQuery();
		
		@SuppressWarnings("unused")
		int idKliringa = 0;
		rsIDKliringa.afterLast();
		while(rsIDKliringa.previous()){
			idKliringa = rsIDKliringa.getInt(1);
			break;
		}
		
		PreparedStatement analitikeZaKliring = DBConnection.getConnection().prepareStatement("SELECT ASI_BROJSTAVKE, ASI_RACDUZ, ASI_IZNOS, ASI_RACPOV FROM ANALITIKA_IZVODA WHERE ASI_STATUS='p'", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
		ResultSet rsAnalitike = analitikeZaKliring.executeQuery();
		Double ukupanIznos = 0.0;
		
		while(rsAnalitike.next()){
			ukupanIznos += rsAnalitike.getDouble(3);
			PreparedStatement insertAnalitike = DBConnection.getConnection().prepareStatement("INSERT INTO ANALITIKE_ZA_KLIRING (KRI_ID, KRI_SIFRA, ASI_BROJSTAVKE) VALUES (?, ?, ?)");
			insertAnalitike.setInt(1, idKliringa);
			insertAnalitike.setString(2, "MT-102");
			insertAnalitike.setInt(3, rsAnalitike.getInt(1));
			insertAnalitike.executeUpdate();
			DBConnection.getConnection().commit();
			
			PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("select dsr_novostanje, DNEVNO_STANJE_RACUNA.ID_RACUNA from DNEVNO_STANJE_RACUNA join RACUNI_PRAVNIH_LICA on DNEVNO_STANJE_RACUNA.ID_RACUNA=RACUNI_PRAVNIH_LICA.ID_RACUNA where RACUNI_PRAVNIH_LICA.BAR_RACUN = '"+ rsAnalitike.getString(2) +"'", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY); 
			ResultSet rs2 = stmt2.executeQuery();
			if(rs2.last())
			{
				//za duznika
				PreparedStatement stmtKliringDuznik = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
				stmtKliringDuznik.setInt(1, rs2.getInt(2));
				stmtKliringDuznik.setDate(2, new Date(new java.util.Date().getTime()));
				stmtKliringDuznik.setDouble(3, rs2.getDouble(1));
				stmtKliringDuznik.setDouble(4, 0.0);
				stmtKliringDuznik.setDouble(5, rsAnalitike.getDouble(3));
				stmtKliringDuznik.setDouble(6, rs2.getDouble(1) - rsAnalitike.getDouble(3));
				stmtKliringDuznik.executeUpdate();
				stmtKliringDuznik.close();
				
				DBConnection.getConnection().commit();
			}
			
			PreparedStatement stmt3 = DBConnection.getConnection().prepareStatement("select dsr_novostanje, DNEVNO_STANJE_RACUNA.ID_RACUNA from DNEVNO_STANJE_RACUNA join RACUNI_PRAVNIH_LICA on DNEVNO_STANJE_RACUNA.ID_RACUNA=RACUNI_PRAVNIH_LICA.ID_RACUNA where RACUNI_PRAVNIH_LICA.BAR_RACUN = '"+ rsAnalitike.getString(4) +"'", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY); 
			ResultSet rs3 = stmt3.executeQuery();
			if(rs3.last())
			{
				//za duznika
				PreparedStatement stmtKliringDuznik = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
				stmtKliringDuznik.setInt(1, rs3.getInt(2));
				stmtKliringDuznik.setDate(2, new Date(new java.util.Date().getTime()));
				stmtKliringDuznik.setDouble(3, rs3.getDouble(1));
				stmtKliringDuznik.setDouble(4, rsAnalitike.getDouble(3));
				stmtKliringDuznik.setDouble(5, 0.0);
				stmtKliringDuznik.setDouble(6, rs3.getDouble(1) + rsAnalitike.getDouble(3));
				stmtKliringDuznik.executeUpdate();
				stmtKliringDuznik.close();
				
				DBConnection.getConnection().commit();
			}
			
			PreparedStatement updateAnalitike = DBConnection.getConnection().prepareStatement("UPDATE ANALITIKA_IZVODA SET ASI_STATUS=? WHERE ASI_BROJSTAVKE=?"); 
			updateAnalitike.setString(1, "e");
			updateAnalitike.setInt(2, rsAnalitike.getInt(1));
			
			updateAnalitike.executeUpdate();
			updateAnalitike.close();
			
			DBConnection.getConnection().commit();
		}
		
		PreparedStatement updateKliring = DBConnection.getConnection().prepareStatement("UPDATE KLIRING SET KRI_UKUPNO=? WHERE KRI_ID=?");
		updateKliring.setDouble(1, ukupanIznos);
		updateKliring.setInt(2, idKliringa);
		updateKliring.executeUpdate();
		updateKliring.close();
		DBConnection.getConnection().commit();
	}

	@Override
	public List<Analitike> importXml(String xml) throws JAXBException 
	{
		JSONObject json = new JSONObject(xml);
		
		JAXBContext jaxbContext = JAXBContext.newInstance(ListaAnalitika.class);
		Marshaller marshaller = jaxbContext.createMarshaller();
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		
		StringReader reader = new StringReader(json.getString("xml"));
		ListaAnalitika la = (ListaAnalitika) unmarshaller.unmarshal(reader);
		
		List<Analitike> listaAnalitike = new ArrayList<Analitike>();
		for(int i=0; i<la.getAnalitikaIzvoda().size(); i++)
		{
			Date datumPrijema = new Date(la.getAnalitikaIzvoda().get(i).getDatumPrijema().toGregorianCalendar().getTime().getTime());
			Date datumValute = new Date(la.getAnalitikaIzvoda().get(i).getDatumValute().toGregorianCalendar().getTime().getTime());
			listaAnalitike.add(new Analitike(la.getAnalitikaIzvoda().get(i).getId(), 
					la.getAnalitikaIzvoda().get(i).getDuznik(), 
					la.getAnalitikaIzvoda().get(i).getSvrha(), 
					la.getAnalitikaIzvoda().get(i).getPoverliac(), 
					datumPrijema, 
					datumValute, 
					la.getAnalitikaIzvoda().get(i).getRacunDuznika(), 
					la.getAnalitikaIzvoda().get(i).getModelZaduzenja(), 
					la.getAnalitikaIzvoda().get(i).getPozivNaBrojZaduzenja(), 
					la.getAnalitikaIzvoda().get(i).getRacunPoverioca(), 
					la.getAnalitikaIzvoda().get(i).getModelOdobrenja(),
					la.getAnalitikaIzvoda().get(i).getPozivNaBrojOdobrenja(), 
					la.getAnalitikaIzvoda().get(i).isHitno(), 
					la.getAnalitikaIzvoda().get(i).getIznos(), 
					la.getAnalitikaIzvoda().get(i).getTipGreske(), 
					la.getAnalitikaIzvoda().get(i).getStatus(), 
					la.getAnalitikaIzvoda().get(i).getIdVrstaPlacanja(), 
					la.getAnalitikaIzvoda().get(i).getNazivPlacanja(), 
					la.getAnalitikaIzvoda().get(i).getIdNaselje(), 
					la.getAnalitikaIzvoda().get(i).getNazivNaselja(), 
					la.getAnalitikaIzvoda().get(i).getIdValute().intValue(), 
					la.getAnalitikaIzvoda().get(i).getValuta(), 
					la.getAnalitikaIzvoda().get(i).getIdIzvoda()));
		}
		
		return listaAnalitike;
	}

	@Override
	public List<Analitike> placanjeAnalitike(String id) throws SQLException {
		// TODO Auto-generated method stub
		List<Analitike> lista = new ArrayList<Analitike>();
		//																								1								2							3							4							5							6							7							8							9								10							11								12							13							14						15								16								17							18							19								20							21					22					23										
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT ANALITIKA_IZVODA.ASI_BROJSTAVKE, ANALITIKA_IZVODA.VPL_OZNAKA, ANALITIKA_IZVODA.NM_SIFRA, ANALITIKA_IZVODA.ID_VALUTE, ANALITIKA_IZVODA.DSR_IZVOD, ANALITIKA_IZVODA.ASI_DUZNIK, ANALITIKA_IZVODA.ASI_SVRHA, ANALITIKA_IZVODA.ASI_POVERILAC, ANALITIKA_IZVODA.ASI_DATPRI, ANALITIKA_IZVODA.ASI_DATVAL, ANALITIKA_IZVODA.ASI_RACDUZ, ANALITIKA_IZVODA.ASI_MODZAD, ANALITIKA_IZVODA.ASI_PBZAD, ANALITIKA_IZVODA.ASI_RACPOV, ANALITIKA_IZVODA.ASI_MODODOB, ANALITIKA_IZVODA.ASI_PBODO, ANALITIKA_IZVODA.ASI_HITNO, ANALITIKA_IZVODA.ASI_IZNOS, ANALITIKA_IZVODA.ASI_TIPGRESKE, ANALITIKA_IZVODA.ASI_STATUS, NASELJENO_MESTO.NM_NAZIV, VALUTE.VA_NAZIV, VRSTE_PLACANJA.VPL_NAZIV  FROM ANALITIKA_IZVODA LEFT OUTER JOIN NASELJENO_MESTO ON ANALITIKA_IZVODA.NM_SIFRA = NASELJENO_MESTO.NM_SIFRA LEFT OUTER JOIN VALUTE ON ANALITIKA_IZVODA.ID_VALUTE = VALUTE.ID_VALUTE LEFT OUTER JOIN VRSTE_PLACANJA ON VRSTE_PLACANJA.VPL_OZNAKA = ANALITIKA_IZVODA.VPL_OZNAKA WHERE ANALITIKA_IZVODA.VPL_OZNAKA='" + Integer.parseInt(id) +"';");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new Analitike(rs.getInt(1), //id int
					rs.getString(6), //duznik string
					rs.getString(7), //svrha string
					rs.getString(8), //poverilac string
					rs.getDate(9), //datumPrijema date
					rs.getDate(10), //datumValute date
					rs.getString(11), //racunDuznika string
					rs.getDouble(12), //modelZaduzenja double
					rs.getString(13), //pbZaduzenja string
					rs.getString(14), //racunPoverioca string
					rs.getDouble(15), //modelOdobrenja double
					rs.getString(16), //pbOdobrenja string
					rs.getBoolean(17), //hitno boolean
					rs.getDouble(18), //iznos double
					rs.getDouble(19), //tipGreske double
					rs.getString(20), //status string 
					rs.getDouble(2), //idVrstePlacanja double
					rs.getString(23), //nazivPlacanja string
					rs.getInt(3),  //idNaselja int
					rs.getString(21), //naselje string
					rs.getInt(4), //idValute int
					rs.getString(22), //valuta string
					rs.getInt(5))); //idIzvoda int
		}
		
		return lista;
	}


}
