package web.poslovna.serviceImpl;

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
		
		Statement stmt2 = DBConnection.getConnection().createStatement();
		ResultSet rs2 = stmt2.executeQuery("SELECT ID_RACUNA,racuni_pravnih_lica.JMBG_KLIJENTA, racuni_pravnih_lica.ID_VALUTE, racuni_pravnih_lica.PR_PIB, racuni_pravnih_lica.BAN_PR_PIB, BAR_RACUN, BAR_DATOTV, BAR_VAZI, valute.VA_NAZIV,banka.PR_NAZIV, banka2.PR_NAZIV FROM racuni_pravnih_lica JOIN valute ON racuni_pravnih_lica.ID_VALUTE = valute.ID_VALUTE JOIN banka ON racuni_pravnih_lica.PR_PIB = banka.PR_PIB JOIN banka AS banka2 ON racuni_pravnih_lica.BAN_PR_PIB = banka2.PR_PIB");
		while(rs.next()){
			lista.add(new RacuniKlijenata(rs.getInt("ID_RACUNA"), rs.getInt("JMBG_KLIJENTA"),
					rs.getString("NAZIV_KLIJENTA"), rs.getString("PREZIME_KLIJENTA"), 
					rs.getInt("ID_VALUTE"), rs.getString("VA_NAZIV"), 
					null, null, rs.getString("BAN_PR_PIB"),
					rs.getString("PR_NAZIV"), rs.getString("BAR_RACUN"), 
					rs.getDate("BAR_DATOTV"), rs.getBoolean("BAR_VAZI")));
		}
		
		while(rs2.next()){
			lista.add(new RacuniKlijenata(rs.getInt(1), rs.getInt(2), null, null,
					rs.getInt(3), rs.getString(9), rs.getString(4), 
					rs.getString(10), rs.getString(5), rs.getString(11), 
					rs.getString(6), 
					rs.getDate(7), rs.getBoolean(8)));
		}
		return lista;
	}

	@Override
	public void save(RacuniKlijenata object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(RacuniKlijenata object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

}
