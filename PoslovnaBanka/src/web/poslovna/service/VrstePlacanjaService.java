package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.Valute;
import web.poslovna.model.VrstePlacanja;

public interface VrstePlacanjaService extends CrudService<VrstePlacanja>{
	
	public List<VrstePlacanja> pretraga(String postPayload) throws SQLException;

}
