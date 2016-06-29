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
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.NaseljenoMestoService;

@Service
public class NaseljenoMestoServiceImpl implements NaseljenoMestoService{

	@Override
	public NaseljenoMesto findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NaseljenoMesto> findAll() throws SQLException {
		// TODO Auto-generated method stub
		
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT nm_sifra, nm_naziv, naseljeno_mesto.dr_sifra, dr_naziv, nm_pttoznaka FROM naseljeno_mesto"
				+ " JOIN drzava on naseljeno_mesto.dr_sifra = drzava.dr_sifra ORDER BY dr_naziv" );
		
		List<NaseljenoMesto> mesta = new ArrayList<NaseljenoMesto>();
		while(rs.next()){
			mesta.add(new NaseljenoMesto(rs.getInt("NM_SIFRA"), rs.getString("NM_NAZIV"), rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV"), rs.getString("NM_PTTOZNAKA")));
		}
		return mesta;
	}

	@Override
	public void save(NaseljenoMesto object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO NASELJENO_MESTO (NM_SIFRA, DR_SIFRA, NM_NAZIV, NM_PTTOZNAKA) VALUES (? ,? ,? ,?)");
		stmt.setInt(1, object.getSifra());
		stmt.setString(2, object.getSifra_drzava());
		stmt.setString(3, object.getNaziv());
		stmt.setString(4, object.getPtt_oznaka());
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit();  
	}

	@Override
	public void remove(String id) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
		        "DELETE FROM NASELJENO_MESTO WHERE NM_SIFRA=?");
		stmt.setInt(1, Integer.parseInt(id));
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();
		
	}

	@Override
	public List<NaseljenoMesto> pretraga(String postPayload) throws SQLException 
	{
		JSONObject json = new JSONObject(postPayload);
		Integer sifra = 0;
		String naziv = "";
		String sifraDrzave = "";
		String nazivDrzave = "";
		String pttOznaka = "";
		
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
			sifraDrzave = json.getString("oznakaDrzave");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivDrzave = json.getString("nazivDrzave");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			pttOznaka = json.getString("ptt");
		}
		catch(Exception e)
		{
			
		}
		
		
		List<NaseljenoMesto> lista = new ArrayList<NaseljenoMesto>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT nm_sifra, nm_naziv, naseljeno_mesto.dr_sifra, dr_naziv, nm_pttoznaka FROM naseljeno_mesto"
				+ " JOIN drzava on naseljeno_mesto.dr_sifra = drzava.dr_sifra WHERE NM_SIFRA = '" + sifra + "' OR NM_NAZIV = '" + naziv + "' OR naseljeno_mesto.dr_sifra = '" + sifraDrzave +"' OR NM_PTTOZNAKA = '" + pttOznaka + "' OR DR_NAZIV = '" + nazivDrzave + "'");
		while(rs.next())
		{
			lista.add(new NaseljenoMesto(rs.getInt("NM_SIFRA"), rs.getString("NM_NAZIV"), rs.getString("DR_SIFRA"), rs.getString("DR_NAZIV"), rs.getString("NM_PTTOZNAKA")));
		}
		
		return lista;
	}

	@Override
	public void update(NaseljenoMesto object) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE NASELJENO_MESTO SET NM_NAZIV = ?, NM_PTTOZNAKA = ? WHERE NM_SIFRA = ? AND DR_SIFRA = ?");
		stmt.setString(1, object.getNaziv());
		stmt.setString(2, object.getPtt_oznaka());
		stmt.setInt(3, object.getSifra());
		stmt.setString(4, object.getSifra_drzava());
		
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit(); 
		
	}

}
