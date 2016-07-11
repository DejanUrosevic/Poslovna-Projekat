package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.xml.bind.JAXBException;

import web.poslovna.model.Analitike;
import web.poslovna.model.xml.ListaAnalitika;

public interface AnalitikeService extends CrudService<Analitike>{
	
	public List<Analitike> pretraga(String postPayload) throws ParseException, SQLException;
	
	public void doClearing() throws SQLException;
	
	public List<Analitike> importXml(String xml) throws JAXBException;

	
}
