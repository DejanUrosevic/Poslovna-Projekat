package web.poslovna.controller;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import web.poslovna.model.KursUValuti;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.service.KursUValutiService;

@Controller
@RequestMapping("/kurs_u_valuti")
public class KursUValutiController {
	
	@Autowired
	KursUValutiService kurSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursUValuti>> getAllKursUValuti() throws SQLException
	{	
		return new ResponseEntity<List<KursUValuti>>(kurSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<KursUValuti> saveKursUValuti(@RequestBody String reqBody) throws SQLException, ParseException
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(reqBody);	
		
		String[] datum = (json.getString("primenjuje")).split("T");
		Date primenjujeSeOd = new Date((dateFormat.parse(datum[0])).getTime());
		
		kurSer.save(new KursUValuti(BigDecimal.valueOf(json.getInt("redniBroj")), BigDecimal.valueOf(json.getDouble("kupovni")), BigDecimal.valueOf(json.getDouble("srednji")), BigDecimal.valueOf(json.getDouble("prodajni")), json.getInt("idKursneListe"), primenjujeSeOd, json.getInt("idOsnovneValute"), json.getString("nazivOsnovneValute"), json.getInt("idPremaValute"), json.getString("nazivPremaValute")));
		return new ResponseEntity<KursUValuti>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursUValuti>> searchKursUValuti(@RequestBody String reqBody) throws SQLException, ParseException
	{
		
		return new ResponseEntity<List<KursUValuti>>(kurSer.pretraga(reqBody), HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursUValuti>> updateKursUValuti(@RequestBody String reqBody) throws SQLException, ParseException
	{
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject json = new JSONObject(reqBody); 
		
		String[] datum = (json.getString("primenjuje")).split("T");
		Date primenjujeSeOd = new Date((dateFormat.parse(datum[0])).getTime());
		kurSer.update(new KursUValuti(BigDecimal.valueOf(json.getInt("redniBroj")), BigDecimal.valueOf(json.getDouble("kupovni")), BigDecimal.valueOf(json.getDouble("srednji")), BigDecimal.valueOf(json.getDouble("prodajni")), json.getInt("idKursneListe"), primenjujeSeOd, json.getInt("idOsnovneValute"), json.getString("nazivOsnovneValute"), json.getInt("idPremaValute"), json.getString("nazivPremaValute")));
		
		return new ResponseEntity<List<KursUValuti>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteKursUValuti(@PathVariable(value="id") String id) throws SQLException{
		kurSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
} 
