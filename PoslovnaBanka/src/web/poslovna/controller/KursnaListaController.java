package web.poslovna.controller;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import web.poslovna.model.Drzava;
import web.poslovna.model.KursUValuti;
import web.poslovna.model.KursnaLista;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.KursnaListaService;

@Controller
@RequestMapping("/kursna_lista")
public class KursnaListaController {
	
	@Autowired
	KursnaListaService kurSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursnaLista>> getAllKurseListe() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<KursnaLista>>(kurSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<KursnaLista> saveKursnaLista(@RequestBody String reqBody) throws SQLException, JSONException, ParseException
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(reqBody);	
		
		String[] datum = (json.getString("primenjuje")).split("T");
		Date primenjujeSeOd = new Date((dateFormat.parse(datum[0])).getTime());
		
		java.util.Date danasnjiDatum = new java.util.Date();
		Date danas = new Date(danasnjiDatum.getTime());
		
		kurSer.save(new KursnaLista(json.getInt("sifra"), danas, BigDecimal.valueOf(json.getInt("brojKursneListe")), primenjujeSeOd, json.getString("pib"), json.getString("nazivBanke")));
		return new ResponseEntity<KursnaLista>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursnaLista>> updateKursnaLista(@RequestBody String reqBody) throws SQLException, ParseException
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(reqBody); 
		
		String[] datum = (json.getString("primenjuje")).split("T");
		Date primenjujeSeOd = new Date((dateFormat.parse(datum[0])).getTime());
		
		java.util.Date danasnjiDatum = new java.util.Date();
		Date danas = new Date(danasnjiDatum.getTime()); 
		
		kurSer.update(new KursnaLista(json.getInt("sifra"), danas, BigDecimal.valueOf(json.getInt("brojKursneListe")), primenjujeSeOd, json.getString("pib"), json.getString("nazivBanke")));
		
		return new ResponseEntity<List<KursnaLista>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursnaLista>> searchKursnaLista(@RequestBody String reqBody) throws SQLException, ParseException
	{
		
		return new ResponseEntity<List<KursnaLista>>(kurSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<KursnaLista> deleteKursnaLista(@PathVariable(value="id") String id) throws SQLException{
		kurSer.remove(id);
		return new ResponseEntity<KursnaLista>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{idKursneListe}/kursevi_u_valuti", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursUValuti>> findKurseviUValuti(@PathVariable(value="idKursneListe") String id) throws SQLException{
		
		return new ResponseEntity<List<KursUValuti>>(kurSer.findKurseveUValuti(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findOne", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursnaLista>> getOneState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);
		List<KursnaLista> kursnaLista = new ArrayList<KursnaLista>();
		kursnaLista.add(kurSer.findOne(json.getString("sifra")));
		
		return new ResponseEntity<List<KursnaLista>>(kursnaLista, HttpStatus.OK);
	}

}
