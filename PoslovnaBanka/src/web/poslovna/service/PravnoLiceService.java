package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.KursnaLista;
import web.poslovna.model.PravnoLice;

public interface PravnoLiceService extends CrudService<PravnoLice>{

	public List<PravnoLice> pretraga(String postPayload) throws SQLException;
	
	public List<KursnaLista> findKursneListe(String id) throws SQLException;
}
