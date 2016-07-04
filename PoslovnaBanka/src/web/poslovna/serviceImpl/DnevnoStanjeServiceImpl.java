package web.poslovna.serviceImpl;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.DnevnoStanje;
import web.poslovna.service.DnevnoStanjeService;

@Service
public class DnevnoStanjeServiceImpl implements DnevnoStanjeService{

	@Override
	public DnevnoStanje findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<DnevnoStanje> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<DnevnoStanje> lista = new ArrayList<DnevnoStanje>();
		//																									1				2			3				4			5			6						7								8				9						10						11							12
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT dnevno_stanje_racuna.ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE, racuni_pravnih_lica.JMBG_KLIJENTA, banka.PR_NAZIV, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA, racuni_pravnih_lica.BAR_RACUN, DSR_IZVOD FROM DNEVNO_STANJE_RACUNA JOIN RACUNI_PRAVNIH_LICA ON dnevno_stanje_racuna.ID_RACUNA = racuni_pravnih_lica.ID_RACUNA JOIN BANKA ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB JOIN KLIJENT ON racuni_pravnih_lica.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA;");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new DnevnoStanje(rs.getInt(12),
					rs.getString(11),
					rs.getString(9) + " " + rs.getString(10),
					rs.getString(8), 
					rs.getDouble(3), 
					rs.getDouble(5), 
					rs.getDouble(4), 
					rs.getDouble(6),
					rs.getDate(2)));
		}
		
		stmt.close();
		
		//																								1					2			3				4			5				6				7				8							9							
		PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("SELECT dnevno_stanje_racuna.ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE, banka.PR_NAZIV, banka2.PR_NAZIV, racuni_pravnih_lica.BAR_RACUN, DSR_IZVOD FROM DNEVNO_STANJE_RACUNA JOIN RACUNI_PRAVNIH_LICA ON dnevno_stanje_racuna.ID_RACUNA = racuni_pravnih_lica.ID_RACUNA JOIN BANKA ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB JOIN BANKA AS banka2 ON racuni_pravnih_lica.PR_PIB = banka2.PR_PIB;");
		ResultSet rs2 = stmt2.executeQuery();
		while(rs2.next()){
			lista.add(new DnevnoStanje(rs2.getInt(10),
					rs2.getString(9),
					rs2.getString(8),
					rs2.getString(7), 
					rs2.getDouble(3),
					rs2.getDouble(5), 
					rs2.getDouble(4), 
					rs2.getDouble(6), 
					rs2.getDate(2)));
		}
		
		stmt2.close();
		
		return lista;
	}

	@Override
	public void save(DnevnoStanje object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(DnevnoStanje object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<DnevnoStanje> pretraga(String postPayload) throws SQLException,
			ParseException {
		// TODO Auto-generated method stub
		JSONObject json = new JSONObject(postPayload);
		
		Integer id = null;
		Integer idRacuna = null;
		Double staroStanje = null;
		Double naTeret = null;
		Double uKorist = null;
		Double novoStanje = null;
		Date date = null;
		
		try {
			id = json.getInt("id");
		} catch (Exception e) {
			// TODO: handle exception
			id = -1;
		}
		
		try {
			idRacuna = json.getInt("idRacuna");
		} catch (Exception e) {
			// TODO: handle exception
			idRacuna = -1;
		}
		
		try {
			staroStanje = json.getDouble("staroStanje");
		} catch (Exception e) {
			// TODO: handle exception
			staroStanje = -1.0;
		}
		
		try {
			naTeret = json.getDouble("naTeret");
		} catch (Exception e) {
			// TODO: handle exception
			naTeret = -1.0;
		}
		
		try {
			uKorist = json.getDouble("uKorist");
		} catch (Exception e) {
			// TODO: handle exception
			uKorist = -1.0;
		}
		
		try {
			novoStanje = json.getDouble("novoStanje");
		} catch (Exception e) {
			// TODO: handle exception
			novoStanje = -1.0;
		}
		
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String[] datum = (json.getString("datum")).split("T");
			date = new Date((dateFormat.parse(datum[0])).getTime());	
		} catch (Exception e) {
			// TODO: handle exception
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = new Date((dateFormat.parse("8000-01-01")).getTime());
		}
		
		
		
		List<DnevnoStanje> lista = new ArrayList<DnevnoStanje>();
		//																									1				2			3				4			5			6						7								8				9						10						11							12
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT dnevno_stanje_racuna.ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE, racuni_pravnih_lica.JMBG_KLIJENTA, banka.PR_NAZIV, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA, racuni_pravnih_lica.BAR_RACUN, DSR_IZVOD FROM DNEVNO_STANJE_RACUNA JOIN RACUNI_PRAVNIH_LICA ON dnevno_stanje_racuna.ID_RACUNA = racuni_pravnih_lica.ID_RACUNA JOIN BANKA ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB JOIN KLIJENT ON racuni_pravnih_lica.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA WHERE " + 
				 " DSR_IZVOD = '" + id + "' OR dnevno_stanje_racuna.ID_RACUNA = '" + idRacuna + "' OR DSR_DATUM >= '" + date + "' OR DSR_PRETHODNO = '" + staroStanje + "' OR DSR_UKORIST = '" + uKorist + "' OR DSR_NATERET = '" + naTeret + "' OR DSR_NOVOSTANJE = '" + novoStanje + "'");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new DnevnoStanje(rs.getInt(12),
					rs.getString(11),
					rs.getString(9) + " " + rs.getString(10),
					rs.getString(8), 
					rs.getDouble(3), 
					rs.getDouble(5), 
					rs.getDouble(4), 
					rs.getDouble(6),
					rs.getDate(2)));
		}
		
		stmt.close();
		
		//																								1					2			3				4			5				6				7				8							9							
		PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("SELECT dnevno_stanje_racuna.ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE, banka.PR_NAZIV, banka2.PR_NAZIV, racuni_pravnih_lica.BAR_RACUN, DSR_IZVOD FROM DNEVNO_STANJE_RACUNA JOIN RACUNI_PRAVNIH_LICA ON dnevno_stanje_racuna.ID_RACUNA = racuni_pravnih_lica.ID_RACUNA JOIN BANKA ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB JOIN BANKA AS banka2 ON racuni_pravnih_lica.PR_PIB = banka2.PR_PIB WHERE " +
				" DSR_IZVOD = '" + id + "' OR dnevno_stanje_racuna.ID_RACUNA = '" + idRacuna + "' OR DSR_DATUM >= '" + date + "' OR DSR_PRETHODNO = '" + staroStanje + "' OR DSR_UKORIST = '" + uKorist + "' OR DSR_NATERET = '" + naTeret + "' OR DSR_NOVOSTANJE = '" + novoStanje + "'");
		ResultSet rs2 = stmt2.executeQuery();
		while(rs2.next()){
			lista.add(new DnevnoStanje(rs2.getInt(10),
					rs2.getString(9),
					rs2.getString(8),
					rs2.getString(7), 
					rs2.getDouble(3),
					rs2.getDouble(5), 
					rs2.getDouble(4), 
					rs2.getDouble(6), 
					rs2.getDate(2)));
		}
		
		stmt2.close();
		
		return lista;
	}

}
