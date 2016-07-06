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

import web.poslovna.model.Kliring;
import web.poslovna.model.KursUValuti;
import web.poslovna.service.KliringService;

@Controller
@RequestMapping("/kliring")
public class KliringController {

	@Autowired
	KliringService kliringSer;
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Kliring>> getAllKursUValuti() throws SQLException
	{	
		return new ResponseEntity<List<Kliring>>(kliringSer.findAll(), HttpStatus.OK);
	}
}
