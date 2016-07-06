package web.poslovna.serviceImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Kliring;
import web.poslovna.service.KliringService;

@Service
public class KliringServiceImpl implements KliringService{

	@Override
	public Kliring findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Kliring> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<Kliring> lista = new ArrayList<Kliring>();
		//																						1					2					3					4					5					6						7						8						9						10						11			
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT KLIRING.KRI_ID, KLIRING.KRI_DATUM_VALUTE, KLIRING.KRI_DATUM, KLIRING.KRI_SIFRA, KLIRING.ID_RACUNA, KLIRING.RAC_ID_RACUNA, KLIRING.KRI_UKUPNO, RACUNI_PRAVNIH_LICA.BAR_RACUN, BANKA.PR_NAZIV, RACUNI_PRAVNIH_LICA2.BAR_RACUN, BANKA2.PR_NAZIV FROM KLIRING LEFT OUTER JOIN RACUNI_PRAVNIH_LICA ON KLIRING.ID_RACUNA = RACUNI_PRAVNIH_LICA.ID_RACUNA LEFT OUTER JOIN BANKA ON RACUNI_PRAVNIH_LICA.BAN_PR_PIB = BANKA.PR_PIB LEFT OUTER JOIN RACUNI_PRAVNIH_LICA AS RACUNI_PRAVNIH_LICA2 ON KLIRING.RAC_ID_RACUNA = RACUNI_PRAVNIH_LICA2.ID_RACUNA LEFT OUTER JOIN BANKA AS BANKA2 ON RACUNI_PRAVNIH_LICA2.BAN_PR_PIB = BANKA2.PR_PIB;");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new Kliring(rs.getInt(1),
					rs.getDate(2),
					rs.getDate(3), 
					rs.getString(4), 
					rs.getInt(5), 
					rs.getInt(6), 
					rs.getDouble(7), 
					rs.getString(8), 
					rs.getString(10), 
					rs.getString(9), 
					rs.getString(11)));
		}
		return lista;
	}

	@Override
	public void save(Kliring object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Kliring object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

}
