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

import web.poslovna.model.Drzava;
import web.poslovna.model.Ukidanje;
import web.poslovna.service.UkidanjeService;

@Controller
@RequestMapping("/ukidanje")
public class UkidanjeController {

	@Autowired
	UkidanjeService ukidanjeSer;
	

	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Ukidanje>> getAllStates() throws SQLException
	{	
		return new ResponseEntity<List<Ukidanje>>(ukidanjeSer.findAll(), HttpStatus.OK);
	}
}
