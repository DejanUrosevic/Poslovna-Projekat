package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.Drzava;
import web.poslovna.model.NaseljenoMesto;

public interface NaseljenoMestoService extends CrudService<NaseljenoMesto>{
	
	public List<NaseljenoMesto> pretraga(String postPayload) throws SQLException;
}
