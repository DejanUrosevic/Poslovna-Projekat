package web.poslovna.controller;

import java.sql.SQLException;
import java.util.List;

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

import web.poslovna.model.FizickoLice;
import web.poslovna.model.PravnoLice;
import web.poslovna.service.PravnoLiceService;

@Controller
@RequestMapping("/pravno_lice")
public class PravnoLiceController {

	@Autowired
	PravnoLiceService liceSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<PravnoLice>> getAllPeople() throws SQLException
	{	
		return new ResponseEntity<List<PravnoLice>>(liceSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<PravnoLice> saveState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		liceSer.save(new PravnoLice(json.getString("pib"), json.getInt("jmbg"), json.getString("ime"), json.getString("prezime"), json.getString("naziv"), json.getString("adresa"), json.getString("email"), json.getString("web"), json.getString("telefon"), json.getString("fax"), true));
		return new ResponseEntity<PravnoLice>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<PravnoLice>> searchState(@RequestBody String reqBody) throws SQLException
	{
		
		return new ResponseEntity<List<PravnoLice>>(liceSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<PravnoLice>> updateState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody); 
		liceSer.update(new PravnoLice(json.getString("pib"), json.getInt("jmbg"), json.getString("ime"), json.getString("prezime"), json.getString("naziv"), json.getString("adresa"), json.getString("email"), json.getString("web"), json.getString("telefon"), json.getString("fax"), true));
		return new ResponseEntity<List<PravnoLice>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteState(@PathVariable(value="id") String id) throws SQLException{
		liceSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
