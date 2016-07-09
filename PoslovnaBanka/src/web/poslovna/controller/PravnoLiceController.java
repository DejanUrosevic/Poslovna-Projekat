package web.poslovna.controller;

import java.sql.Date;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.datatype.DatatypeConfigurationException;

import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.view.JasperViewer;

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

import web.poslovna.db.DBConnection;
import web.poslovna.model.Drzava;
import web.poslovna.model.FizickoLice;
import web.poslovna.model.KodoviBanke;
import web.poslovna.model.KursnaLista;
import web.poslovna.model.NaseljenoMesto;
import web.poslovna.model.PravnoLice;
import web.poslovna.model.RacuniKlijenata;
import web.poslovna.service.PravnoLiceService;

@Controller
@RequestMapping("/pravno_lice")
public class PravnoLiceController {

	@Autowired
	PravnoLiceService liceSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<PravnoLice>> getAllPeople() throws SQLException, DatatypeConfigurationException
	{	
		return new ResponseEntity<List<PravnoLice>>(liceSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<PravnoLice> saveState(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);	
		liceSer.save(new PravnoLice(json.getString("pib"), json.getInt("jmbg"), json.getString("ime"), json.getString("prezime"), json.getString("naziv"), json.getString("adresa"), json.getString("email"), json.getString("web"), json.getString("telefon"), json.getString("fax"), Boolean.parseBoolean(json.getString("banka"))));
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
		liceSer.update(new PravnoLice(json.getString("pib"), json.getInt("jmbg"), json.getString("ime"), json.getString("prezime"), json.getString("naziv"), json.getString("adresa"), json.getString("email"), json.getString("web"), json.getString("telefon"), json.getString("fax"), Boolean.parseBoolean(json.getString("banka"))));
		return new ResponseEntity<List<PravnoLice>>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteState(@PathVariable(value="id") String id) throws SQLException{
		liceSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/findOne", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<PravnoLice>> getOnePravnoLice(@RequestBody String reqBody) throws SQLException
	{
		JSONObject json = new JSONObject(reqBody);
		List<PravnoLice> pl = new ArrayList<PravnoLice>();
		pl.add(liceSer.findOne(json.getString("sifra")));
		
		return new ResponseEntity<List<PravnoLice>>(pl, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{idPravnoLice}/kursne_liste", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KursnaLista>> findKursneListe(@PathVariable(value="idPravnoLice") String id) throws SQLException{
		
		return new ResponseEntity<List<KursnaLista>>(liceSer.findKursneListe(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{idPravnoLice}/kodovi_banke", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<KodoviBanke>> findKodoviBanke(@PathVariable(value="idPravnoLice") String id) throws SQLException{
		
		return new ResponseEntity<List<KodoviBanke>>(liceSer.findKodoviBanke(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/izvestaj2", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<RacuniKlijenata>> genIzvestaj2(@RequestBody String reqBody) throws SQLException, DatatypeConfigurationException
	{	
		try 
		{
	         JSONObject json = new JSONObject(reqBody);
	                
			 Map params = new HashMap(1);
			 params.put("sifra", json.getString("pib").replaceAll("\\s",""));
			 
			 System.out.println(getClass().getResource("/izvestaj/report2.jasper"));
			 JasperPrint jp = JasperFillManager.fillReport(
			 getClass().getResource("/izvestaj/report2.jasper").openStream(), 
			 params, DBConnection.getConnection());
			 JasperViewer.viewReport(jp, false);

		} catch (Exception ex) {
		  ex.printStackTrace();
		}
		return new ResponseEntity<List<RacuniKlijenata>>(HttpStatus.OK);
	}
}
