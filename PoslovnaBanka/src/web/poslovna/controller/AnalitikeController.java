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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import web.poslovna.model.Analitike;
import web.poslovna.model.DnevnoStanje;
import web.poslovna.model.Drzava;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.AnalitikeService;

@Controller
@RequestMapping("/analitike")
public class AnalitikeController {

	@Autowired
	AnalitikeService analitikeSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Analitike>> getAllStates() throws SQLException, DatatypeConfigurationException
	{	 
		return new ResponseEntity<List<Analitike>>(analitikeSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Analitike> saveState(@RequestBody String reqBody) throws SQLException
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(reqBody);	
		
		
		java.util.Date danasnjiDatum = new java.util.Date();
		Date datumValute = new Date(danasnjiDatum.getTime());
		Date datumPrijema = new Date(danasnjiDatum.getTime());
		
		Analitike anal = new Analitike(json.getInt("sifra"), json.getString("duznik"), json.getString("svrha"), json.getString("poverilac"), datumPrijema,  datumValute, json.getString("racunDuznika"), json.getDouble("modelZaduzenja"), json.getString("pbZaduzenje"), json.getString("racunPoverioca"), json.getDouble("modelOdobrenja"), json.getString("pbOdobrenja"), json.getBoolean("hitno"), json.getDouble("iznos"), 1.0, null, json.getDouble("idVrstaPlacanja"), json.getString("nazivPlacanja"), json.getInt("idNaselje"), json.getString("naselje"), json.getInt("idValute"), json.getString("valuta"), null);
		anal.setIdRacunaDuznika(json.getInt("idRacunaDuznika"));
		anal.setIdRacunaPoverioca(json.getInt("idRacunaPoverioca"));
		
		analitikeSer.save(anal);
		
		return new ResponseEntity<Analitike>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/doClearing", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Analitike>> doClearing() throws SQLException
	{	
		analitikeSer.doClearing();
		return new ResponseEntity<List<Analitike>>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Analitike>> searchAnalitike(@RequestBody String reqBody) throws SQLException, ParseException
	{
		
		return new ResponseEntity<List<Analitike>>(analitikeSer.pretraga(reqBody), HttpStatus.OK);	
	}
}
