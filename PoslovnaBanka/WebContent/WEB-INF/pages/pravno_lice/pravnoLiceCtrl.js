(function(angular){
	var pravnoLiceModul = angular.module('pravnoLiceEntry', []);
	
	pravnoLiceModul.controller('pravnoLiceCtrl', function($scope, $http, $state, $stateParams, zoomServiceFizickoLice, kodoviBankeZoomServis){
		
		$scope.stanjePregled = true;
		
		if(zoomServiceFizickoLice.getZoom()){
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
			
			if(zoomServiceFizickoLice.getPretraga())
			{
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;	
			}
			else
			{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
			}
			
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
		
		
		
		$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
		.success(function(data, status, header){
			$scope.listaLica = data;
		});
		
		$scope.setSelected = function(pib, naziv, adresa, email, web, telefon, fax, jmbg, imeKlijenta, prezimeKlijenta){
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
			$scope.jmbg = jmbg;
			$scope.imeKlijenta = imeKlijenta;
			$scope.prezimeKlijenta = prezimeKlijenta;
		}
		
		$scope.refreshLica = function(){
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
				$scope.jmbg = null;
				$scope.imeKlijenta = null;
				$scope.prezimeKlijenta = null;
			});
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
			$scope.jmbg = null;
			$scope.imeKlijenta = null;
			$scope.prezimeKlijenta = null;
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
			$scope.jmbg = null;
			$scope.imeKlijenta = null;
			$scope.prezimeKlijenta = null;
		}
		
		$scope.commitAction = function(){
			if($scope.stanjeAdd){
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/save',
						{pib: $scope.sifraSelected, naziv: $scope.naziv, adresa: $scope.adresa, email: $scope.email, 
					web: $scope.web, telefon: $scope.telefon, fax: $scope.fax, jmbg: $scope.jmbg, ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta})
				.success(function(data, status, header){
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
						
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = true;
						$scope.stanjePregled = false;
						$state.go('pravno_lice');
					});
				});
			}else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/search',
						{pib: $scope.sifraSelected, naziv: $scope.naziv, adresa: $scope.adresa, email: $scope.email, 
					web: $scope.web, telefon: $scope.telefon, fax: $scope.fax, jmbg: $scope.jmbg, ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta})
				.success(function(data, status, header){
					$scope.listaLica = data;
					$state.go('pravno_lice');
				});
			}
			else if($scope.stanjeIzmena){
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/update',
						{pib: $scope.sifraSelected, naziv: $scope.naziv, adresa: $scope.adresa, email: $scope.email, 
					web: $scope.web, telefon: $scope.telefon, fax: $scope.fax, jmbg: $scope.jmbg, ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta})
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
					.success(function(data, status, header){
						$scope.listaLica = data;
						$state.go('pravno_lice');
					});
				});
			}else{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteLice = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/pravno_lice/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/findAll')
					.success(function(data, status, header){
						$scope.listaLica = data;
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = false;
						$scope.stanjePregled = true;
						$scope.sifraSelected = null;
						$scope.naziv = null;
						$scope.adresa = null;
						$scope.email = null;
						$scope.web = null;
						$scope.telefon = null;
						$scope.fax = null;
						$scope.jmbg = null;
						$scope.imeKlijenta = null;
						$scope.prezimeKlijenta = null;
						$state.go('pravno_lice');
					});
				});
			}
			else
			{
				alert('Morate izabrati drzavu za brisanje.');
			}
		}
		
		$scope.zoomPick = function()
		{
			zoomServiceFizickoLice.setZoom(true);
			
			if($scope.stanjeSearch)
			{
				zoomServiceFizickoLice.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceFizickoLice.setPretraga(false);
			}
			
			$state.go('fizicko_lice');
		}
		
	});
})(angular)
