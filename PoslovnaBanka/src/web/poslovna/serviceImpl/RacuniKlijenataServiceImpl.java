package web.poslovna.serviceImpl;

import java.io.File;
import java.math.BigInteger;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.test.context.jdbc.Sql;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Analitike;
import web.poslovna.model.RacuniKlijenata;
import web.poslovna.model.xml.ListaAnalitika;
import web.poslovna.model.xml.ListaAnalitika.AnalitikaIzvoda;
import web.poslovna.model.xml.RTGSKliring;
import web.poslovna.service.RacuniKlijenataService;

@Service
public class RacuniKlijenataServiceImpl implements RacuniKlijenataService{

	@Override
	public RacuniKlijenata findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RacuniKlijenata> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<RacuniKlijenata> lista = new ArrayList<RacuniKlijenata>();
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT ID_RACUNA, racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA, banka.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN klijent ON racuni_pravnih_lica.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA JOIN banka ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB");
		
		while(rs.next()){
			lista.add(new RacuniKlijenata(rs.getInt("ID_RACUNA"), rs.getInt("JMBG_KLIJENTA"),
					rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), 
					rs.getInt("ID_VALUTE"), rs.getString("VA_NAZIV"), 
					null, null, rs.getString("BAN_PR_PIB"),
					rs.getString("PR_NAZIV"), rs.getString("BAR_RACUN"), 
					rs.getDate("BAR_DATOTV"), rs.getBoolean("BAR_VAZI")));
		}
		
		PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("SELECT ID_RACUNA,racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.PR_PIB, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV,banka.PR_NAZIV, banka2.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN banka ON racuni_pravnih_lica.PR_PIB = banka.PR_PIB JOIN banka AS banka2 ON racuni_pravnih_lica.BAN_PR_PIB = banka2.PR_PIB");
		ResultSet rs2 = stmt2.executeQuery();
		
		while(rs2.next()){
			lista.add(new RacuniKlijenata(
					rs2.getInt("ID_RACUNA"), 
					rs2.getInt(2),
					null,
					null,
					rs2.getInt(3),
					rs2.getString(9),
					rs2.getString(4), 
					rs2.getString(10),
					rs2.getString(5),
					rs2.getString(11), 
					rs2.getString(6), 
					rs2.getDate(7),
					rs2.getBoolean(8)));
		}
		return lista;
	}

	@Override
	public void save(RacuniKlijenata object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = 
				DBConnection.getConnection().prepareStatement("INSERT INTO racuni_pravnih_lica (ID_RACUNA, JMBG_KLIJENTA, ID_VALUTE, PR_PIB, BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.setInt(1, object.getId());
		try {
			stmt.setInt(2, object.getJmbg());
		} catch (NullPointerException e) {
			// TODO: handle exception
			stmt.setNull(2, java.sql.Types.INTEGER);
		}
		stmt.setInt(3, object.getValuta());
		stmt.setString(4, object.getPibKlijenta());
		stmt.setString(5, object.getPibBanke());
		stmt.setString(6, object.getBrRacuna());
		stmt.setDate(7, object.getDatumOtvaranja());
		stmt.setBoolean(8, object.isVazeci());
		stmt.executeUpdate();
	    stmt.close();
	    
	    PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
	    stmt2.setInt(1, object.getId());
	    stmt2.setDate(2, object.getDatumOtvaranja());
	    stmt2.setDouble(3, 0.0);
	    stmt2.setDouble(4, 0.0);
	    stmt2.setDouble(5, 0.0);
	    stmt2.setDouble(6, 0.0);
	    stmt2.executeUpdate();
	    stmt2.close();

	    DBConnection.getConnection().commit();
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
				"DELETE FROM racuni_pravnih_lica WHERE ID_RACUNA = ?");
		stmt.setString(1, id);
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();	
	}

	@Override
	public void update(RacuniKlijenata object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE racuni_pravnih_lica SET JMBG_KLIJENTA=?, ID_VALUTE=?, PR_PIB=?, BAN_PR_PIB=?, BAR_RACUN=?, BAR_DATOTV=?, BAR_VAZI=? WHERE ID_RACUNA=?");
		try {
			stmt.setInt(1, object.getJmbg());
		} catch (NullPointerException e) {
			// TODO: handle exception
			stmt.setNull(1, java.sql.Types.INTEGER);
		}
		stmt.setInt(2, object.getValuta());
		stmt.setString(3, object.getPibKlijenta());
		stmt.setString(4, object.getPibBanke());
		stmt.setString(5, object.getBrRacuna());
		stmt.setDate(6, object.getDatumOtvaranja());
		stmt.setBoolean(7, object.isVazeci());
		stmt.setInt(8, object.getId());
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit();
	}

	@Override
	public List<RacuniKlijenata> pretraga(String postPayload)throws SQLException, ParseException {
		// TODO Auto-generated method stub
		JSONObject json = new JSONObject(postPayload); 
		
		boolean fizickoLice = false;
		boolean pravnoLice = false;
		
		//fizicko lice
		Integer jmbg = null;
		
		//pravno lice
		String pib = null;
		
		//banka
		String pibBanka = null;
		
		//valuta
		Integer idValute = null;
		
		//id racuna
		Integer idRacuna = null;
		
		//broj racuna
		String brRacuna = null;
		
		try {
			brRacuna = json.getString("racun");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			idRacuna = json.getInt("id");
		} catch (Exception e) {
			// TODO: handle exception
			idRacuna = -1;
		}
		
		try {
			idValute = json.getInt("idValute");
		} catch (Exception e) {
			// TODO: handle exception
			idValute = -1;
		}
		
		try {
			pibBanka = json.getString("pibBanke");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			jmbg = json.getInt("jmbg");
		} catch (Exception e) {
			// TODO: handle exception
			jmbg = -1;
		}
		
		try {
			pib = json.getString("pib");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		//validan
		Boolean aktivan = true;
		try {
			if(json.getString("validan").equals("da")){
				aktivan = true;
			}else if(json.getString("validan").equals("ne")){
				aktivan = false;
			}	
		} catch (Exception e) {
			// TODO: handle exception
			aktivan = true;
		}
		Date date = null;
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String[] datum = (json.getString("datum")).split("T");
			date = new Date((dateFormat.parse(datum[0])).getTime());	
		} catch (Exception e) {
			// TODO: handle exception
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = new Date((dateFormat.parse("8000-01-01")).getTime());
		}
		
		/*
		 * ID RACUNA - idRacuna
		 * FIZICKO LICE - jmbg
		 * PRAVNO LICE - pib
		 * ID VALUTE - idValute
		 * BANKA - pibBanke
		 * BR. RACUNA - brRacuna
		 * DATUM - date
		 * VALIDAN - aktivan 
		 */
		
		List<RacuniKlijenata> lista = new ArrayList<RacuniKlijenata>();
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT ID_RACUNA, racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA, banka.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN klijent ON racuni_pravnih_lica.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA JOIN banka ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB WHERE " +
				"ID_RACUNA = '" + idRacuna + "' OR racuni_pravnih_lica.JMBG_KLIJENTA = '" + jmbg + "' OR racuni_pravnih_lica.ID_VALUTE = '" + idValute + "' OR racuni_pravnih_lica.BAN_PR_PIB = '" + pibBanka + "' OR BAR_RACUN LIKE '%" + brRacuna + "%' OR BAR_DATOTV >= '" + date + "' AND BAR_VAZI = '" + aktivan +"'");
		
		while(rs.next()){
			lista.add(new RacuniKlijenata(rs.getInt("ID_RACUNA"), rs.getInt("JMBG_KLIJENTA"),
					rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), 
					rs.getInt("ID_VALUTE"), rs.getString("VA_NAZIV"), 
					null, null, rs.getString("BAN_PR_PIB"),
					rs.getString("PR_NAZIV"), rs.getString("BAR_RACUN"), 
					rs.getDate("BAR_DATOTV"), rs.getBoolean("BAR_VAZI")));
		}
		
		PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("SELECT ID_RACUNA,racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.PR_PIB, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV,banka.PR_NAZIV, banka2.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN banka ON racuni_pravnih_lica.PR_PIB = banka.PR_PIB JOIN banka AS banka2 ON racuni_pravnih_lica.BAN_PR_PIB = banka2.PR_PIB WHERE " +
				"ID_RACUNA = '" + idRacuna + "' OR racuni_pravnih_lica.JMBG_KLIJENTA = '" + jmbg + "' OR racuni_pravnih_lica.ID_VALUTE = '" + idValute + "' OR racuni_pravnih_lica.PR_PIB = '" + pib +"' OR racuni_pravnih_lica.BAN_PR_PIB = '" + pibBanka + "' OR BAR_RACUN LIKE '%" + brRacuna + "%' OR BAR_DATOTV >= '" + date + "' AND BAR_VAZI = '" + aktivan +"'");
		ResultSet rs2 = stmt2.executeQuery();
		
		while(rs2.next()){
			lista.add(new RacuniKlijenata(
					rs2.getInt("ID_RACUNA"), 
					rs2.getInt(2),
					null,
					null,
					rs2.getInt(3),
					rs2.getString(9),
					rs2.getString(4), 
					rs2.getString(10),
					rs2.getString(5),
					rs2.getString(11), 
					rs2.getString(6), 
					rs2.getDate(7),
					rs2.getBoolean(8)));
		}
		return lista;
	}

	@Override
	public void toXml(String brRacuna) throws SQLException, DatatypeConfigurationException, JAXBException 
	{
		ListaAnalitika la = new ListaAnalitika();
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT ANALITIKA_IZVODA.ASI_BROJSTAVKE, ANALITIKA_IZVODA.VPL_OZNAKA, ANALITIKA_IZVODA.NM_SIFRA, ANALITIKA_IZVODA.ID_VALUTE, ANALITIKA_IZVODA.DSR_IZVOD, ANALITIKA_IZVODA.ASI_DUZNIK, ANALITIKA_IZVODA.ASI_SVRHA, ANALITIKA_IZVODA.ASI_POVERILAC, ANALITIKA_IZVODA.ASI_DATPRI, ANALITIKA_IZVODA.ASI_DATVAL, ANALITIKA_IZVODA.ASI_RACDUZ, ANALITIKA_IZVODA.ASI_MODZAD, ANALITIKA_IZVODA.ASI_PBZAD, ANALITIKA_IZVODA.ASI_RACPOV, ANALITIKA_IZVODA.ASI_MODODOB, ANALITIKA_IZVODA.ASI_PBODO, ANALITIKA_IZVODA.ASI_HITNO, ANALITIKA_IZVODA.ASI_IZNOS, ANALITIKA_IZVODA.ASI_TIPGRESKE, ANALITIKA_IZVODA.ASI_STATUS, NASELJENO_MESTO.NM_NAZIV, VALUTE.VA_NAZIV, VRSTE_PLACANJA.VPL_NAZIV  FROM ANALITIKA_IZVODA LEFT OUTER JOIN NASELJENO_MESTO ON ANALITIKA_IZVODA.NM_SIFRA = NASELJENO_MESTO.NM_SIFRA LEFT OUTER JOIN VALUTE ON ANALITIKA_IZVODA.ID_VALUTE = VALUTE.ID_VALUTE LEFT OUTER JOIN VRSTE_PLACANJA ON VRSTE_PLACANJA.VPL_OZNAKA = ANALITIKA_IZVODA.VPL_OZNAKA WHERE ANALITIKA_IZVODA.ASI_RACDUZ = '" + brRacuna +"' OR ANALITIKA_IZVODA.ASI_RACPOV = '"+brRacuna+"';");
		ResultSet rs = stmt.executeQuery();
		while(rs.next())
		{
			GregorianCalendar c1 = new GregorianCalendar();
			c1.setTime(rs.getDate(10));
			XMLGregorianCalendar date1 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c1);
			
			GregorianCalendar c2 = new GregorianCalendar();
			c2.setTime(rs.getDate(9));
			XMLGregorianCalendar date2 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c2);
			
			la.getAnalitikaIzvoda().add(new AnalitikaIzvoda(
					rs.getInt(1), 
					rs.getString(6), 
					rs.getString(7), 
					rs.getString(8), 
					date1, 
					date2, 
					rs.getString(11), 
					rs.getDouble(12), 
					rs.getString(13), 
					rs.getString(14), 
					rs.getDouble(15), 
					rs.getDouble(2), 
					rs.getString(23), 
					rs.getInt(3), 
					rs.getString(21), 
					BigInteger.valueOf(rs.getInt(4)), 
					rs.getString(22),  
					rs.getBoolean(17), 
					rs.getString(20), 
					rs.getDouble(19), 
					rs.getDouble(18), 
					rs.getString(16),
					rs.getInt(5)));
		}
		exportToXml(la, brRacuna);
		
	}

	@Override
	public void exportToXml(ListaAnalitika la, String brojRacuna) throws JAXBException 
	{
		JAXBContext jaxbContext = JAXBContext.newInstance(ListaAnalitika.class);
		Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
		String file = "xml\\" + brojRacuna + ".xml";
		// output pretty printed
		jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

		jaxbMarshaller.marshal(la, new File(file));
		
	}

}
