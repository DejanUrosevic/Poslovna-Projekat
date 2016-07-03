package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.KursUValuti;
import web.poslovna.model.RacuniKlijenata;

public interface KursUValutiService extends CrudService<KursUValuti>{

	public List<KursUValuti> pretraga(String postPayload) throws SQLException, ParseException;
}
