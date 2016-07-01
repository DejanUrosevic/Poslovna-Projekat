package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.FizickoLice;
import web.poslovna.model.PravnoLice;

public interface FizickoLiceService extends CrudService<FizickoLice>{

	public List<FizickoLice> pretraga(String postPayload) throws SQLException;
	
	public List<PravnoLice> findPravnoLice(String id) throws SQLException;
}
