package web.poslovna.controller;

import java.math.BigDecimal;
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
import web.poslovna.model.VrstePlacanja;
import web.poslovna.service.VrstePlacanjaService;

@Controller
@RequestMapping("/vrstePlacanja")
public class VrstePlacanjaController {
	
	@Autowired
	VrstePlacanjaService vrsSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<VrstePlacanja>> getAllVrstaPlacanja() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<VrstePlacanja>>(vrsSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<VrstePlacanja> saveVrstaPlacanja(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		vrsSer.save(new VrstePlacanja(BigDecimal.valueOf(json.getInt("oznaka")), json.getString("naziv")));
		
		return new ResponseEntity<VrstePlacanja>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<VrstePlacanja>> searchVrstaPlacanja(@RequestBody String reqBody) throws SQLException
	{
		
		return new ResponseEntity<List<VrstePlacanja>>(vrsSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Drzava>> updateVrstaPlacanja(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);  
		vrsSer.update(new VrstePlacanja(BigDecimal.valueOf(json.getInt("oznaka")), json.getString("naziv")));
		
		return new ResponseEntity<List<Drzava>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteVrstuPlacanja(@PathVariable(value="id") String id) throws SQLException{
		
		vrsSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

}
