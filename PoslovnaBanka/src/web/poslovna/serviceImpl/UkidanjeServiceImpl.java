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
import web.poslovna.model.FizickoLice;
import web.poslovna.model.Ukidanje;
import web.poslovna.service.UkidanjeService;

@Service
public class UkidanjeServiceImpl implements UkidanjeService{

	@Override
	public Ukidanje findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Ukidanje> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<Ukidanje> lista = new ArrayList<Ukidanje>();
		PreparedStatement sql = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, KLIJENT.NAZIV_KLIJENTA, KLIJENT.PREZIME_KLIJENTA, BANKA.PR_NAZIV, KLIJENT2.NAZIV_KLIJENTA, KLIJENT2.PREZIME_KLIJENTA FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN KLIJENT ON RACUNI_PRAVNIH_LICA.JMBG_KLIJENTA = KLIJENT.JMBG_KLIJENTA JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN KLIJENT AS KLIJENT2 ON RACUNI_PRAVNIH_LICA2.JMBG_KLIJENTA = KLIJENT2.JMBG_KLIJENTA;");
		
		//											1				2					3			4						5						6						7						8					9							10						
		ResultSet rs = sql.executeQuery();
		//fizicko lice prebacuje fizickom licu
		while(rs.next()){
			lista.add(new Ukidanje(rs.getInt(1),
					rs.getInt(2), 
					rs.getString(5), 
					rs.getString(6) + " " + rs.getString(7), 
					rs.getString(8), 
					rs.getDate(3), 
					rs.getString(4), 
					rs.getString(9) + " " + rs.getString(10)));
		}

		sql.close();
		
		//																					1				2				3				4						5							6					7						8				9			
		PreparedStatement sql2 = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, KLIJENT.NAZIV_KLIJENTA, KLIJENT.PREZIME_KLIJENTA, BANKA.PR_NAZIV, BANKA2.PR_NAZIV FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN KLIJENT ON RACUNI_PRAVNIH_LICA.JMBG_KLIJENTA = KLIJENT.JMBG_KLIJENTA JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.PR_PIB = BANKA2.PR_PIB;");
		ResultSet rs2 = sql2.executeQuery();
		//fizicko lice prebacuje pravnom licu
		while(rs2.next()){
			lista.add(new Ukidanje(rs2.getInt(1),
					rs2.getInt(2),
					rs2.getString(5),
					rs2.getString(6) + " " + rs2.getString(7),
					rs2.getString(8),
					rs2.getDate(3),
					rs2.getString(4),
					rs2.getString(9)));
		}
		
		sql2.close();
		
		//																					1				2					3			4						5					6					7				8		
		PreparedStatement sql3 = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA3.PR_NAZIV, BANKA.PR_NAZIV, BANKA2.PR_NAZIV FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN BANKA AS BANKA3 ON RACUNI_PRAVNIH_LICA.PR_PIB = BANKA3.PR_PIB JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.PR_PIB = BANKA2.PR_PIB;");
		ResultSet rs3 = sql3.executeQuery();
		//pravno lice prebacuje pravnom licu
		while(rs3.next()){
			lista.add(new Ukidanje(rs3.getInt(1),
					rs3.getInt(2), 
					rs3.getString(5),
					rs3.getString(6),
					rs3.getString(7),
					rs3.getDate(3),
					rs3.getString(4),
					rs3.getString(8)));
		}
		
		sql3.close();
		
		//																					1				2					3			4						5					6					7					8						9				
		PreparedStatement sql4 = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA3.PR_NAZIV, BANKA.PR_NAZIV, KLIJENT.NAZIV_KLIJENTA, KLIJENT.PREZIME_KLIJENTA FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN BANKA AS BANKA3 ON RACUNI_PRAVNIH_LICA.PR_PIB = BANKA3.PR_PIB JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN KLIJENT ON RACUNI_PRAVNIH_LICA2.JMBG_KLIJENTA = KLIJENT.JMBG_KLIJENTA;");
		ResultSet rs4 = sql4.executeQuery();
		//pravno lice prebacuje fizickom licu
		while(rs4.next()){
			lista.add(new Ukidanje(rs4.getInt(1),
					rs4.getInt(2),
					rs4.getString(5),
					rs4.getString(6), 
					rs4.getString(7), 
					rs4.getDate(3), 
					rs4.getString(4),
					rs4.getString(8) + " " + rs4.getString(9)));
		}
		
		return lista;
	}

	@Override
	public void save(Ukidanje object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement sql = DBConnection.getConnection().prepareStatement("INSERT INTO ukidanje (ID_UKIDANJA, ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN) VALUES (?, ?, ?, ?);");
		sql.setInt(1, object.getId());
		sql.setInt(2, object.getIdRacuna());
		sql.setDate(3, object.getDatum());
		sql.setString(4, object.getRacunZaPrebacivanje());
		sql.executeUpdate();
		sql.close();
		
		PreparedStatement sql2 = DBConnection.getConnection().prepareStatement("UPDATE RACUNI_PRAVNIH_LICA SET BAR_VAZI = ? WHERE ID_RACUNA = ?");
		sql2.setBoolean(1, false);
		sql2.setInt(2, object.getIdRacuna());
		sql2.executeUpdate();
		sql2.close();
		DBConnection.getConnection().commit();
		
		double iznos = 0.0;
		
		//ciscenje racuna za gasenje
		PreparedStatement sql3 = DBConnection.getConnection().prepareStatement("select ID_RACUNA from RACUNI_PRAVNIH_LICA where BAR_RACUN = '" + object.getBrRacuna() + "';");
		ResultSet rs3 = sql3.executeQuery();
		while(rs3.next()){
			PreparedStatement sql4 = DBConnection.getConnection().prepareStatement("select DSR_NOVOSTANJE from dnevno_stanje_racuna where ID_RACUNA = '" + rs3.getInt(1) + "';", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs4 = sql4.executeQuery();
			
			if(rs4.last()){
				iznos = rs4.getDouble(1);
				PreparedStatement sql5 = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
				sql5.setInt(1, rs3.getInt(1));
				sql5.setDate(2, new Date(new java.util.Date().getTime()));
				sql5.setDouble(3, rs4.getDouble(1));
				sql5.setDouble(4, 0.0);
				sql5.setDouble(5, rs4.getDouble(1));
				sql5.setDouble(6, 0.0);
				sql5.executeUpdate();
				sql5.close();
				DBConnection.getConnection().commit();
			}
		}
		
		//prebacivanje para na racun
		PreparedStatement sql6 = DBConnection.getConnection().prepareStatement("select ID_RACUNA from RACUNI_PRAVNIH_LICA where BAR_RACUN = '" + object.getRacunZaPrebacivanje() + "';");
		ResultSet rs6 = sql6.executeQuery();
		while(rs6.next()){
			PreparedStatement sql7 = DBConnection.getConnection().prepareStatement("select DSR_NOVOSTANJE from dnevno_stanje_racuna where ID_RACUNA = '" + rs6.getInt(1) + "';", ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs7 = sql7.executeQuery();
					
			if(rs7.last()){
				PreparedStatement sql8 = DBConnection.getConnection().prepareStatement("INSERT INTO dnevno_stanje_racuna (ID_RACUNA, DSR_DATUM, DSR_PRETHODNO, DSR_UKORIST, DSR_NATERET, DSR_NOVOSTANJE) VALUES (?, ?, ?, ?, ?, ?);");
				sql8.setInt(1, rs6.getInt(1));
				sql8.setDate(2, new Date(new java.util.Date().getTime()));
				sql8.setDouble(3, rs7.getDouble(1));
				sql8.setDouble(4, iznos);
				sql8.setDouble(5, 0.0);
				sql8.setDouble(6, rs7.getDouble(1) + iznos);
				sql8.executeUpdate();
				sql8.close();
				DBConnection.getConnection().commit();
			}
		}
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement sql = DBConnection.getConnection().prepareStatement("DELETE FROM UKIDANJE WHERE ID_UKIDANJA = ?");
		sql.setInt(1, Integer.parseInt(id));
		sql.executeUpdate();
		sql.close();
		DBConnection.getConnection().commit();
	}

	@Override
	public void update(Ukidanje object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Ukidanje> pretraga(String postPayload) throws SQLException,
			ParseException {
		JSONObject json = new JSONObject(postPayload);
		
		Integer id = null;
		Integer idRacuna = null;
		String brRacunaPrimaoca = null;
		
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
			brRacunaPrimaoca = json.getString("racunZaPrebacivanje");
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		Date date = null;
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String[] datum = (json.getString("datum")).split("T");
			date = new Date((dateFormat.parse(datum[0])).getTime());	
		} catch (Exception e) {
			// TODO: handle exception
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = new Date((dateFormat.parse("8000-01-01")).getTime());
		}
		
		List<Ukidanje> lista = new ArrayList<Ukidanje>();
		
		
		Statement sql = DBConnection.getConnection().createStatement();
		//											1				2					3			4						5						6						7						8					9							10						
		ResultSet rs = sql.executeQuery("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, KLIJENT.NAZIV_KLIJENTA, KLIJENT.PREZIME_KLIJENTA, BANKA.PR_NAZIV, KLIJENT2.NAZIV_KLIJENTA, KLIJENT2.PREZIME_KLIJENTA FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN KLIJENT ON RACUNI_PRAVNIH_LICA.JMBG_KLIJENTA = KLIJENT.JMBG_KLIJENTA JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN KLIJENT AS KLIJENT2 ON RACUNI_PRAVNIH_LICA2.JMBG_KLIJENTA = KLIJENT2.JMBG_KLIJENTA WHERE "
				+ " ID_UKIDANJA = '" + id + "' OR UKIDANJE.ID_RACUNA = '" + idRacuna + "' OR convert(date, UK_DATUKIDANJA) = convert(date,'"+ date+ "',120) OR UK_NARACUN = '" + brRacunaPrimaoca + "'" );
		//fizicko lice prebacuje fizickom licu
		while(rs.next()){
			lista.add(new Ukidanje(rs.getInt(1),
					rs.getInt(2), 
					rs.getString(5), 
					rs.getString(6) + " " + rs.getString(7), 
					rs.getString(8), 
					rs.getDate(3), 
					rs.getString(4), 
					rs.getString(9) + " " + rs.getString(10)));
		}

		//																					1				2				3				4						5							6					7						8				9			
		PreparedStatement sql2 = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, KLIJENT.NAZIV_KLIJENTA, KLIJENT.PREZIME_KLIJENTA, BANKA.PR_NAZIV, BANKA2.PR_NAZIV FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN KLIJENT ON RACUNI_PRAVNIH_LICA.JMBG_KLIJENTA = KLIJENT.JMBG_KLIJENTA JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.PR_PIB = BANKA2.PR_PIB WHERE "
				+" ID_UKIDANJA = '" + id + "' OR UKIDANJE.ID_RACUNA = '" + idRacuna + "' OR convert(date, UK_DATUKIDANJA) = convert(date,'"+ date+ "',120) OR UK_NARACUN = '" + brRacunaPrimaoca + "'" );
		ResultSet rs2 = sql2.executeQuery();
		//fizicko lice prebacuje pravnom licu
		while(rs2.next()){
			lista.add(new Ukidanje(rs2.getInt(1),
					rs2.getInt(2),
					rs2.getString(5),
					rs2.getString(6) + " " + rs2.getString(7),
					rs2.getString(8),
					rs2.getDate(3),
					rs2.getString(4),
					rs2.getString(9)));
		}
		
		sql2.close();
		
		//																					1				2					3			4						5					6					7				8		
		PreparedStatement sql3 = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA3.PR_NAZIV, BANKA.PR_NAZIV, BANKA2.PR_NAZIV FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN BANKA AS BANKA3 ON RACUNI_PRAVNIH_LICA.PR_PIB = BANKA3.PR_PIB JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.PR_PIB = BANKA2.PR_PIB WHERE "
				+" ID_UKIDANJA = '" + id + "' OR UKIDANJE.ID_RACUNA = '" + idRacuna + "' OR convert(date, UK_DATUKIDANJA) = convert(date,'"+ date+ "',120) OR UK_NARACUN = '" + brRacunaPrimaoca + "'" );
		ResultSet rs3 = sql3.executeQuery();
		//pravno lice prebacuje pravnom licu
		while(rs3.next()){
			lista.add(new Ukidanje(rs3.getInt(1),
					rs3.getInt(2), 
					rs3.getString(5),
					rs3.getString(6),
					rs3.getString(7),
					rs3.getDate(3),
					rs3.getString(4),
					rs3.getString(8)));
		}
		
		sql3.close();
		
		//																					1				2					3			4						5					6					7					8						9				
		PreparedStatement sql4 = DBConnection.getConnection().prepareStatement("SELECT ID_UKIDANJA, UKIDANJE.ID_RACUNA, UK_DATUKIDANJA, UK_NARACUN, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA3.PR_NAZIV, BANKA.PR_NAZIV, KLIJENT.NAZIV_KLIJENTA, KLIJENT.PREZIME_KLIJENTA FROM UKIDANJE JOIN RACUNI_PRAVNIH_LICA ON UKIDANJE.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA JOIN BANKA AS BANKA3 ON RACUNI_PRAVNIH_LICA.PR_PIB = BANKA3.PR_PIB JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON UKIDANJE.UK_NARACUN = RACUNI_PRAVNIH_LICA2.BAR_RACUN JOIN KLIJENT ON RACUNI_PRAVNIH_LICA2.JMBG_KLIJENTA = KLIJENT.JMBG_KLIJENTA WHERE "
				+ " ID_UKIDANJA = '" + id + "' OR UKIDANJE.ID_RACUNA = '" + idRacuna + "' OR convert(date, UK_DATUKIDANJA) = convert(date,'"+ date+ "',120) OR UK_NARACUN = '" + brRacunaPrimaoca + "'" );
		ResultSet rs4 = sql4.executeQuery();
		//pravno lice prebacuje fizickom licu
		while(rs4.next()){
			lista.add(new Ukidanje(rs4.getInt(1),
					rs4.getInt(2),
					rs4.getString(5),
					rs4.getString(6), 
					rs4.getString(7), 
					rs4.getDate(3), 
					rs4.getString(4),
					rs4.getString(8) + " " + rs4.getString(9)));
		}
		
		return lista;
	}

}
