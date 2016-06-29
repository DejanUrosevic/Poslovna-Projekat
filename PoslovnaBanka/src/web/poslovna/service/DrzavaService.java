package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.Drzava;
import web.poslovna.model.NaseljenoMesto;

public interface DrzavaService extends CrudService<Drzava>{

	public List<NaseljenoMesto> findNaseljenoMesto(String id) throws SQLException;
	
	public List<Drzava> pretraga(String postPayload) throws SQLException;
}
