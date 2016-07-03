package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.KursnaLista;
import web.poslovna.model.Ukidanje;

public interface UkidanjeService extends CrudService<Ukidanje>{
	public List<Ukidanje> pretraga(String postPayload) throws SQLException, ParseException;
}
