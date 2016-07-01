package web.poslovna.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
