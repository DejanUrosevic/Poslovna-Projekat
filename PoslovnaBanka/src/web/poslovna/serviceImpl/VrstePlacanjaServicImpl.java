package web.poslovna.serviceImpl;

import java.math.BigDecimal;
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
import web.poslovna.model.VrstePlacanja;
import web.poslovna.service.VrstePlacanjaService;

@Service
public class VrstePlacanjaServicImpl implements VrstePlacanjaService{

	@Override
	public VrstePlacanja findOne(String id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<VrstePlacanja> findAll() throws SQLException 
	{
		List<VrstePlacanja> lista = new ArrayList<VrstePlacanja>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM VRSTE_PLACANJA ORDER BY VPL_OZNAKA");
		while(rs.next())
		{
			lista.add(new VrstePlacanja(rs.getBigDecimal("VPL_OZNAKA"), rs.getString("VPL_NAZIV")));
		}
		return lista;
	}

	@Override
	public void save(VrstePlacanja object) throws SQLException {
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
			       "INSERT INTO VRSTE_PLACANJA (VPL_OZNAKA, VPL_NAZIV) VALUES (? ,?)");
		 stmt.setBigDecimal(1, object.getOznaka());
	     stmt.setString(2, object.getNaziv());
	     stmt.executeUpdate();
	     stmt.close();
	     
	     DBConnection.getConnection().commit();
		
	}

	@Override
	public void remove(String id) throws SQLException 
	{
		// TODO Auto-generated method stub
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
				"DELETE FROM VRSTE_PLACANJA WHERE VPL_OZNAKA = ?");
		stmt.setBigDecimal(1, BigDecimal.valueOf(Long.parseLong(id)));
		stmt.executeUpdate();
		stmt.close();
		
		DBConnection.getConnection().commit();
		
	}

	@Override
	public void update(VrstePlacanja object) throws SQLException {
		
		PreparedStatement stmt = DBConnection.getConnection().prepareStatement(
			       "UPDATE VRSTE_PLACANJA SET VPL_NAZIV = ? WHERE VPL_OZNAKA = ?");
		 stmt.setString(1, object.getNaziv());
	     stmt.setBigDecimal(2, object.getOznaka());
	     stmt.executeUpdate();
	     stmt.close();
	     
	     DBConnection.getConnection().commit();
		
	}

	@Override
	public List<VrstePlacanja> pretraga(String postPayload) throws SQLException {
		
		JSONObject json = new JSONObject(postPayload);
		BigDecimal oznaka = BigDecimal.valueOf(-1);
		String naziv = "";
		
		try
		{
			oznaka = BigDecimal.valueOf(json.getInt("oznaka"));
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
		
		List<VrstePlacanja> lista = new ArrayList<VrstePlacanja>();
		Statement sql = DBConnection.getConnection().createStatement();
		ResultSet rs = sql.executeQuery("SELECT * FROM VRSTE_PLACANJA WHERE VPL_OZNAKA = '" + oznaka + "' OR VPL_NAZIV = '" + naziv + "'");
		while(rs.next())
		{
			lista.add(new VrstePlacanja(rs.getBigDecimal("VPL_OZNAKA"), rs.getString("VPL_NAZIV")));
		}
		
		return lista;
	}

}
