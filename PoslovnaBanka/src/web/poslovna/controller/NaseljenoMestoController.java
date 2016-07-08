package web.poslovna.controller;

import java.sql.SQLException;
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
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.NaseljenoMestoService;

@Controller
@RequestMapping("/naseljeno_mesto")
public class NaseljenoMestoController {

	@Autowired
	NaseljenoMestoService naseljeSer;
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Drzava> saveState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		naseljeSer.save(new NaseljenoMesto(json.getInt("sifra"), json.getString("naziv"), json.getString("oznakaDrzave"), json.getString("nazivDrzave"), json.getString("ptt")));
		return new ResponseEntity<Drzava>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<NaseljenoMesto>> getAllCities() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<NaseljenoMesto>>(naseljeSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteCity(@PathVariable(value="id") String id) throws SQLException{
		naseljeSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<NaseljenoMesto>> searchState(@RequestBody String reqBody) throws SQLException
	{
		
		return new ResponseEntity<List<NaseljenoMesto>>(naseljeSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<NaseljenoMesto>> updateState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody); 
		naseljeSer.update(new NaseljenoMesto(json.getInt("sifra"), json.getString("naziv"), json.getString("oznakaDrzave"), json.getString("nazivDrzave"), json.getString("ptt")));
		
		return new ResponseEntity<List<NaseljenoMesto>>(HttpStatus.OK);	
	}
}
