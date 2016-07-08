package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.xml.bind.JAXBException;
import javax.xml.datatype.DatatypeConfigurationException;

import web.poslovna.model.Analitike;
import web.poslovna.model.FizickoLice;
import web.poslovna.model.RacuniKlijenata;
import web.poslovna.model.xml.ListaAnalitika;

public interface RacuniKlijenataService extends CrudService<RacuniKlijenata>{
	public List<RacuniKlijenata> pretraga(String postPayload) throws SQLException, ParseException;
	
	public void toXml(String brRacuna) throws SQLException, DatatypeConfigurationException, JAXBException;
	
	public void exportToXml(ListaAnalitika la, String brojRacuna) throws JAXBException;
}
