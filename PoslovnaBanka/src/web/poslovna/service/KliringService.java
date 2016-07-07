package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import web.poslovna.model.Kliring;

public interface KliringService extends CrudService<Kliring>{

	public List<Kliring> pretraga(String postPayload) throws SQLException, ParseException;
}

