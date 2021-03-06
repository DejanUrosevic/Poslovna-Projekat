package web.poslovna.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import web.poslovna.model.DnevnoStanje;
import web.poslovna.model.Drzava;
import web.poslovna.model.Ukidanje;
import web.poslovna.service.DnevnoStanjeService;

@Controller
@RequestMapping("/dnevno_stanje")
public class DnevnoStanjeController {

	@Autowired
	DnevnoStanjeService dnevnoSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<DnevnoStanje>> getAllStates() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<DnevnoStanje>>(dnevnoSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<DnevnoStanje>> searchState(@RequestBody String reqBody) throws SQLException, ParseException
	{
		
		return new ResponseEntity<List<DnevnoStanje>>(dnevnoSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/klijent/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<DnevnoStanje>> getStanje(@PathVariable(value="id") String id) throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<DnevnoStanje>>(dnevnoSer.findStanje(id), HttpStatus.OK);
	}
}
