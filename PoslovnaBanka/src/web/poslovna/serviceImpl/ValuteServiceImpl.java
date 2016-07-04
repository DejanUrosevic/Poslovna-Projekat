package web.poslovna.serviceImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Drzava;
import web.poslovna.model.KursUValuti;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.Valute;
import web.poslovna.service.ValuteService;

@Service
public class ValuteServiceImpl implements ValuteService{

	@Override
	public Valute findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Valute> findAll() throws SQLException {
		
		List<Valute> lista = new ArrayList<Valute>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT ID_VALUTE, VA_IFRA, VA_NAZIV, VA_DOMICILNA, VALUTE.DR_SIFRA, DR_NAZIV FROM VALUTE"
				+ " JOIN DRZAVA ON VALUTE.DR_SIFRA = DRZAVA.DR_SIFRA ORDER BY ID_VALUTE");
		while(rs.next())
		{
			lista.add(new Valute(rs.getInt("ID_VALUTE"), rs.getString("VA_IFRA"), rs.getString("VA_NAZIV"), rs.getBoolean("VA_DOMICILNA"), rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV")));
		}
		
		return lista;
	}

	@Override
	public void save(Valute object) throws SQLException {
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO VALUTE (ID_VALUTE, DR_SIFRA, VA_IFRA, VA_NAZIV, VA_DOMICILNA) VALUES (? ,? ,? ,?, ?)");
		stmt.setInt(1, object.getIDValute());
		stmt.setString(2, object.getDrzavaSifra());
		stmt.setString(3, object.getZvanicnaSifra());
		stmt.setString(4, object.getNaziv());
		stmt.setBoolean(5, object.isDomicilna());
		
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit();  
		
	}

	@Override
	public void remove(String id) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
		        "DELETE FROM VALUTE WHERE ID_VALUTE = ? ");
		stmt.setInt(1, Integer.parseInt(id));
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();
		
	}

	@Override
	public void update(Valute object) throws SQLException {
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE VALUTE SET VA_IFRA = ?, VA_NAZIV = ?, VA_DOMICILNA = ? WHERE ID_VALUTE = ? AND DR_SIFRA = ?");
		stmt.setString(1, object.getZvanicnaSifra());
		stmt.setString(2, object.getNaziv());
		stmt.setBoolean(3, object.isDomicilna());
		stmt.setInt(4, object.getIDValute());
		stmt.setString(5, object.getDrzavaSifra());
		
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit(); 
		
	}

	@Override
	public List<Valute> pretraga(String postPayload) throws SQLException 
	{
		JSONObject json = new JSONObject(postPayload);
		Integer sifra = 0;
		String naziv = "";
		String sifraDrzave = "";
		String nazivDrzave = "";
		String zvanicnaSifra = "";
		Boolean domicilna = null;
		
		try
		{
			sifra = json.getInt("sifra");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			naziv = json.getString("naziv");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			sifraDrzave = json.getString("sifraDrzava");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivDrzave = json.getString("nazivDrzava");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			zvanicnaSifra = json.getString("zvanicnaSifra");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			domicilna = Boolean.parseBoolean(json.getString("domicilna"));
		}
		catch(Exception e)
		{
			
		}
		
		List<Valute> lista = new ArrayList<Valute>();
		if(domicilna != null)
		{
			
			Statement sql = DBConnection.getConnection().createStatement();
			ResultSet rs = sql.executeQuery("SELECT ID_VALUTE, VA_IFRA, VA_NAZIV, VA_DOMICILNA, VALUTE.DR_SIFRA, DR_NAZIV FROM VALUTE"
					+ " JOIN DRZAVA ON VALUTE.DR_SIFRA = DRZAVA.DR_SIFRA WHERE ID_VALUTE = '" + sifra + "' OR VA_NAZIV = '" + naziv + "' OR VALUTE.DR_SIFRA = '" + sifraDrzave +"' OR VA_IFRA = '" + zvanicnaSifra + "' OR DR_NAZIV = '" + nazivDrzave + "' OR VA_DOMICILNA = '" + domicilna + "' ORDER BY ID_VALUTE");
			while(rs.next())
			{
				lista.add(new Valute(rs.getInt("ID_VALUTE"), rs.getString("VA_IFRA"), rs.getString("VA_NAZIV"), rs.getBoolean("VA_DOMICILNA"), rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV")));
			}
		}
		else
		{
			Statement sql = DBConnection.getConnection().createStatement();
			ResultSet rs = sql.executeQuery("SELECT ID_VALUTE, VA_IFRA, VA_NAZIV, VA_DOMICILNA, VALUTE.DR_SIFRA, DR_NAZIV FROM VALUTE"
					+ " JOIN DRZAVA ON VALUTE.DR_SIFRA = DRZAVA.DR_SIFRA WHERE ID_VALUTE = '" + sifra + "' OR VA_NAZIV = '" + naziv + "' OR VALUTE.DR_SIFRA = '" + sifraDrzave +"' OR VA_IFRA = '" + zvanicnaSifra + "' OR DR_NAZIV = '" + nazivDrzave + "' ORDER BY ID_VALUTE");
			while(rs.next())
			{
				lista.add(new Valute(rs.getInt("ID_VALUTE"), rs.getString("VA_IFRA"), rs.getString("VA_NAZIV"), rs.getBoolean("VA_DOMICILNA"), rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV")));
			}
		}
		
		
		return lista;
	}

	@Override
	public List<KursUValuti> findKurseveUValuti(String id) throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT kuv.KLS_RBR, valOsnovno.ID_VALUTE, valPrema.ID_VALUTE, kl.ID_KURSNE_LISTE, kuv.KLS_KUPOVNI, kuv.KLS_SREDNJI, kuv.KLS_PRODAJNI, kl.KL_DATPR, valOsnovno.VA_NAZIV, valPrema.VA_NAZIV FROM KURS_U_VALUTI kuv"
				+ " JOIN VALUTE valPrema ON kuv.VAL_ID_VALUTE = valPrema.ID_VALUTE JOIN VALUTE valOsnovno ON kuv.ID_VALUTE = valOsnovno.ID_VALUTE JOIN KURSNA_LISTA kl ON kuv.ID_KURSNE_LISTE = kl.ID_KURSNE_LISTE WHERE valPrema.ID_VALUTE = '" + Integer.parseInt(id) + "' OR valOsnovno.ID_VALUTE = '" + Integer.parseInt(id) + "' ORDER BY kuv.KLS_RBR" );
		
		List<KursUValuti> lista = new ArrayList<KursUValuti>();
		while(rs.next()){
			lista.add(new KursUValuti(rs.getBigDecimal(1), rs.getBigDecimal(5), rs.getBigDecimal(6), rs.getBigDecimal(7), rs.getInt(4), rs.getDate(8), rs.getInt(2), rs.getString(9), rs.getInt(3), rs.getString(10)));
		}
		return lista;
	}
}
