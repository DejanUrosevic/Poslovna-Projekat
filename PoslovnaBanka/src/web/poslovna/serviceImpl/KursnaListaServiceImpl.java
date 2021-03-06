package web.poslovna.serviceImpl;

import java.math.BigDecimal;
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
import web.poslovna.model.Drzava;
import web.poslovna.model.KursUValuti;
import web.poslovna.model.KursnaLista;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.Valute;
import web.poslovna.service.KursnaListaService;

@Service
public class KursnaListaServiceImpl implements KursnaListaService{

	@Override
	public KursnaLista findOne(String id) throws SQLException 
	{
		
		KursnaLista kl = null;
		
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT ID_KURSNE_LISTE, KL_DATUM, KURSNA_LISTA.PR_PIB, PR_NAZIV, KL_BROJ, KL_DATPR FROM KURSNA_LISTA"
				+ " JOIN BANKA ON KURSNA_LISTA.PR_PIB = BANKA.PR_PIB WHERE ID_KURSNE_LISTE = '" + Integer.parseInt(id) + "' ORDER BY KL_DATUM");
		while(rs.next())
		{
			kl = new KursnaLista(rs.getInt("ID_KURSNE_LISTE"), rs.getDate("KL_DATUM"), rs.getBigDecimal("KL_BROJ"), rs.getDate("KL_DATPR"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV"));
		}
		return kl;
	}

	@Override
	public List<KursnaLista> findAll() throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT ID_KURSNE_LISTE, KL_DATUM, KURSNA_LISTA.PR_PIB, PR_NAZIV, KL_BROJ, KL_DATPR FROM KURSNA_LISTA"
				+ " JOIN BANKA ON KURSNA_LISTA.PR_PIB = BANKA.PR_PIB ORDER BY KL_DATUM" );
		
		List<KursnaLista> lista = new ArrayList<KursnaLista>();
		while(rs.next()){
			lista.add(new KursnaLista(rs.getInt("ID_KURSNE_LISTE"), rs.getDate("KL_DATUM"), rs.getBigDecimal("KL_BROJ"), rs.getDate("KL_DATPR"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV")));
		}
		
		return lista;
	}

	@Override
	public void save(KursnaLista object) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO KURSNA_LISTA (ID_KURSNE_LISTE, PR_PIB, KL_DATUM, KL_BROJ, KL_DATPR) VALUES (?,?,?,?,?)");
		stmt.setInt(1, object.getId());
		stmt.setString(2, object.getPib());
		stmt.setDate(3, object.getDatum());
		stmt.setBigDecimal(4, object.getBrojListe());
		stmt.setDate(5, object.getPrimenjujeSeOd());
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit(); 
		
	}

	@Override
	public void remove(String id) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
		        "DELETE FROM KURSNA_LISTA WHERE ID_KURSNE_LISTE=?");
		stmt.setInt(1, Integer.parseInt(id));
		stmt.executeUpdate();
		stmt.close();
		
		DBConnection.getConnection().commit();
		
	}

	@Override
	public void update(KursnaLista object) throws SQLException
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE KURSNA_LISTA SET PR_PIB = ?, KL_DATPR = ?, KL_BROJ = ? WHERE ID_KURSNE_LISTE = ?");
		stmt.setString(1, object.getPib());
		stmt.setDate(2, object.getPrimenjujeSeOd());
		stmt.setBigDecimal(3, object.getBrojListe());
		stmt.setInt(4, object.getId());
		
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit(); 
		
	}

	@Override
	public List<KursnaLista> pretraga(String postPayload) throws SQLException, ParseException 
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(postPayload);
		
		Integer sifra = 0;
		String pib = "";
		Date primenjujeSeOd = new Date(dateFormat.parse("9999-11-11").getTime());
		BigDecimal brojKursneListe = BigDecimal.valueOf(-1);
		String nazivBanke = "";
		
		try
		{
			sifra = json.getInt("sifra");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			pib = json.getString("pib");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			brojKursneListe = BigDecimal.valueOf(json.getInt("brojKursneListe"));
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			String[] datum = (json.getString("primenjuje")).split("T");
			primenjujeSeOd = new Date((dateFormat.parse(datum[0])).getTime());
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivBanke = json.getString("nazivBanke");
		}
		catch(Exception e)
		{
			
		}
		
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT ID_KURSNE_LISTE, KL_DATUM, KURSNA_LISTA.PR_PIB, PR_NAZIV, KL_BROJ, KL_DATPR FROM KURSNA_LISTA"
				+ " JOIN BANKA ON KURSNA_LISTA.PR_PIB = BANKA.PR_PIB WHERE ID_KURSNE_LISTE = '"+ sifra+ "' OR KURSNA_LISTA.PR_PIB = '" + pib + "' OR PR_NAZIV = '" + nazivBanke + "' OR KL_BROJ = '" + brojKursneListe + "' OR convert(date, KL_DATPR) = convert(date,'"+ primenjujeSeOd+ "',120) ORDER BY KL_DATUM" );
		
		List<KursnaLista> lista = new ArrayList<KursnaLista>();
		while(rs.next()){
			lista.add(new KursnaLista(rs.getInt("ID_KURSNE_LISTE"), rs.getDate("KL_DATUM"), rs.getBigDecimal("KL_BROJ"), rs.getDate("KL_DATPR"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV")));
		}
		
		return lista;
	}

	@Override
	public List<KursUValuti> findKurseveUValuti(String id) throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT kuv.KLS_RBR, valOsnovno.ID_VALUTE, valPrema.ID_VALUTE, kl.ID_KURSNE_LISTE, kuv.KLS_KUPOVNI, kuv.KLS_SREDNJI, kuv.KLS_PRODAJNI, kl.KL_DATPR, valOsnovno.VA_NAZIV, valPrema.VA_NAZIV FROM KURS_U_VALUTI kuv"
				+ " JOIN VALUTE valPrema ON kuv.VAL_ID_VALUTE = valPrema.ID_VALUTE JOIN VALUTE valOsnovno ON kuv.ID_VALUTE = valOsnovno.ID_VALUTE JOIN KURSNA_LISTA kl ON kuv.ID_KURSNE_LISTE = kl.ID_KURSNE_LISTE WHERE kl.ID_KURSNE_LISTE = '" + Integer.parseInt(id) + "'  ORDER BY kuv.KLS_RBR" );
		
		List<KursUValuti> lista = new ArrayList<KursUValuti>();
		while(rs.next()){
			lista.add(new KursUValuti(rs.getBigDecimal(1), rs.getBigDecimal(5), rs.getBigDecimal(6), rs.getBigDecimal(7), rs.getInt(4), rs.getDate(8), rs.getInt(2), rs.getString(9), rs.getInt(3), rs.getString(10)));
		}
		return lista;
	}

}
