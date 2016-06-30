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

import web.poslovna.model.Drzava;
import web.poslovna.model.Valute;
import web.poslovna.service.DrzavaService;
import web.poslovna.service.ValuteService;

@Controller
@RequestMapping("/valute")
public class ValuteController 
{
	@Autowired
	ValuteService valSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Valute>> getAllValute() throws SQLException
	{	
		return new ResponseEntity<List<Valute>>(valSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Valute>> updateValute(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody); 
		valSer.update(new Valute(json.getInt("sifra"), json.getString("zvanicnaSifra"), json.getString("naziv"), Boolean.parseBoolean(json.getString("domicilna")), json.getString("sifraDrzava"), json.getString("nazivDrzava")));
		
		return new ResponseEntity<List<Valute>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Valute> saveValute(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		valSer.save(new Valute(json.getInt("sifra"), json.getString("zvanicnaSifra"), json.getString("naziv"), Boolean.parseBoolean(json.getString("domicilna")), json.getString("sifraDrzava"), json.getString("nazivDrzava")));
		return new ResponseEntity<Valute>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Valute>> searchValute(@RequestBody String reqBody) throws SQLException
	{
		return new ResponseEntity<List<Valute>>(valSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteState(@PathVariable(value="id") String id) throws SQLException{
		
		valSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
