package web.poslovna.controller;

import java.sql.SQLException;
import java.util.ArrayList;
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

import web.poslovna.model.Drzava;
import web.poslovna.model.FizickoLice;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.PravnoLice;
import web.poslovna.service.FizickoLiceService;

@Controller
@RequestMapping("/fizicko_lice")
public class FizickoLiceController {

	@Autowired
	FizickoLiceService liceSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<FizickoLice>> getAllPeople() throws SQLException
	{	
		return new ResponseEntity<List<FizickoLice>>(liceSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<FizickoLice> saveState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		liceSer.save(new FizickoLice(json.getInt("jmbg"), json.getString("naziv"), json.getString("prezime"),
				json.getString("email"), json.getString("adresa"), json.getString("telefon")));
		return new ResponseEntity<FizickoLice>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<FizickoLice>> searchState(@RequestBody String reqBody) throws SQLException
	{
		
		return new ResponseEntity<List<FizickoLice>>(liceSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<FizickoLice>> updateState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody); 
		liceSer.update(new FizickoLice(json.getInt("jmbg"), json.getString("naziv"), json.getString("prezime"), json.getString("email"), json.getString("adresa"), json.getString("telefon")));
		return new ResponseEntity<List<FizickoLice>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteState(@PathVariable(value="id") String id) throws SQLException{
		liceSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findOne", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<FizickoLice>> getOneFizickoLice(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);
		List<FizickoLice> fl = new ArrayList<FizickoLice>();
		fl.add(liceSer.findOne(json.getString("sifra")));
		
		return new ResponseEntity<List<FizickoLice>>(fl, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{idFizickoLice}/pravna_lica", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<PravnoLice>> findNaselje(@PathVariable(value="idFizickoLice") String id) throws SQLException{
		
		return new ResponseEntity<List<PravnoLice>>(liceSer.findPravnoLice(id), HttpStatus.OK);
	}
}
