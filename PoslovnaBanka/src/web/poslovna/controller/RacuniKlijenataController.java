package web.poslovna.controller;

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

import web.poslovna.model.FizickoLice;
import web.poslovna.model.PravnoLice;
import web.poslovna.model.RacuniKlijenata;
import web.poslovna.service.RacuniKlijenataService;

@Controller
@RequestMapping("/racuni_klijenata")
public class RacuniKlijenataController {

	@Autowired
	RacuniKlijenataService racuniSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<RacuniKlijenata>> getRacuni() throws SQLException
	{	
		return new ResponseEntity<List<RacuniKlijenata>>(racuniSer.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<RacuniKlijenata> saveState(@RequestBody String reqBody) throws SQLException, ParseException
	{
		JSONObject json = new JSONObject(reqBody);	
		
		boolean fizickoLice = false;
		boolean pravnoLice = false;
		
		int jmbg = 0;
		String ime = null;
		String prezime = null;
		
		String pib = null;
		String naziv = null;
		
		try {
			if(!json.getString("ime").equals("")){
				jmbg = json.getInt("jmbg");
				ime = json.getString("ime");
				prezime = json.getString("prezime");
				fizickoLice = true;
			}else{
				fizickoLice = false;
			}
			
			if(jmbg == 0){
				fizickoLice = false;
			}
		} catch (Exception e) {
			// TODO: handle exception
			fizickoLice = false;
		}
		
		try {
			if(!json.getString("pib").equals("")){
				pib = json.getString("pib");
				naziv = json.getString("naziv");
				pravnoLice = true;
			}else{
				pravnoLice = false;
			}
		} catch (Exception e) {
			// TODO: handle exception
			pravnoLice = false;
		}
		
		boolean aktivan = false;
		
		if(json.getString("validan").equals("da")){
			aktivan = true;
		}else if(json.getString("validan").equals("ne")){
			aktivan = false;
		}
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String[] datum = (json.getString("datum")).split("T");
		Date date = new Date((dateFormat.parse(datum[0])).getTime());
		
		if(fizickoLice && !pravnoLice){
			//snimanje racuna fizickih lica
			racuniSer.save(new RacuniKlijenata(json.getInt("id"), jmbg,
					ime, prezime, json.getInt("idValute"), json.getString("valuta"),
					pib, naziv, json.getString("pibBanke"), json.getString("nazivBanke"),
					json.getString("racun"), date, aktivan));
		}else if(!fizickoLice && pravnoLice){
			//snimanje racuna pravnih lica
			racuniSer.save(new RacuniKlijenata(json.getInt("id"), (Integer) null,
					ime, prezime, json.getInt("idValute"), json.getString("valuta"),
					pib, naziv, json.getString("pibBanke"), json.getString("nazivBanke"),
					json.getString("racun"), date, aktivan));
		}

		return new ResponseEntity<RacuniKlijenata>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> deleteCity(@PathVariable(value="id") String id) throws SQLException{
		racuniSer.remove(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
