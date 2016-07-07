package web.poslovna.serviceImpl;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Kliring;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.KliringService;

@Service
public class KliringServiceImpl implements KliringService{

	@Override
	public Kliring findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Kliring> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<Kliring> lista = new ArrayList<Kliring>();
		//																						1					2					3					4					5					6						7						8						9						10						11			
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT KLIRING.KRI_ID, KLIRING.KRI_DATUM_VALUTE, KLIRING.KRI_DATUM, KLIRING.KRI_SIFRA, KLIRING.ID_RACUNA, KLIRING.RAC_ID_RACUNA, KLIRING.KRI_UKUPNO, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA.PR_NAZIV, RACUNI_PRAVNIH_LICA2.BAR_RACUN, BANKA2.PR_NAZIV FROM KLIRING LEFT OUTER JOIN RACUNI_PRAVNIH_LICA ON KLIRING.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA LEFT OUTER JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB LEFT OUTER JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON KLIRING.RAC_ID_RACUNA = RACUNI_PRAVNIH_LICA2.ID_RACUNA LEFT OUTER JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.BAN_PR_PIB = BANKA2.PR_PIB;");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new Kliring(rs.getInt(1),
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
	}

	@Override
	public void save(Kliring object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Kliring object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Kliring> pretraga(String postPayload) throws SQLException, ParseException 
	{
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
			lista.add(new Kliring(rs.getInt(1),
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
	}

}
