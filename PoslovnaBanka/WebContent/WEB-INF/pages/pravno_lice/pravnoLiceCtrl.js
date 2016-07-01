(function(angular){
	var pravnoLiceModul = angular.module('pravnoLiceEntry', []);
	
	pravnoLiceModul.controller('pravnoLiceCtrl', function($scope, $http, $state, $stateParams, zoomServiceFizickoLice, kodoviBankeZoomServis){
		
		$scope.stanjePregled = true;
		
		//postavljanje default vrednosti za option tag domicilna
		$scope.bankaType = [
		    { name: 'Da', value: 'true' }, 
		    { name: 'Ne', value: 'false' }                  
		];
		
		if(!angular.equals({}, $stateParams))
		{
			$scope.zoomIcon = false;
		}
		else
		{
			$scope.zoomIcon = true;
		}
		
		if(zoomServiceFizickoLice.getZoom()){
			$scope.stanjePregled = false;
			
			
			if(zoomServiceFizickoLice.getPretraga())
			{
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;	
				$scope.stanjeIzmena = false;
			}
			else if(zoomServiceFizickoLice.getIzmena())
			{
				$scope.stanjeAdd = false;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = true;
			}
			else
			{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
			}
			
			
			$scope.sifraSelected = zoomServiceFizickoLice.getPib();
			$scope.naziv = zoomServiceFizickoLice.getNaziv();
			$scope.adresa = zoomServiceFizickoLice.getAdresa();
			$scope.email = zoomServiceFizickoLice.getEmail();
			$scope.web = zoomServiceFizickoLice.getWeb();
			$scope.telefon = zoomServiceFizickoLice.getTelefon();
			$scope.fax = zoomServiceFizickoLice.getFax();
			$scope.izmenaBanka = zoomServiceFizickoLice.getBanka();;
			$scope.jmbg = zoomServiceFizickoLice.getJmbgKlijenta();
			$scope.imeKlijenta = zoomServiceFizickoLice.getImeKlijenta();
			$scope.prezimeKlijenta = zoomServiceFizickoLice.getPrezimeKlijenta();
			
			zoomServiceFizickoLice.setZoom(false);
		}
		

		if(kodoviBankeZoomServis.getZoom())
		{
			$scope.zoom = kodoviBankeZoomServis.getZoom();
		}
		
		$scope.zoomPickup = function()
		{
			
			if(kodoviBankeZoomServis.getZoom())
			{
				kodoviBankeZoomServis.setPibPravnogLica($scope.sifraSelected);
				kodoviBankeZoomServis.setNazivPravnogLica($scope.naziv);
				$state.go('kodoviBanke');
			}
		}
		
		
		if(!angular.equals({}, $stateParams))
		{
			var plId = $stateParams.id;
			$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/'+ plId + '/pravna_lica')
			.success(function(data, status, header){
				$scope.listaLica = data;
			});
		}
		else
		{
			$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
			.success(function(data, status, header){
				$scope.listaLica = data;
			});
		}
		
		
		$scope.setSelected = function(pib, naziv, adresa, email, web, telefon, fax, banka, jmbg, imeKlijenta, prezimeKlijenta){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = pib;
			$scope.naziv = naziv;
			$scope.adresa = adresa;
			$scope.email = email;
			$scope.web = web;
			$scope.telefon = telefon;
			$scope.fax = fax;
			$scope.banka = banka;
			$scope.jmbg = jmbg;
			$scope.imeKlijenta = imeKlijenta;
			$scope.prezimeKlijenta = prezimeKlijenta;
			
			//postavljanje default vrednosti za domicilna
			for(var i=0; i<$scope.bankaType.length; i++)
			{
				if($scope.bankaType[i].value == banka.toString())
				{
					$scope.izmenaBanka = $scope.bankaType[i].value;
					break;
				}
			}
		}
		
		$scope.refreshLica = function(){
			if(!angular.equals({}, $stateParams))
			{
				var plId = $stateParams.id;
				$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/'+ plId + '/pravna_lica')
				.success(function(data, status, header){
					$scope.listaLica = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.naziv = null;
					$scope.adresa = null;
					$scope.email = null;
					$scope.web = null;
					$scope.telefon = null;
					$scope.fax = null;
					$scope.banka = null;
					$scope.jmbg = null;
					$scope.imeKlijenta = null;
					$scope.prezimeKlijenta = null;
				});
			}
			else
			{
				$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
				.success(function(data, status, header)
				{
					$scope.listaLica = data;
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.naziv = null;
					$scope.adresa = null;
					$scope.email = null;
					$scope.web = null;
					$scope.telefon = null;
					$scope.fax = null;
					$scope.banka = null;
					$scope.jmbg = null;
					$scope.imeKlijenta = null;
					$scope.prezimeKlijenta = null;
				});
			}
			
			
			
			
		}
		
		$scope.levoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaLica[0].pib;
			$scope.naziv = $scope.listaLica[0].naziv;
			$scope.adresa = $scope.listaLica[0].adresa;
			$scope.email = $scope.listaLica[0].email;
			$scope.web = $scope.listaLica[0].web;
			$scope.telefon = $scope.listaLica[0].telefon;
			$scope.fax = $scope.listaLica[0].fax;
			$scope.banka = $scope.listaLica[0].banka;
			$scope.jmbg = $scope.listaLica[0].jmbgKlijenta;
			$scope.imeKlijenta = $scope.listaLica[0].imeKlijenta;
			$scope.prezimeKlijenta = $scope.listaLica[0].prezimeKlijenta;
		}
		
		$scope.desnoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaLica[$scope.listaLica.length-1].pib;
			$scope.naziv = $scope.listaLica[$scope.listaLica.length-1].naziv;
			$scope.adresa = $scope.listaLica[$scope.listaLica.length-1].adresa;
			$scope.email = $scope.listaLica[$scope.listaLica.length-1].email;
			$scope.web = $scope.listaLica[$scope.listaLica.length-1].web;
			$scope.telefon = $scope.listaLica[$scope.listaLica.length-1].telefon;
			$scope.fax = $scope.listaLica[$scope.listaLica.length-1].fax;
			$scope.banka = $scope.listaLica[$scope.listaLica.length-1].banka;
			$scope.jmbg = $scope.listaLica[$scope.listaLica.length-1].jmbgKlijenta;
			$scope.imeKlijenta = $scope.listaLica[$scope.listaLica.length-1].imeKlijenta;
			$scope.prezimeKlijenta = $scope.listaLica[$scope.listaLica.length-1].prezimeKlijenta;
		}
		
		$scope.jedanLevo = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined){
				$scope.sifraSelected = $scope.listaLica[$scope.listaLica.length-1].pib;
				$scope.naziv = $scope.listaLica[$scope.listaLica.length-1].naziv;
				$scope.adresa = $scope.listaLica[$scope.listaLica.length-1].adresa;
				$scope.email = $scope.listaLica[$scope.listaLica.length-1].email;
				$scope.web = $scope.listaLica[$scope.listaLica.length-1].web;
				$scope.telefon = $scope.listaLica[$scope.listaLica.length-1].telefon;
				$scope.fax = $scope.listaLica[$scope.listaLica.length-1].fax;
				$scope.banka = $scope.listaLica[$scope.listaLica.length-1].banka;
				$scope.jmbg = $scope.listaLica[$scope.listaLica.length-1].jmbgKlijenta;
				$scope.imeKlijenta = $scope.listaLica[$scope.listaLica.length-1].imeKlijenta;
				$scope.prezimeKlijenta = $scope.listaLica[$scope.listaLica.length-1].prezimeKlijenta;
			}else{
				for(var i=0; i<$scope.listaLica.length; i++){
					if($scope.sifraSelected == $scope.listaLica[i].pib){
						if($scope.sifraSelected == $scope.listaLica[0].pib){
							$scope.sifraSelected = $scope.listaLica[$scope.listaLica.length-1].pib;
							$scope.naziv = $scope.listaLica[$scope.listaLica.length-1].naziv;
							$scope.adresa = $scope.listaLica[$scope.listaLica.length-1].adresa;
							$scope.email = $scope.listaLica[$scope.listaLica.length-1].email;
							$scope.web = $scope.listaLica[$scope.listaLica.length-1].web;
							$scope.telefon = $scope.listaLica[$scope.listaLica.length-1].telefon;
							$scope.fax = $scope.listaLica[$scope.listaLica.length-1].fax;
							$scope.banka = $scope.listaLica[$scope.listaLica.length-1].banka;
							$scope.jmbg = $scope.listaLica[$scope.listaLica.length-1].jmbgKlijenta;
							$scope.imeKlijenta = $scope.listaLica[$scope.listaLica.length-1].imeKlijenta;
							$scope.prezimeKlijenta = $scope.listaLica[$scope.listaLica.length-1].prezimeKlijenta;
							break;
						}else{
							$scope.sifraSelected = $scope.listaLica[i-1].pib;
							$scope.naziv = $scope.listaLica[i-1].naziv;
							$scope.adresa = $scope.listaLica[i-1].adresa;
							$scope.email = $scope.listaLica[i-1].email;
							$scope.web = $scope.listaLica[i-1].web;
							$scope.telefon = $scope.listaLica[i-1].telefon;
							$scope.fax = $scope.listaLica[i-1].fax;
							$scope.banka = $scope.listaLica[i-1].banka;
							$scope.jmbg = $scope.listaLica[i-1].jmbgKlijenta;
							$scope.imeKlijenta = $scope.listaLica[i-1].imeKlijenta;
							$scope.prezimeKlijenta = $scope.listaLica[i-1].prezimeKlijenta;
							break;
						}	
					}
				}
			}
		}
		
		$scope.jedanDesno = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = false;
			$scope.stanjePregled = true;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined){
				$scope.sifraSelected = $scope.listaLica[0].pib;
				$scope.naziv = $scope.listaLica[0].naziv;
				$scope.adresa = $scope.listaLica[0].adresa;
				$scope.email = $scope.listaLica[0].email;
				$scope.web = $scope.listaLica[0].web;
				$scope.telefon = $scope.listaLica[0].telefon;
				$scope.fax = $scope.listaLica[0].fax;
				$scope.banka = $scope.listaLica[0].banka;
				$scope.jmbg = $scope.listaLica[0].jmbgKlijenta;
				$scope.imeKlijenta = $scope.listaLica[0].imeKlijenta;
				$scope.prezimeKlijenta = $scope.listaLica[0].prezimeKlijenta;
			}else{
				for(var i=0; i<$scope.listaLica.length; i++){
					if($scope.sifraSelected == $scope.listaLica[i].pib){
						if($scope.sifraSelected == $scope.listaLica[$scope.listaLica.length-1].pib){
							$scope.sifraSelected = $scope.listaLica[0].pib;
							$scope.naziv = $scope.listaLica[0].naziv;
							$scope.adresa = $scope.listaLica[0].adresa;
							$scope.email = $scope.listaLica[0].email;
							$scope.web = $scope.listaLica[0].web;
							$scope.telefon = $scope.listaLica[0].telefon;
							$scope.fax = $scope.listaLica[0].fax;
							$scope.banka = $scope.listaLica[0].banka;
							$scope.jmbg = $scope.listaLica[0].jmbgKlijenta;
							$scope.imeKlijenta = $scope.listaLica[0].imeKlijenta;
							$scope.prezimeKlijenta = $scope.listaLica[0].prezimeKlijenta;
							break;
						}else{
							$scope.sifraSelected = $scope.listaLica[i+1].pib;
							$scope.naziv = $scope.listaLica[i+1].naziv;
							$scope.adresa = $scope.listaLica[i+1].adresa;
							$scope.email = $scope.listaLica[i+1].email;
							$scope.web = $scope.listaLica[i+1].web;
							$scope.telefon = $scope.listaLica[i+1].telefon;
							$scope.fax = $scope.listaLica[i+1].fax;
							$scope.banka = $scope.listaLica[i+1].banka;
							$scope.jmbg = $scope.listaLica[i+1].jmbgKlijenta;
							$scope.imeKlijenta = $scope.listaLica[i+1].imeKlijenta;
							$scope.prezimeKlijenta = $scope.listaLica[i+1].prezimeKlijenta;
							break;	
						}
					}
				}
			}
		}
		
		$scope.stanjeDodavanje = function(){
			
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.naziv = null;
			$scope.adresa = null;
			$scope.email = null;
			$scope.web = null;
			$scope.telefon = null;
			$scope.fax = null;
			$scope.izmenaBanka = null;
			
			
			if(!angular.equals({}, $stateParams))
			{
				var flId = $stateParams.id;
				
				$http.post('http://localhost:8080/PoslovnaBanka/fizicko_lice/findOne',
				{sifra: flId})
				.success(function(data, status, header){
					$scope.jmbg = flId;
					$scope.imeKlijenta = data[0].naziv;
					$scope.prezimeKlijenta = data[0].prezime;
				});
			}
			else
			{
				$scope.jmbg = null;
				$scope.imeKlijenta = null;
				$scope.prezimeKlijenta = null;
			}
			
			
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.naziv = null;
			$scope.adresa = null;
			$scope.email = null;
			$scope.web = null;
			$scope.telefon = null;
			$scope.fax = null;
			$scope.izmenaBanka = null;
			$scope.jmbg = null;
			$scope.imeKlijenta = null;
			$scope.prezimeKlijenta = null;
		}
		
		$scope.commitAction = function(){
			if($scope.stanjeAdd){
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/save',
						{pib: $scope.sifraSelected, naziv: $scope.naziv, adresa: $scope.adresa, email: $scope.email, 
					web: $scope.web, telefon: $scope.telefon, fax: $scope.fax, banka: $scope.izmenaBanka,  jmbg: $scope.jmbg, ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams)){
						
						var plId = $stateParams.id;
						$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/'+ plId + '/pravna_lica')
						.success(function(data, status, header){
							
							$scope.listaLica = data;
							
							for(var i=0; i<$scope.listaLica.length; i++)
							{
								if($scope.sifraSelected == $scope.listaLica[i].pib.replace(/[\s]/g, ''))
								{
									$scope.sifraSelected = $scope.listaLica[i].pib;
									break;
								}
							}
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjeIzmena = true;
							$scope.stanjePregled = false;
							
							$state.go('ovlasceno_lice', {id: plId});
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
						.success(function(data, status, header){
							
							$scope.listaLica = data;
							
							for(var i=0; i<$scope.listaLica.length; i++)
							{
								if($scope.sifraSelected == $scope.listaLica[i].pib.replace(/[\s]/g, ''))
								{
									$scope.sifraSelected = $scope.listaLica[i].pib;
									break;
								}
							}
	
							$state.go('pravno_lice');
						});
					}
				});
			}else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/search',
						{pib: $scope.sifraSelected, naziv: $scope.naziv, adresa: $scope.adresa, email: $scope.email, 
					web: $scope.web, telefon: $scope.telefon, fax: $scope.fax, banka: $scope.izmenaBanka, jmbg: $scope.jmbg, ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams))
					{
						$scope.listaLica = data;
						$state.go('ovlasceno_lice', {id: plId});
					}
					else
					{
						$scope.listaLica = data;
						$state.go('pravno_lice');
					}
				});
			}
			else if($scope.stanjeIzmena)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/update',
						{pib: $scope.sifraSelected, naziv: $scope.naziv, adresa: $scope.adresa, email: $scope.email, 
					web: $scope.web, telefon: $scope.telefon, fax: $scope.fax, banka: $scope.izmenaBanka, jmbg: $scope.jmbg, ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams))
					{
						var plId = $stateParams.id;
						$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/'+ plId + '/pravna_lica')
						.success(function(data, status, header){
								
							$scope.listaLica = data;			
							$state.go('ovlasceno_lice', {id: plId});
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
						.success(function(data, status, header){
							$scope.listaLica = data;
							$state.go('pravno_lice');
						});
					}
				});
			}else{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteLice = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/pravno_lice/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams)){
						
						var plId = $stateParams.id;
						$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/'+ plId + '/pravna_lica')
						.success(function(data, status, header){
							$scope.listaLica = data;
							
							$scope.sifraSelected = null;
							$scope.naziv = null;
							$scope.adresa = null;
							$scope.email = null;
							$scope.web = null;
							$scope.telefon = null;
							$scope.fax = null;
							$scope.banka = null;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
						.success(function(data, status, header){
							$scope.listaLica = data;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjeIzmena = false;
							$scope.stanjePregled = true;
							
							
							$scope.jmbg = null;
							$scope.imeKlijenta = null;
							$scope.prezimeKlijenta = null;
							
							$state.go('pravno_lice');
						});
					}
					
					
					
				
				});
			}
			else
			{
				alert('Morate izabrati pravno lice za brisanje.');
			}
		}
		
		$scope.zoomPick = function()
		{
			zoomServiceFizickoLice.setZoom(true);
			zoomServiceFizickoLice.setPib($scope.sifraSelected);
			zoomServiceFizickoLice.setNaziv($scope.naziv);
			zoomServiceFizickoLice.setAdresa($scope.adresa);
			zoomServiceFizickoLice.setEmail($scope.email);
			zoomServiceFizickoLice.setWeb($scope.web);
			zoomServiceFizickoLice.setTelefon($scope.telefon);
			zoomServiceFizickoLice.setFax($scope.fax);
			zoomServiceFizickoLice.setBanka($scope.izmenaBanka);
			
			
			if($scope.stanjeSearch)
			{
				zoomServiceFizickoLice.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceFizickoLice.setPretraga(false);
			}
			else if($scope.stanjeIzmena)
			{
				zoomServiceFizickoLice.setIzmena(true);
			}
			
			$state.go('fizicko_lice');
		}
		
		$scope.searchFL = function()
		{
			$http.post('http://localhost:8080/PoslovnaBanka/fizicko_lice/findOne', {sifra : $scope.jmbg})
			.success(function(data, header, status)
			{
				$scope.imeKlijenta = data[0].naziv;
				$scope.prezimeKlijenta = data[0].prezime;
			});
		}
		
	});
})(angular)
