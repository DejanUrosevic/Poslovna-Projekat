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
import web.poslovna.model.KodoviBanke;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.KodoviBankeService;

@Controller
@RequestMapping("/kodoviBanke")
public class KodoviBankeController {
	
	@Autowired
	KodoviBankeService kodSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KodoviBanke>> getAllKodoviBanke() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<KodoviBanke>>(kodSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<KodoviBanke> saveKodoviBanke(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);
		
		kodSer.save(new KodoviBanke(json.getString("sifra"), json.getString("swift"), json.getString("pibPravnogLica"), json.getString("nazivPravnogLica")));
		return new ResponseEntity<KodoviBanke>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KodoviBanke>> updateKodoviBanke(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody); 
		kodSer.update(new KodoviBanke(json.getString("sifra"), json.getString("swift"), json.getString("pibPravnogLica"), json.getString("nazivPravnogLica")));
		
		return new ResponseEntity<List<KodoviBanke>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KodoviBanke>> searchKodoviBanke(@RequestBody String reqBody) throws SQLException
	{
		
		return new ResponseEntity<List<KodoviBanke>>(kodSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteCity(@PathVariable(value="id") String id) throws SQLException{
		
		kodSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<KodoviBanke> findOneKodBanke(@PathVariable(value="id") String id) throws SQLException{
		
		
		return new ResponseEntity<KodoviBanke>(kodSer.findOne(id), HttpStatus.OK);
	}

}
