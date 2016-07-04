package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.KursUValuti;
import web.poslovna.model.Valute;

public interface ValuteService extends CrudService<Valute>{
	
	public List<Valute> pretraga(String postPayload) throws SQLException;
	
	public List<KursUValuti> findKurseveUValuti(String id) throws SQLException;

}
