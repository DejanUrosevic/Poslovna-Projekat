package web.poslovna.serviceImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Drzava;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.DrzavaService;

@Service
public class DrzavaServiceImpl implements DrzavaService{

	@Override
	public Drzava findOne(String id) throws SQLException 
	{
		Drzava d = null;
		
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM DRZAVA WHERE DR_SIFRA = '" + id +"'");
		while(rs.next())
		{
			 d = new Drzava(rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV"));
		}
		return d;
	}

	@Override
	public List<Drzava> findAll() throws SQLException {	
		List<Drzava> lista = new ArrayList<Drzava>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM DRZAVA ORDER BY DR_NAZIV");
		while(rs.next())
		{
			lista.add(new Drzava(rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV")));
		}
		return lista;
	}

	@Override
	public void save(Drzava object) throws SQLException 
	{		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
			       "INSERT INTO DRZAVA (DR_SIFRA, DR_NAZIV) VALUES (? ,?)");
		 stmt.setString(1, object.getSifra());
	     stmt.setString(2, object.getNaziv());
	     stmt.executeUpdate();
	     stmt.close();
	     DBConnection.getConnection().commit();     
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
		        "DELETE FROM DRZAVA WHERE DR_SIFRA=?");
		stmt.setString(1, id);
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();
	}

	@Override
	public List<NaseljenoMesto> findNaseljenoMesto(String id) throws SQLException {
		// TODO Auto-generated method stub
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT nm_sifra, nm_naziv, naseljeno_mesto.dr_sifra, dr_naziv, nm_pttoznaka FROM naseljeno_mesto"
				+ " JOIN drzava on naseljeno_mesto.dr_sifra = drzava.dr_sifra WHERE naseljeno_mesto.dr_sifra = '" + id +"'" );
		
		List<NaseljenoMesto> mesta = new ArrayList<NaseljenoMesto>();
		while(rs.next()){
			mesta.add(new NaseljenoMesto(rs.getInt("NM_SIFRA"), rs.getString("NM_NAZIV"), rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV"), rs.getString("NM_PTTOZNAKA")));
		}
		return mesta;
	}

	@Override
	public List<Drzava> pretraga(String postPayload) throws SQLException 
	{
		JSONObject json = new JSONObject(postPayload);
		String sifra = "";
		String naziv = "";
		
		try
		{
			sifra = json.getString("sifra");
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
		
		List<Drzava> lista = new ArrayList<Drzava>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM DRZAVA WHERE DR_SIFRA = '" + sifra + "' OR DR_NAZIV = '" + naziv + "'");
		while(rs.next())
		{
			lista.add(new Drzava(rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV")));
		}
		
		return lista;
	}

	@Override
	public void update(Drzava object) throws SQLException {

		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
			       "UPDATE DRZAVA SET DR_NAZIV = ? WHERE DR_SIFRA = ?");
		 stmt.setString(1, object.getNaziv());
	     stmt.setString(2, object.getSifra());
	     stmt.executeUpdate();
	     stmt.close();
	     DBConnection.getConnection().commit();
	}

}
