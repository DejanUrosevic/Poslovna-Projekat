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
import web.poslovna.model.KodoviBanke;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.KodoviBankeService;

@Service
public class KodoviBankeServiceImpl implements KodoviBankeService{

	@Override
	public KodoviBanke findOne(String id) throws SQLException {
		
		Statement stmt = DBConnection.getConnection().createStatement();
		KodoviBanke kb = null;
		ResultSet rs = stmt.executeQuery("SELECT SIFRA_BANKE, SWIFT_KOD, KODOVI_BANKE.PR_PIB, PR_NAZIV FROM KODOVI_BANKE"
				+ " JOIN BANKA ON KODOVI_BANKE.PR_PIB = BANKA.PR_PIB WHERE KODOVI_BANKE.PR_PIB = '" + id +"'" );
		
		while(rs.next()){
			kb = new KodoviBanke(rs.getString("SIFRA_BANKE"), rs.getString("SWIFT_KOD"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV"));
			break;
		}
		
		return kb;
	}

	@Override
	public List<KodoviBanke> findAll() throws SQLException 
	{
		Statement stmt = DBConnection.getConnection().createStatement();
		ResultSet rs = stmt.executeQuery("SELECT SIFRA_BANKE, SWIFT_KOD, KODOVI_BANKE.PR_PIB, PR_NAZIV FROM KODOVI_BANKE"
				+ " JOIN BANKA ON KODOVI_BANKE.PR_PIB = BANKA.PR_PIB ORDER BY SIFRA_BANKE" );
		
		List<KodoviBanke> kodovi = new ArrayList<KodoviBanke>();
		while(rs.next()){
			kodovi.add(new KodoviBanke(rs.getString("SIFRA_BANKE"), rs.getString("SWIFT_KOD"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV")));
		}
		return kodovi;
	}

	@Override
	public void save(KodoviBanke object) throws SQLException {
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("INSERT INTO KODOVI_BANKE (SIFRA_BANKE, PR_PIB, SWIFT_KOD) VALUES (?,?,?)");
		stmt.setString(1, object.getSifra());
		stmt.setString(2, object.getPibPravnogLica());
		stmt.setString(3, object.getSwift());
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit();  
		
	}

	@Override
	public void remove(String id) throws SQLException {
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
		        "DELETE FROM KODOVI_BANKE WHERE SIFRA_BANKE=?");
		stmt.setString(1, id);
		stmt.executeUpdate();
		stmt.close();
		
		DBConnection.getConnection().commit();
		
	}

	@Override
	public void update(KodoviBanke object) throws SQLException 
	{
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement("UPDATE KODOVI_BANKE SET SWIFT_KOD = ? WHERE SIFRA_BANKE = ? AND PR_PIB = ?");
		stmt.setString(1, object.getSwift());
		stmt.setString(2, object.getSifra());
		stmt.setString(3, object.getPibPravnogLica());
		stmt.executeUpdate();
	    stmt.close();
	    
	    DBConnection.getConnection().commit();
		
	}

	@Override
	public List<KodoviBanke> pretraga(String postPayload) throws SQLException 
	{
		JSONObject json = new JSONObject(postPayload);
		Integer sifra = 0;
		String swift = "";
		String pibPravnogLica = ""; 
		String nazivPravnogLica = "";
		
		try
		{
			sifra = json.getInt("sifra");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			swift = json.getString("swift");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			pibPravnogLica = json.getString("pibPravnogLica");
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			nazivPravnogLica = json.getString("nazivPravnogLica");
		}
		catch(Exception e)
		{
			
		}
		
		
		List<KodoviBanke> lista = new ArrayList<KodoviBanke>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT SIFRA_BANKE, SWIFT_KOD, KODOVI_BANKE.PR_PIB, PR_NAZIV FROM KODOVI_BANKE"
				+ " JOIN BANKA ON KODOVI_BANKE.PR_PIB = BANKA.PR_PIB WHERE SIFRA_BANKE = '" + sifra + "' OR SWIFT_KOD = '" + swift + "' OR KODOVI_BANKE.PR_PIB = '" + pibPravnogLica +"' OR PR_NAZIV = '" + nazivPravnogLica + "'");
		while(rs.next())
		{
			lista.add(new KodoviBanke(rs.getString("SIFRA_BANKE"), rs.getString("SWIFT_KOD"), rs.getString("PR_PIB"), rs.getString("PR_NAZIV")));
		}
		
		return lista;
	}

}
