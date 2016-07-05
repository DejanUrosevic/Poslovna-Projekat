package web.poslovna.serviceImpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Analitike;
import web.poslovna.service.AnalitikeService;

@Service
public class AnalitikeServiceImpl implements AnalitikeService{

	@Override
	public Analitike findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Analitike> findAll() throws SQLException {
		// TODO Auto-generated method stub
		List<Analitike> lista = new ArrayList<Analitike>();
		//																								1								2							3							4							5							6							7							8							9								10							11								12							13							14						15								16								17							18							19								20							21					22					23										
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("SELECT ANALITIKA_IZVODA.ASI_BROJSTAVKE, ANALITIKA_IZVODA.VPL_OZNAKA, ANALITIKA_IZVODA.NM_SIFRA, ANALITIKA_IZVODA.ID_VALUTE, ANALITIKA_IZVODA.DSR_IZVOD, ANALITIKA_IZVODA.ASI_DUZNIK, ANALITIKA_IZVODA.ASI_SVRHA, ANALITIKA_IZVODA.ASI_POVERILAC, ANALITIKA_IZVODA.ASI_DATPRI, ANALITIKA_IZVODA.ASI_DATVAL, ANALITIKA_IZVODA.ASI_RACDUZ, ANALITIKA_IZVODA.ASI_MODZAD, ANALITIKA_IZVODA.ASI_PBZAD, ANALITIKA_IZVODA.ASI_RACPOV, ANALITIKA_IZVODA.ASI_MODODOB, ANALITIKA_IZVODA.ASI_PBODO, ANALITIKA_IZVODA.ASI_HITNO, ANALITIKA_IZVODA.ASI_IZNOS, ANALITIKA_IZVODA.ASI_TIPGRESKE, ANALITIKA_IZVODA.ASI_STATUS, NASELJENO_MESTO.NM_NAZIV, VALUTE.VA_NAZIV, VRSTE_PLACANJA.VPL_NAZIV FROM ANALITIKA_IZVODA JOIN NASELJENO_MESTO ON ANALITIKA_IZVODA.NM_SIFRA = NASELJENO_MESTO.NM_SIFRA JOIN VALUTE ON ANALITIKA_IZVODA.ID_VALUTE = VALUTE.ID_VALUTE JOIN VRSTE_PLACANJA ON VRSTE_PLACANJA.VPL_OZNAKA = ANALITIKA_IZVODA.VPL_OZNAKA;");
		ResultSet rs = stmt.executeQuery();
		while(rs.next()){
			lista.add(new Analitike(rs.getInt(1), //id int
					rs.getString(6), //duznik string
					rs.getString(7), //svrha string
					rs.getString(8), //poverilac string
					rs.getDate(9), //datumPrijema date
					rs.getDate(10), //datumValute date
					rs.getString(11), //racunDuznika string
					rs.getDouble(12), //modelZaduzenja double
					rs.getString(13), //pbZaduzenja string
					rs.getString(14), //racunPoverioca string
					rs.getDouble(15), //modelOdobrenja double
					rs.getString(16), //pbOdobrenja string
					rs.getBoolean(17), //hitno boolean
					rs.getDouble(18), //iznos double
					rs.getDouble(19), //tipGreske double
					rs.getString(20), //status string 
					rs.getDouble(2), //idVrstePlacanja double
					rs.getString(23), //nazivPlacanja string
					rs.getInt(3),  //idNaselja int
					rs.getString(21), //naselje string
					rs.getInt(4), //idValute int
					rs.getString(22), //valuta string
					rs.getInt(5))); //idIzvoda int
		}
		
		return lista;
	}

	@Override
	public void save(Analitike object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove(String id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Analitike object) throws SQLException {
		// TODO Auto-generated method stub
		
	}

}
