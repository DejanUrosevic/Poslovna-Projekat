package web.poslovna.serviceImpl;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Analitike;
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
			//za kliring
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
		stmt.setString(20, null);
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit();  
		
	    
	    if(object.getHitno()){
			PreparedStatement rtgs = DBConnection.getConnection().prepareStatement("INSERT INTO KLIRING (KRI_ID, KRI_DATUM_VALUTE, KRI_DATUM, KRI_SIFRA, ID_RACUNA, RAC_ID_RACUNA, KRI_UKUPNO) VALUES (?, ?, ?, ?, ?, ?, ?);");
			rtgs.setInt(1, 89);
			rtgs.setDate(2, new Date(new java.util.Date().getTime()));
			rtgs.setDate(3, new Date(new java.util.Date().getTime()));
			rtgs.setString(4, "MT-103");
			rtgs.setInt(5, object.getIdRacunaDuznika());
			rtgs.setInt(6, object.getIdRacunaPoverioca());
			rtgs.setDouble(7, object.getIznos());
			rtgs.executeUpdate();
			DBConnection.getConnection().commit();
			
			PreparedStatement analitikaRtgs = DBConnection.getConnection().prepareStatement("INSERT INTO ANALITIKE_ZA_KLIRING (KRI_ID, KRI_SIFRA, ASI_BROJSTAVKE) VALUES (?, ?, ?);");
			analitikaRtgs.setInt(1, 89);
			analitikaRtgs.setString(2, "MT-103");
			analitikaRtgs.setInt(3, object.getId());
			analitikaRtgs.executeUpdate();
			DBConnection.getConnection().commit();
		}
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
	public List<Analitike> pretraga(String postPayload) {
		// TODO Auto-generated method stub
		return null;
	}

}
