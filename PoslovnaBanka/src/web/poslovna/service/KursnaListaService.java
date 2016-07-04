package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.Drzava;
import web.poslovna.model.KursUValuti;
import web.poslovna.model.KursnaLista;

public interface KursnaListaService extends CrudService<KursnaLista> {

	public List<KursnaLista> pretraga(String postPayload) throws SQLException, ParseException;
	
	public List<KursUValuti> findKurseveUValuti(String id) throws SQLException;
}
