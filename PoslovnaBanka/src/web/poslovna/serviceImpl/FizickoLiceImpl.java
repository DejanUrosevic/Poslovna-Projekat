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
import web.poslovna.model.FizickoLice;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.PravnoLice;
import web.poslovna.service.FizickoLiceService;

@Service
public class FizickoLiceImpl implements FizickoLiceService{

	@Override
	public FizickoLice findOne(String id) throws SQLException 
	{
		FizickoLice fl = null;
		
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM KLIJENT WHERE JMBG_KLIJENTA = '" + Integer.parseInt(id) +"'");
		while(rs.next())
		{
			fl = new FizickoLice(rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"),
					rs.getString("PREZIME_KLIJENTA"), rs.getString("EMAIL_KLIJENTA"), 
					rs.getString("ADRESA_KLIJENTA"), rs.getString("BROJ_TELEFONA_KLIJENT"));
		}
		return fl;
	}

	@Override
	public List<FizickoLice> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<FizickoLice> lista = new ArrayList<FizickoLice>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM KLIJENT ORDER BY JMBG_KLIJENTA");
		while(rs.next()){
			lista.add(new FizickoLice(rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"),
					rs.getString("PREZIME_KLIJENTA"), rs.getString("EMAIL_KLIJENTA"), 
					rs.getString("ADRESA_KLIJENTA"), rs.getString("BROJ_TELEFONA_KLIJENT")));
		}
		
		return lista;
	}

	@Override
	public void save(FizickoLice object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
			       "INSERT INTO KLIJENT (JMBG_KLIJENTA, NAZIV_KLIJENTA, PREZIME_KLIJENTA, EMAIL_KLIJENTA,"
			       + "ADRESA_KLIJENTA, BROJ_TELEFONA_KLIJENT) VALUES (? ,? ,?, ?, ?, ?)");
		 stmt.setInt(1, object.getJmbg());
	     stmt.setString(2, object.getNaziv());
	     stmt.setString(3, object.getPrezime());
	     stmt.setString(4, object.getEmail());
	     stmt.setString(5, object.getAdresa());
	     stmt.setString(6, object.getTelefon());
	     stmt.executeUpdate();
	     stmt.close();
	     DBConnection.getConnection().commit();
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
				"DELETE FROM KLIJENT WHERE JMBG_KLIJENTA = ?");
		stmt.setInt(1, Integer.parseInt(id));
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();	
	}

	@Override
	public void update(FizickoLice object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
				"UPDATE KLIJENT SET NAZIV_KLIJENTA = ?, PREZIME_KLIJENTA = ?, EMAIL_KLIJENTA = ?, ADRESA_KLIJENTA = ?, BROJ_TELEFONA_KLIJENT = ? WHERE JMBG_KLIJENTA = ?");
		stmt.setString(1, object.getNaziv());
		stmt.setString(2, object.getPrezime());
		stmt.setString(3, object.getEmail());
		stmt.setString(4, object.getAdresa());
		stmt.setString(5, object.getTelefon());
		stmt.setInt(6, object.getJmbg());
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();
	}

	@Override
	public List<FizickoLice> pretraga(String postPayload) throws SQLException {
		// TODO Auto-generated method stub
		JSONObject json = new JSONObject(postPayload);
		int jmbg = 0;
		String naziv = "";
		String prezime = "";
		String email = "";
		String adresa = "";
		String telefon = "";
		
		try {
			jmbg = Integer.parseInt(json.getString("jmbg"));
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			naziv = json.getString("naziv");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			prezime = json.getString("prezime");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			email = json.getString("email");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			adresa = json.getString("adresa");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			telefon = json.getString("telefon");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		List<FizickoLice> lista = new ArrayList<FizickoLice>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM KLIJENT WHERE JMBG_KLIJENTA = '" + jmbg + "' OR NAZIV_KLIJENTA = '" + naziv + "' OR PREZIME_KLIJENTA = '" + prezime +
				"' OR EMAIL_KLIJENTA = '" + email + "' OR ADRESA_KLIJENTA = '" + adresa + "' OR BROJ_TELEFONA_KLIJENT = '" + telefon + "'");
		
		while(rs.next()){
			lista.add(new FizickoLice(rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), rs.getString("EMAIL_KLIJENTA"), rs.getString("ADRESA_KLIJENTA"), rs.getString("BROJ_TELEFONA_KLIJENT")));
		}
		
		return lista;
	}

	@Override
	public List<PravnoLice> findPravnoLice(String id) throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT PR_PIB, banka.JMBG_KLIJENTA, PR_NAZIV, PR_ADRESA, PR_EMAIL, PR_WEB, PR_TELEFON, PR_FAX, PR_BANKA, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA FROM banka JOIN klijent ON banka.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA WHERE banka.JMBG_KLIJENTA = "+ Integer.parseInt(id) + " ORDER BY PR_PIB");
		
		List<PravnoLice> lista = new ArrayList<PravnoLice>();
		while(rs.next()){
			lista.add(new PravnoLice(rs.getString("PR_PIB"), rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), rs.getString("PR_NAZIV"), rs.getString("PR_ADRESA"), rs.getString("PR_EMAIL"), rs.getString("PR_WEB"), rs.getString("PR_TELEFON"), rs.getString("PR_FAX"), rs.getBoolean("PR_BANKA")));
		}
		return lista;
		
	}

}
