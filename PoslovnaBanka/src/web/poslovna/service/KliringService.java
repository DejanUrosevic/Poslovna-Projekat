package web.poslovna.service;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.xml.bind.JAXBException;
import javax.xml.datatype.DatatypeConfigurationException;

import web.poslovna.model.Analitike;
import web.poslovna.model.Kliring;
import web.poslovna.model.xml.RTGSKliring;

public interface KliringService extends CrudService<RTGSKliring>{

	public List<RTGSKliring> pretraga(String postPayload) throws SQLException, ParseException;
	
	public RTGSKliring toXml(String id) throws JAXBException, SQLException, DatatypeConfigurationException;
	
	public void exportToXml(RTGSKliring object) throws JAXBException; 
	
	public List<Analitike> findAnalitike(String idKliringa) throws SQLException;
}

