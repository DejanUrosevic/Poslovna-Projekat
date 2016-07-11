package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.DnevnoStanje;
import web.poslovna.model.Ukidanje;

public interface DnevnoStanjeService extends CrudService<DnevnoStanje>{
	public List<DnevnoStanje> pretraga(String postPayload) throws SQLException, ParseException;
	
	public List<DnevnoStanje> findStanje(String id) throws SQLException;
}
