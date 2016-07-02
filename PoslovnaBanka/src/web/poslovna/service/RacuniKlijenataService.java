package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.FizickoLice;
import web.poslovna.model.RacuniKlijenata;

public interface RacuniKlijenataService extends CrudService<RacuniKlijenata>{
	public List<RacuniKlijenata> pretraga(String postPayload) throws SQLException, ParseException;
}
