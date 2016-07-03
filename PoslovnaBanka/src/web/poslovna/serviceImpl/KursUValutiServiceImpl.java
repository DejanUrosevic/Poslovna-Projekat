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
import web.poslovna.model.KursUValuti;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.KursUValutiService;

@Service
public class KursUValutiServiceImpl implements KursUValutiService{

	@Override
	public KursUValuti findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<KursUValuti> findAll() throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT kuv.KLS_RBR, valOsnovno.ID_VALUTE, valPrema.ID_VALUTE, kl.ID_KURSNE_LISTE, kuv.KLS_KUPOVNI, kuv.KLS_SREDNJI, kuv.KLS_PRODAJNI, kl.KL_DATPR, valOsnovno.VA_NAZIV, valPrema.VA_NAZIV FROM KURS_U_VALUTI kuv"
				+ " JOIN VALUTE valPrema ON kuv.VAL_ID_VALUTE = valPrema.ID_VALUTE JOIN VALUTE valOsnovno ON kuv.ID_VALUTE = valOsnovno.ID_VALUTE JOIN KURSNA_LISTA kl ON kuv.ID_KURSNE_LISTE = kl.ID_KURSNE_LISTE ORDER BY kuv.KLS_RBR" );
		
		List<KursUValuti> lista = new ArrayList<KursUValuti>();
		while(rs.next()){
			lista.add(new KursUValuti(rs.getBigDecimal(1), rs.getBigDecimal(5), rs.getBigDecimal(6), rs.getBigDecimal(7), rs.getInt(4), rs.getDate(8), rs.getInt(2), rs.getString(9), rs.getInt(3), rs.getString(10)));
		}
		return lista;
	}

	@Override
	public void save(KursUValuti object) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO KURS_U_VALUTI (KLS_RBR, ID_VALUTE, VAL_ID_VALUTE, ID_KURSNE_LISTE, KLS_KUPOVNI, KLS_SREDNJI, KLS_PRODAJNI) VALUES (?,?,?,?,?,?,?)");
		stmt.setBigDecimal(1, object.getRedniBroj());
		stmt.setInt(2, object.getIdOsnovneValute());
		stmt.setInt(3, object.getIdPremaValuti());
		stmt.setInt(4, object.getIdKursneListe());
		stmt.setBigDecimal(5, object.getKupovni());
		stmt.setBigDecimal(6, object.getSrednji());
		stmt.setBigDecimal(7, object.getProdajni());
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit();  
		
	}

	@Override
	public void remove(String id) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
		        "DELETE FROM KURS_U_VALUTI WHERE KLS_RBR=?");
		stmt.setBigDecimal(1, BigDecimal.valueOf(Integer.parseInt(id)));
		stmt.executeUpdate();
		stmt.close();
		
		DBConnection.getConnection().commit();
		
	}

	@Override
	public void update(KursUValuti object) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE KURS_U_VALUTI SET KLS_KUPOVNI = ?, KLS_SREDNJI = ?, KLS_PRODAJNI = ? WHERE KLS_RBR = ?");
		stmt.setBigDecimal(1, object.getKupovni());
		stmt.setBigDecimal(2, object.getSrednji());
		stmt.setBigDecimal(3, object.getProdajni());
		stmt.setBigDecimal(4, object.getRedniBroj());
		
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit(); 
		
	}

	@Override
	public List<KursUValuti> pretraga(String postPayload) throws SQLException,
			ParseException {
	
		JSONObject json = new JSONObject(postPayload);
		
		BigDecimal redniBroj =BigDecimal.valueOf(-1);
		BigDecimal kupovni =BigDecimal.valueOf(-1);
		BigDecimal srednji =BigDecimal.valueOf(-1);
		BigDecimal prodajni =BigDecimal.valueOf(-1);
		Integer idKursneListe = -1;
		Date primenjujeSeOd = null;
		Integer idOsnovneValute = -1;
		String nazivOsnovneValute = "";
		Integer idPremaValute = -1;
		String nazivPremaValute = "";
		
		try
		{
			redniBroj = BigDecimal.valueOf(json.getInt("redniBroj"));
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			kupovni = BigDecimal.valueOf(json.getDouble("kupovni"));
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			srednji = BigDecimal.valueOf(json.getDouble("srednji"));
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			prodajni = BigDecimal.valueOf(json.getDouble("prodajni"));
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			idKursneListe = json.getInt("idKursneListe");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String[] datum = (json.getString("primenjuje")).split("T");
			primenjujeSeOd = new Date((dateFormat.parse(datum[0])).getTime());
		}
		catch(Exception e)
		{
			//mora ovako, jer inace vraca null, a to ne zna kako da obradi, pa se postavlja neki tamo levi datum samo da bi proradilo.
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			primenjujeSeOd = new Date((dateFormat.parse("8000-01-01")).getTime());
		}
		
		try
		{
			idOsnovneValute = json.getInt("idOsnovneValute");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivOsnovneValute = json.getString("nazivOsnovneValute");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			idPremaValute = json.getInt("idPremaValute");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivPremaValute = json.getString("nazivPremaValute");
		}
		catch(Exception e)
		{
			
		}
		
		
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT kuv.KLS_RBR, valOsnovno.ID_VALUTE, valPrema.ID_VALUTE, kl.ID_KURSNE_LISTE, kuv.KLS_KUPOVNI, kuv.KLS_SREDNJI, kuv.KLS_PRODAJNI, kl.KL_DATPR, valOsnovno.VA_NAZIV, valPrema.VA_NAZIV FROM KURS_U_VALUTI kuv"
				+ " JOIN VALUTE valPrema ON kuv.VAL_ID_VALUTE = valPrema.ID_VALUTE JOIN VALUTE valOsnovno ON kuv.ID_VALUTE = valOsnovno.ID_VALUTE JOIN KURSNA_LISTA kl ON kuv.ID_KURSNE_LISTE = kl.ID_KURSNE_LISTE "
				+ "WHERE kuv.KLS_RBR = '" + redniBroj + "' OR valOsnovno.ID_VALUTE = '" + idOsnovneValute + "' OR valPrema.ID_VALUTE = '" + idPremaValute+ "' OR kl.ID_KURSNE_LISTE = '" + idKursneListe+ "' OR kuv.KLS_KUPOVNI = '" + kupovni+ "' OR kuv.KLS_SREDNJI = '" +srednji + "' OR kuv.KLS_PRODAJNI = '" + prodajni+ "' OR kl.KL_DATPR >= '" +primenjujeSeOd + "' OR valOsnovno.VA_NAZIV = '" + nazivOsnovneValute + "' OR valPrema.VA_NAZIV = '" + nazivPremaValute + "' ORDER BY kuv.KLS_RBR" );
		
		List<KursUValuti> lista = new ArrayList<KursUValuti>();
		while(rs.next()){
			lista.add(new KursUValuti(rs.getBigDecimal(1), rs.getBigDecimal(5), rs.getBigDecimal(6), rs.getBigDecimal(7), rs.getInt(4), rs.getDate(8), rs.getInt(2), rs.getString(9), rs.getInt(3), rs.getString(10)));
		}
		return lista;
	}

}
