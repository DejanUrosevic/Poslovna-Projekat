package web.poslovna.serviceImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.test.context.jdbc.Sql;

import web.poslovna.db.DBConnection;
import web.poslovna.model.RacuniKlijenata;
import web.poslovna.service.RacuniKlijenataService;

@Service
public class RacuniKlijenataServiceImpl implements RacuniKlijenataService{

	@Override
	public RacuniKlijenata findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RacuniKlijenata> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<RacuniKlijenata> lista = new ArrayList<RacuniKlijenata>();
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT ID_RACUNA, racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV, klijent.NAZIV_KLIJENTA, klijent.PREZIME_KLIJENTA, banka.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN klijent ON racuni_pravnih_lica.JMBG_KLIJENTA = klijent.JMBG_KLIJENTA JOIN banka ON racuni_pravnih_lica.BAN_PR_PIB = banka.PR_PIB");
		
		while(rs.next()){
			lista.add(new RacuniKlijenata(rs.getInt("ID_RACUNA"), rs.getInt("JMBG_KLIJENTA"),
					rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), 
					rs.getInt("ID_VALUTE"), rs.getString("VA_NAZIV"), 
					null, null, rs.getString("BAN_PR_PIB"),
					rs.getString("PR_NAZIV"), rs.getString("BAR_RACUN"), 
					rs.getDate("BAR_DATOTV"), rs.getBoolean("BAR_VAZI")));
		}
		
		PreparedStatement stmt2 = DBConnection.getConnection().prepareStatement("SELECT ID_RACUNA,racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.PR_PIB, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV,banka.PR_NAZIV, banka2.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN banka ON racuni_pravnih_lica.PR_PIB = banka.PR_PIB JOIN banka AS banka2 ON racuni_pravnih_lica.BAN_PR_PIB = banka2.PR_PIB");
		ResultSet rs2 = stmt2.executeQuery();
		
		while(rs2.next()){
			lista.add(new RacuniKlijenata(
					rs2.getInt("ID_RACUNA"), 
					rs2.getInt(2),
					null,
					null,
					rs2.getInt(3),
					rs2.getString(9),
					rs2.getString(4), 
					rs2.getString(10),
					rs2.getString(5),
					rs2.getString(11), 
					rs2.getString(6), 
					rs2.getDate(7),
					rs2.getBoolean(8)));
		}
		return lista;
	}

	@Override
	public void save(RacuniKlijenata object) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = 
				DBConnection.getConnection().prepareStatement("INSERT INTO racuni_pravnih_lica (ID_RACUNA, JMBG_KLIJENTA, ID_VALUTE, PR_PIB, BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		stmt.setInt(1, object.getId());
		try {
			stmt.setInt(2, object.getJmbg());
		} catch (NullPointerException e) {
			// TODO: handle exception
			stmt.setNull(2, java.sql.Types.INTEGER);
		}
		stmt.setInt(3, object.getValuta());
		stmt.setString(4, object.getPibKlijenta());
		stmt.setString(5, object.getPibBanke());
		stmt.setString(6, object.getBrRacuna());
		stmt.setDate(7, object.getDatumOtvaranja());
		stmt.setBoolean(8, object.isVazeci());
		stmt.executeUpdate();
	    stmt.close();
	    DBConnection.getConnection().commit();
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
				"DELETE FROM racuni_pravnih_lica WHERE ID_RACUNA = ?");
		stmt.setString(1, id);
		stmt.executeUpdate();
		stmt.close();
		DBConnection.getConnection().commit();	
	}

	@Override
	public void update(RacuniKlijenata object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

}
