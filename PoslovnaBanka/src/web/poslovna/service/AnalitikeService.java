package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.Analitike;

public interface AnalitikeService extends CrudService<Analitike>{
	
	public List<Analitike> pretraga(String postPayload) throws ParseException, SQLException;
	public void doClearing() throws SQLException;

}
