package web.poslovna.controller;

import java.sql.Date;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;

import org.json.JSONObject;
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

import web.poslovna.model.Drzava;
import web.poslovna.model.PravnoLice;
import web.poslovna.model.Ukidanje;
import web.poslovna.service.UkidanjeService;

@Controller
@RequestMapping("/ukidanje")
public class UkidanjeController {

	@Autowired
	UkidanjeService ukidanjeSer;
	

	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Ukidanje>> getAllStates() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<Ukidanje>>(ukidanjeSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Ukidanje> saveState(@RequestBody String reqBody) throws SQLException, ParseException
	{
		JSONObject json = new JSONObject(reqBody);
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String[] datum = (json.getString("datum")).split("T");
		Date date = new Date((dateFormat.parse(datum[0])).getTime());
		ukidanjeSer.save(new Ukidanje(json.getInt("id"), json.getInt("idRacuna"), json.getString("brRacuna"), json.getString("nazivVlasnika"),
				json.getString("banka"), date, json.getString("racunZaPrebacivanje"), json.getString("vlasnikRacunaZaPrebacivanje")));
		return new ResponseEntity<Ukidanje>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteState(@PathVariable(value="id") String id) throws SQLException{
		ukidanjeSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Ukidanje>> searchState(@RequestBody String reqBody) throws SQLException, ParseException
	{
		
		return new ResponseEntity<List<Ukidanje>>(ukidanjeSer.pretraga(reqBody), HttpStatus.OK);	
	}
}
