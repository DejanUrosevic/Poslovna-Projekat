package web.poslovna.service;

import java.sql.SQLException;
import java.util.List;

import web.poslovna.model.KodoviBanke;

public interface KodoviBankeService extends CrudService<KodoviBanke>{

	List<KodoviBanke> pretraga(String postPayload) throws SQLException;
}
