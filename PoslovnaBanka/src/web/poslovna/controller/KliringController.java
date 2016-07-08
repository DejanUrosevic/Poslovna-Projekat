package web.poslovna.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.xml.bind.JAXBException;
import javax.xml.datatype.DatatypeConfigurationException;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import web.poslovna.model.Kliring;
import web.poslovna.model.KursUValuti;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.xml.RTGSKliring;
import web.poslovna.service.KliringService;

@Controller
@RequestMapping("/kliring")
public class KliringController {

	@Autowired
	KliringService kliringSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<RTGSKliring>> getAllKursUValuti() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<RTGSKliring>>(kliringSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<RTGSKliring>> searchKliring(@RequestBody String reqBody) throws SQLException, ParseException
	{
		
		return new ResponseEntity<List<RTGSKliring>>(kliringSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/toXml/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<RTGSKliring> toXmlKliring(@PathVariable(value="id") String id) throws SQLException, ParseException, JAXBException, DatatypeConfigurationException
	{
		
		return new ResponseEntity<RTGSKliring>(kliringSer.toXml(id), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/downloadXml/{file_name}", method = RequestMethod.GET, produces = "application/xml")
	public ResponseEntity<byte[]> getPdfFile(@PathVariable("file_name") String fileName) {
		fileName += ".xml";
		
		FileInputStream fileStream;
		try {
			fileStream = new FileInputStream(new File("xml\\"+fileName));
			byte[] contents = IOUtils.toByteArray(fileStream);
			
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.parseMediaType("application/pdf"));
			headers.setContentDispositionFormData(fileName, fileName);
			
			ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(contents, headers, HttpStatus.OK);
			
			return response;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<byte[]>(HttpStatus.NOT_FOUND);
	}
}
