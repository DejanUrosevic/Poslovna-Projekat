package web.poslovna.controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import web.poslovna.db.DBConnection;
import web.poslovna.model.Drzava;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.Valute;
import web.poslovna.service.DrzavaService;


@Controller
@RequestMapping("/drzava")
public class DrzavaController 
{

	@Autowired
	DrzavaService drzSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Drzava>> getAllStates() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<Drzava>>(drzSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findOne", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Drzava>> getOneState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);
		List<Drzava> drzava = new ArrayList<Drzava>();
		drzava.add(drzSer.findOne(json.getString("sifra")));
		return new ResponseEntity<List<Drzava>>(drzava, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Drzava> saveState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		drzSer.save(new Drzava(json.getString("sifra"), json.getString("naziv")));
		return new ResponseEntity<Drzava>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteState(@PathVariable(value="id") String id) throws SQLException{
		drzSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{idDrzava}/naseljeno_mesto", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<NaseljenoMesto>> findNaselje(@PathVariable(value="idDrzava") String id) throws SQLException{
		
		return new ResponseEntity<List<NaseljenoMesto>>(drzSer.findNaseljenoMesto(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{idDrzava}/valute", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Valute>> findValute(@PathVariable(value="idDrzava") String id) throws SQLException{
		
		return new ResponseEntity<List<Valute>>(drzSer.findValute(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Drzava>> searchState(@RequestBody String reqBody) throws SQLException
	{
		
		return new ResponseEntity<List<Drzava>>(drzSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Drzava>> updateState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody); 
		drzSer.update(new Drzava(json.getString("sifra"), json.getString("naziv")));
		
		return new ResponseEntity<List<Drzava>>(HttpStatus.OK);	
	}
}
