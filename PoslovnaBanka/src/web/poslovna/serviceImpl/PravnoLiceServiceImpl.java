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
import web.poslovna.model.KursnaLista;
import web.poslovna.model.PravnoLice;
import web.poslovna.service.PravnoLiceService;

@Service
public class PravnoLiceServiceImpl implements PravnoLiceService{

	@Override
	public PravnoLice findOne(String id) throws SQLException 
	{
		PravnoLice pl = null;
		
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT PR_PIB, banka.JMBG_KLIJENTA, PR_NAZIV, PR_ADRESA, PR_EMAIL, PR_WEB, PR_TELEFON, PR_FAX, PR_BANKA, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA FROM banka JOIN klijent ON banka.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA WHERE PR_PIB = '"+ id + "' ORDER BY PR_PIB");
		while(rs.next()){
			pl = new PravnoLice(rs.getString("PR_PIB"), rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), rs.getString("PR_NAZIV"), rs.getString("PR_ADRESA"), rs.getString("PR_EMAIL"), rs.getString("PR_WEB"), rs.getString("PR_TELEFON"), rs.getString("PR_FAX"), rs.getBoolean("PR_BANKA"));
		}
		return pl;
	}

	@Override
	public List<PravnoLice> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<PravnoLice> lista = new ArrayList<PravnoLice>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT PR_PIB, banka.JMBG_KLIJENTA, PR_NAZIV, PR_ADRESA, PR_EMAIL, PR_WEB, PR_TELEFON, PR_FAX, PR_BANKA, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA FROM banka JOIN klijent ON banka.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA ORDER BY PR_PIB");
		while(rs.next()){
			lista.add(new PravnoLice(rs.getString("PR_PIB"), rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), rs.getString("PR_NAZIV"), rs.getString("PR_ADRESA"), rs.getString("PR_EMAIL"), rs.getString("PR_WEB"), rs.getString("PR_TELEFON"), rs.getString("PR_FAX"), rs.getBoolean("PR_BANKA")));
		}
		
		return lista;
	}

	@Override
	public void save(PravnoLice object) throws SQLException {
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO BANKA (PR_PIB, JMBG_KLIJENTA, PR_NAZIV, PR_ADRESA, PR_EMAIL, PR_WEB, PR_TELEFON, PR_FAX, PR_BANKA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.setString(1, object.getPib());
		stmt.setInt(2, object.getJmbgKlijenta());
		stmt.setString(3, object.getNaziv());
		stmt.setString(4, object.getAdresa());
		stmt.setString(5, object.getEmail());
		stmt.setString(6, object.getWeb());
		stmt.setString(7, object.getTelefon());
		stmt.setString(8, object.getFax());
		stmt.setBoolean(9, object.isBanka());
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit();
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
				"DELETE FROM BANKA WHERE PR_PIB = ?");
		stmt.setString(1, id);
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();	
		
	}

	@Override
	public void update(PravnoLice object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE BANKA SET JMBG_KLIJENTA = ?, PR_NAZIV = ?, PR_ADRESA = ?, PR_EMAIL = ?, PR_WEB = ?, PR_TELEFON = ?, PR_FAX = ?, PR_BANKA = ? WHERE PR_PIB = ?");
		stmt.setInt(1, object.getJmbgKlijenta());
		stmt.setString(2, object.getNaziv());
		stmt.setString(3, object.getAdresa());
		stmt.setString(4, object.getEmail());
		stmt.setString(5, object.getWeb());
		stmt.setString(6, object.getTelefon());
		stmt.setString(7, object.getFax());
		stmt.setBoolean(8, object.isBanka());
		stmt.setString(9, object.getPib());
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();
	}

	@Override
	public List<PravnoLice> pretraga(String postPayload) throws SQLException {
		// TODO Auto-generated method stub
		JSONObject json = new JSONObject(postPayload);
		String pib = "";
		String naziv = "";
		String adresa = "";
		String email = "";
		String web = "";
		String telefon = "";
		String fax = "";
		Boolean banka = null;
		int jmbg = 0;
		String ime = "";
		String prezime = "";

		try {
			pib = json.getString("pib");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			naziv = json.getString("naziv");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			adresa = json.getString("adresa");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			email = json.getString("email");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			web = json.getString("web");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			telefon = json.getString("telefon");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			fax = json.getString("fax");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		boolean nijeString = false;
		try {
			jmbg = Integer.parseInt(json.getString("jmbg"));
		} catch (Exception e) {
			// TODO: handle exception
			nijeString = true;
		}
		
		if(nijeString){
			try {
				jmbg = json.getInt("jmbg");
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		
		try {
			ime = json.getString("ime");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			prezime = json.getString("prezime");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		try {
			banka = Boolean.parseBoolean(json.getString("banka"));
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		if(banka != null)
		{
			List<PravnoLice> lista = new ArrayList<PravnoLice>();
			Statement sql = DBConnection.getConnection().createStatement();
			ResultSet rs = sql.executeQuery("SELECT PR_PIB, banka.JMBG_KLIJENTA, PR_NAZIV, PR_ADRESA, PR_EMAIL, PR_WEB, PR_TELEFON, PR_FAX, PR_BANKA, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA FROM banka JOIN klijent ON banka.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA WHERE pr_pib = '" 
			+ pib + "' OR banka.JMBG_KLIJENTA= '" + jmbg + "' OR PR_NAZIV = '" + naziv +
					"' OR PR_ADRESA = '" + adresa + "' OR PR_EMAIL = '" + email + "' OR PR_WEB = '" 
			+ web + "' or PR_TELEFON ='" + telefon + "' or PR_FAX = '" + fax + "' OR PR_BANKA = '" + banka + "'");
			
			while(rs.next()){
				lista.add(new PravnoLice(rs.getString("PR_PIB"), rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), rs.getString("PR_NAZIV"), rs.getString("PR_ADRESA"), rs.getString("PR_EMAIL"), rs.getString("PR_WEB"), rs.getString("PR_TELEFON"), rs.getString("PR_FAX"), rs.getBoolean("PR_BANKA")));
			}
			
			return lista;
		}
		else
		{
			List<PravnoLice> lista = new ArrayList<PravnoLice>();
			Statement sql = DBConnection.getConnection().createStatement();
			ResultSet rs = sql.executeQuery("SELECT PR_PIB, banka.JMBG_KLIJENTA, PR_NAZIV, PR_ADRESA, PR_EMAIL, PR_WEB, PR_TELEFON, PR_FAX, PR_BANKA, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA FROM banka JOIN klijent ON banka.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA WHERE pr_pib = '" 
			+ pib + "' OR banka.JMBG_KLIJENTA= '" + jmbg + "' OR PR_NAZIV = '" + naziv +
					"' OR PR_ADRESA = '" + adresa + "' OR PR_EMAIL = '" + email + "' OR PR_WEB = '" 
			+ web + "' or PR_TELEFON ='" + telefon + "' or PR_FAX = '" + fax + "'");
			
			while(rs.next()){
				lista.add(new PravnoLice(rs.getString("PR_PIB"), rs.getInt("JMBG_KLIJENTA"), rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), rs.getString("PR_NAZIV"), rs.getString("PR_ADRESA"), rs.getString("PR_EMAIL"), rs.getString("PR_WEB"), rs.getString("PR_TELEFON"), rs.getString("PR_FAX"), rs.getBoolean("PR_BANKA")));
			}
			
			return lista;
		}
		
		
	}

	@Override
	public List<KursnaLista> findKursneListe(String id) throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT ID_KURSNE_LISTE, KL_DATUM, KURSNA_LISTA.PR_PIB, PR_NAZIV, KL_BROJ, KL_DATPR FROM KURSNA_LISTA"
				+ " JOIN BANKA ON KURSNA_LISTA.PR_PIB = BANKA.PR_PIB WHERE KURSNA_LISTA.PR_PIB = '"+ Integer.parseInt(id.replace(" ", "")) + "' ORDER BY ID_KURSNE_LISTE" );
		
		List<KursnaLista> lista = new ArrayList<KursnaLista>();
		while(rs.next()){
			lista.add(new KursnaLista(rs.getInt("ID_KURSNE_LISTE"), rs.getDate("KL_DATUM"), rs.getBigDecimal("KL_BROJ"), rs.getDate("KL_DATPR"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV")));
		}
		
		return lista;
	}

}
