package web.poslovna.serviceImpl;

import java.io.File;
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

import web.poslovna.db.DBConnection;
import web.poslovna.model.Analitike;
import web.poslovna.model.Kliring;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.xml.RTGSKliring;
import web.poslovna.service.KliringService;

@Service
public class KliringServiceImpl implements KliringService{

	@Override
	public RTGSKliring findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RTGSKliring> findAll() throws SQLException, DatatypeConfigurationException {
		// TODO Auto-generated method stub
		List<RTGSKliring> lista = new ArrayList<RTGSKliring>();
		//																						1					2					3					4					5					6						7						8						9						10						11			
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT KLIRING.KRI_ID, KLIRING.KRI_DATUM_VALUTE, KLIRING.KRI_DATUM, KLIRING.KRI_SIFRA, KLIRING.ID_RACUNA, KLIRING.RAC_ID_RACUNA, KLIRING.KRI_UKUPNO, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA.PR_NAZIV, RACUNI_PRAVNIH_LICA2.BAR_RACUN, BANKA2.PR_NAZIV FROM KLIRING LEFT OUTER JOIN RACUNI_PRAVNIH_LICA ON KLIRING.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA LEFT OUTER JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB LEFT OUTER JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON KLIRING.RAC_ID_RACUNA = RACUNI_PRAVNIH_LICA2.ID_RACUNA LEFT OUTER JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.BAN_PR_PIB = BANKA2.PR_PIB;");
		ResultSet rs = stmt.executeQuery();
		while(rs.next())
		{
			GregorianCalendar c1 = new GregorianCalendar();
			c1.setTime(rs.getDate(2));
			XMLGregorianCalendar date1 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c1);
			
			GregorianCalendar c2 = new GregorianCalendar();
			c2.setTime(rs.getDate(3));
			XMLGregorianCalendar date2 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c2);
			
			lista.add(new RTGSKliring(rs.getInt(1),
					date1,
					date2, 
					rs.getString(4), 
					rs.getInt(5), 
					rs.getInt(6), 
					rs.getString(11), 
					rs.getString(9), 
					rs.getString(10), 
					rs.getString(8),
					rs.getDouble(7)
					));
		}
		return lista;
	}

	@Override
	public void save(RTGSKliring object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(RTGSKliring object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<RTGSKliring> pretraga(String postPayload) throws SQLException, ParseException 
	{
		return null;
		/*
		JSONObject json = new JSONObject(postPayload);
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		
		Integer sifra = -1;
		String nazivBankeDuznika = "";
		String nazivBankePoverioca = "";
		Integer racunBankeDuznika = -1;
		Integer racunBankePoverioca = -1;
		Date datum = new Date(dateFormat.parse("9999-11-11").getTime());
		Date datumValute = new Date(dateFormat.parse("9999-11-11").getTime());
		String sifraPoruke = "";
		Double ukupno = -1.0;
		
		
		try
		{
			sifra = json.getInt("sifra");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivBankeDuznika = json.getString("nazivBankeDuznika");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivBankePoverioca = json.getString("nazivBankePoverioca");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			racunBankeDuznika = json.getInt("racunBankeDuznika");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			racunBankePoverioca = json.getInt("racunBankePoverioca");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			String[] datum2 = (json.getString("datum")).split("T");
			datum = new Date((dateFormat.parse(datum2[0])).getTime());
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			String[] datum2 = (json.getString("datumValute")).split("T");
			datumValute = new Date((dateFormat.parse(datum2[0])).getTime());
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			sifraPoruke = json.getString("sifraPoruke");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			ukupno = json.getDouble("ukupno");
		}
		catch(Exception e)
		{
			
		}
		
		List<Kliring> lista = new ArrayList<Kliring>();
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT KLIRING.KRI_ID, KLIRING.KRI_DATUM_VALUTE, KLIRING.KRI_DATUM, KLIRING.KRI_SIFRA, KLIRING.ID_RACUNA, KLIRING.RAC_ID_RACUNA, KLIRING.KRI_UKUPNO, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA.PR_NAZIV, RACUNI_PRAVNIH_LICA2.BAR_RACUN, BANKA2.PR_NAZIV FROM KLIRING LEFT OUTER JOIN RACUNI_PRAVNIH_LICA ON KLIRING.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA LEFT OUTER JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB LEFT OUTER JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON KLIRING.RAC_ID_RACUNA = RACUNI_PRAVNIH_LICA2.ID_RACUNA LEFT OUTER JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.BAN_PR_PIB = BANKA2.PR_PIB"
				+ " WHERE KLIRING.KRI_ID = '" + sifra + "' OR convert(date, KRI_DATUM_VALUTE) = convert(date,'"+ datumValute+ "',120) OR convert(date, KRI_DATUM) = convert(date,'"+ datum+ "',120) OR KLIRING.KRI_SIFRA = '" + sifraPoruke + "' OR KLIRING.ID_RACUNA = '" + racunBankeDuznika + "' OR KLIRING.RAC_ID_RACUNA = '" + racunBankePoverioca + "' OR KLIRING.KRI_UKUPNO = '"+ ukupno + "' OR BANKA.PR_NAZIV = '"+ nazivBankeDuznika+ "' OR BANKA2.PR_NAZIV = '" + nazivBankePoverioca +"' OR RACUNI_PRAVNIH_LICA.BAR_RACUN='" + racunBankeDuznika + "' OR RACUNI_PRAVNIH_LICA2.BAR_RACUN = '" + racunBankePoverioca+ "';");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new RTGSKliring(rs.getInt(1),
					rs.getDate(2),
					rs.getDate(3), 
					rs.getString(4), 
					rs.getInt(5), 
					rs.getInt(6), 
					rs.getDouble(7), 
					rs.getString(8), 
					rs.getString(10), 
					rs.getString(9), 
					rs.getString(11)));
		}
		return lista;
		*/
	}

	@Override
	public void exportToXml(RTGSKliring object) throws JAXBException 
	{
		JAXBContext jaxbContext = JAXBContext.newInstance(RTGSKliring.class);
		Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
		String file = "xml\\" + object.getId() + ".xml";
		// output pretty printed
		jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

		jaxbMarshaller.marshal(object, new File(file));
		
	}

	@Override
	public RTGSKliring toXml(String id) throws JAXBException, SQLException, DatatypeConfigurationException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT KLIRING.KRI_ID, KLIRING.KRI_DATUM_VALUTE, KLIRING.KRI_DATUM, KLIRING.KRI_SIFRA, KLIRING.ID_RACUNA, KLIRING.RAC_ID_RACUNA, KLIRING.KRI_UKUPNO, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA.PR_NAZIV, RACUNI_PRAVNIH_LICA2.BAR_RACUN, BANKA2.PR_NAZIV FROM KLIRING LEFT OUTER JOIN RACUNI_PRAVNIH_LICA ON KLIRING.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA LEFT OUTER JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB LEFT OUTER JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON KLIRING.RAC_ID_RACUNA = RACUNI_PRAVNIH_LICA2.ID_RACUNA LEFT OUTER JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.BAN_PR_PIB = BANKA2.PR_PIB WHERE KLIRING.KRI_ID = " + Integer.parseInt(id) +";");
		ResultSet rs = stmt.executeQuery();
		RTGSKliring rtgsKliring = null;
		while(rs.next())
		{
			GregorianCalendar c1 = new GregorianCalendar();
			c1.setTime(rs.getDate(2));
			XMLGregorianCalendar date1 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c1);
			
			GregorianCalendar c2 = new GregorianCalendar();
			c2.setTime(rs.getDate(3));
			XMLGregorianCalendar date2 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c2);
			
			exportToXml(new RTGSKliring(rs.getInt(1),
					date1,
					date2, 
					rs.getString(4), 
					rs.getInt(5), 
					rs.getInt(6), 
					rs.getString(11), 
					rs.getString(9), 
					rs.getString(10), 
					rs.getString(8),
					rs.getDouble(7)
					));
			rtgsKliring = new RTGSKliring(rs.getInt(1),
					date1,
					date2, 
					rs.getString(4), 
					rs.getInt(5), 
					rs.getInt(6), 
					rs.getString(11), 
					rs.getString(9), 
					rs.getString(10), 
					rs.getString(8),
					rs.getDouble(7)
					);
		}
		return rtgsKliring;
		
	}

	@Override
	public List<Analitike> findAnalitike(String idKliringa) throws SQLException {
		// TODO Auto-generated method stub
		List<Analitike> lista = new ArrayList<Analitike>();
		//																							1								2							3							4							5							6							7							8							9								10							11								12							13							14						15								16								17							18							19								20							21					22					23										
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT ANALITIKA_IZVODA.ASI_BROJSTAVKE, ANALITIKA_IZVODA.VPL_OZNAKA, ANALITIKA_IZVODA.NM_SIFRA, ANALITIKA_IZVODA.ID_VALUTE, ANALITIKA_IZVODA.DSR_IZVOD, ANALITIKA_IZVODA.ASI_DUZNIK, ANALITIKA_IZVODA.ASI_SVRHA, ANALITIKA_IZVODA.ASI_POVERILAC, ANALITIKA_IZVODA.ASI_DATPRI, ANALITIKA_IZVODA.ASI_DATVAL, ANALITIKA_IZVODA.ASI_RACDUZ, ANALITIKA_IZVODA.ASI_MODZAD, ANALITIKA_IZVODA.ASI_PBZAD, ANALITIKA_IZVODA.ASI_RACPOV, ANALITIKA_IZVODA.ASI_MODODOB, ANALITIKA_IZVODA.ASI_PBODO, ANALITIKA_IZVODA.ASI_HITNO, ANALITIKA_IZVODA.ASI_IZNOS, ANALITIKA_IZVODA.ASI_TIPGRESKE, ANALITIKA_IZVODA.ASI_STATUS, NASELJENO_MESTO.NM_NAZIV, VALUTE.VA_NAZIV, VRSTE_PLACANJA.VPL_NAZIV  FROM ANALITIKA_IZVODA LEFT OUTER JOIN NASELJENO_MESTO ON ANALITIKA_IZVODA.NM_SIFRA = NASELJENO_MESTO.NM_SIFRA LEFT OUTER JOIN VALUTE ON ANALITIKA_IZVODA.ID_VALUTE = VALUTE.ID_VALUTE LEFT OUTER JOIN VRSTE_PLACANJA ON VRSTE_PLACANJA.VPL_OZNAKA = ANALITIKA_IZVODA.VPL_OZNAKA JOIN ANALITIKE_ZA_KLIRING ON ANALITIKA_IZVODA.ASI_BROJSTAVKE = ANALITIKE_ZA_KLIRING.ASI_BROJSTAVKE WHERE ANALITIKE_ZA_KLIRING.KRI_ID = '"+ idKliringa +"';");
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
