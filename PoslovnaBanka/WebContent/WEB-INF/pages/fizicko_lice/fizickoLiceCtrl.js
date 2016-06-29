(function(angular){
	var fizickoLiceModul = angular.module('fizickoLiceEntry', []);
	
	fizickoLiceModul.controller('fizickoLiceCtrl', function($http, $scope, $state, $stateParams, zoomServiceFizickoLice){
		$scope.stanjePregled = true;
		$scope.zoom = zoomServiceFizickoLice.getZoom();
		
		$scope.zoomPickup = function(){
			zoomServiceFizickoLice.setJmbgKlijenta($scope.sifraSelected);
			zoomServiceFizickoLice.setImeKlijenta($scope.klijentIme);
			zoomServiceFizickoLice.setPrezimeKlijenta($scope.klijentPrezime);
			$state.go('pravno_lice');
		}
		
		$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/findAll')
		.success(function(data, status, header){
			$scope.listaLica = data;
		});
		
		$scope.setSelected = function(jmbg, ime, prezime, email, adresa, telefon)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			$scope.sifraSelected = jmbg;
			$scope.klijentIme = ime;
			$scope.klijentPrezime = prezime;
			$scope.klijentEmail = email;
			$scope.klijentAdresa = adresa;
			$scope.klijentTelefon = telefon;
		}
		
		$scope.refreshLica = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/findAll')
			.success(function(data, status, header)
			{
				$scope.listaLica = data;
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				$scope.sifraSelected = null;
				$scope.klijentIme = null;
				$scope.klijentPrezime = null;
				$scope.klijentEmail = null;
				$scope.klijentAdresa = null;
				$scope.klijentTelefon = null;
			});
		}
		
		$scope.levoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaLica[0].jmbg;
			$scope.klijentIme = $scope.listaLica[0].naziv;
			$scope.klijentPrezime = $scope.listaLica[0].prezime;
			$scope.klijentEmail = $scope.listaLica[0].email;
			$scope.klijentAdresa = $scope.listaLica[0].adresa;
			$scope.klijentTelefon = $scope.listaLica[0].telefon;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaLica[$scope.listaLica.length-1].jmbg;
			$scope.klijentIme = $scope.listaLica[$scope.listaLica.length-1].naziv;
			$scope.klijentPrezime = $scope.listaLica[$scope.listaLica.length-1].prezime;
			$scope.klijentEmail = $scope.listaLica[$scope.listaLica.length-1].email;
			$scope.klijentAdresa = $scope.listaLica[$scope.listaLica.length-1].adresa;
			$scope.klijentTelefon = $scope.listaLica[$scope.listaLica.length-1].telefon;
		}
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaLica[$scope.listaLica.length-1].jmbg;
				$scope.klijentIme = $scope.listaLica[$scope.listaLica.length-1].naziv;
				$scope.klijentPrezime = $scope.listaLica[$scope.listaLica.length-1].prezime;
				$scope.klijentEmail = $scope.listaLica[$scope.listaLica.length-1].email;
				$scope.klijentAdresa = $scope.listaLica[$scope.listaLica.length-1].adresa;
				$scope.klijentTelefon = $scope.listaLica[$scope.listaLica.length-1].telefon; 
			}
			else
			{
				for(var i=0; i<$scope.listaLica.length; i++)
				{
					if($scope.sifraSelected == $scope.listaLica[i].jmbg)
					{
						if($scope.sifraSelected == $scope.listaLica[0].jmbg)
						{
							$scope.sifraSelected = $scope.listaLica[$scope.listaLica.length-1].jmbg;
							$scope.klijentIme = $scope.listaLica[$scope.listaLica.length-1].naziv;
							$scope.klijentPrezime = $scope.listaLica[$scope.listaLica.length-1].prezime;
							$scope.klijentEmail = $scope.listaLica[$scope.listaLica.length-1].email;
							$scope.klijentAdresa = $scope.listaLica[$scope.listaLica.length-1].adresa;
							$scope.klijentTelefon = $scope.listaLica[$scope.listaLica.length-1].telefon;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaLica[i-1].jmbg;
							$scope.klijentIme = $scope.listaLica[i-1].naziv;
							$scope.klijentPrezime = $scope.listaLica[i-1].prezime;
							$scope.klijentEmail = $scope.listaLica[i-1].email;
							$scope.klijentAdresa = $scope.listaLica[i-1].adresa;
							$scope.klijentTelefon = $scope.listaLica[i-1].telefon;
							break;
						}
						
					}
				}
			}
		}
		
		$scope.jedanDesno = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = false;
			$scope.stanjePregled = true;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaLica[0].jmbg;
				$scope.klijentIme = $scope.listaLica[0].naziv;
				$scope.klijentPrezime = $scope.listaLica[0].prezime;
				$scope.klijentEmail = $scope.listaLica[0].email;
				$scope.klijentAdresa = $scope.listaLica[0].adresa;
				$scope.klijentTelefon = $scope.listaLica[0].telefon;
			}
			else
			{
				for(var i=0; i<$scope.listaLica.length; i++)
				{
					if($scope.sifraSelected == $scope.listaLica[i].jmbg)
					{
						if($scope.sifraSelected == $scope.listaLica[$scope.listaLica.length-1].jmbg)
						{
							$scope.sifraSelected = $scope.listaLica[0].jmbg;
							$scope.klijentIme = $scope.listaLica[0].naziv;
							$scope.klijentPrezime = $scope.listaLica[0].prezime;
							$scope.klijentEmail = $scope.listaLica[0].email;
							$scope.klijentAdresa = $scope.listaLica[0].adresa;
							$scope.klijentTelefon = $scope.listaLica[0].telefon;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaLica[i+1].jmbg;
							$scope.klijentIme = $scope.listaLica[i+1].naziv;
							$scope.klijentPrezime = $scope.listaLica[i+1].prezime;
							$scope.klijentEmail = $scope.listaLica[i+1].email;
							$scope.klijentAdresa = $scope.listaLica[i+1].adresa;
							$scope.klijentTelefon = $scope.listaLica[i+1].telefon;
							break;	
						}
					}
				}
			}
		}
		
		$scope.stanjeDodavanje = function()
		{
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.klijentIme = null;
			$scope.klijentPrezime = null;
			$scope.klijentEmail = null;
			$scope.klijentAdresa = null;
			$scope.klijentTelefon = null;
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.klijentIme = null;
			$scope.klijentPrezime = null;
			$scope.klijentEmail = null;
			$scope.klijentAdresa = null;
			$scope.klijentTelefon = null;
		}
		
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/fizicko_lice/save',
						{jmbg: $scope.sifraSelected, naziv: $scope.klijentIme, prezime: $scope.klijentPrezime, email: $scope.klijentEmail, 
					adresa: $scope.klijentAdresa, telefon: $scope.klijentTelefon})
				.success(function(data, status, header)
				{
					$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/findAll')
					.success(function(data, status, header)
					{
						$scope.listaLica = data;
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = true;
						$scope.stanjePregled = false;
						$state.go('fizicko_lice');
					});
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/fizicko_lice/search',
						{jmbg: $scope.sifraSelected, naziv: $scope.klijentIme, prezime: $scope.klijentPrezime, email: $scope.klijentEmail, 
					adresa: $scope.klijentAdresa, telefon: $scope.klijentTelefon})
				.success(function(data, status, header){
					$scope.listaLica = data;
					$state.go('fizicko_lice');
				});
			}
			else if($scope.stanjeIzmena)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/fizicko_lice/update',
						{jmbg: $scope.sifraSelected, naziv: $scope.klijentIme, prezime: $scope.klijentPrezime, email: $scope.klijentEmail, 
					adresa: $scope.klijentAdresa, telefon: $scope.klijentTelefon})
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/findAll')
					.success(function(data, status, header)
					{
						$scope.listaLica = data;
						$state.go('fizicko_lice');
					});
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteLice = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/fizicko_lice/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/fizicko_lice/findAll')
					.success(function(data, status, header){
						$scope.lista = data;
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = false;
						$scope.stanjePregled = true;
						$scope.sifraSelected = null;
						$scope.klijentIme = null;
						$scope.klijentPrezime = null;
						$scope.klijentEmail = null;
						$scope.klijentAdresa = null;
						$scope.klijentTelefon = null;
						$state.go('fizicko_lice');
					});
				});
			}
			else
			{
				alert('Morate izabrati drzavu za brisanje.');
			}
		}
		
	});
})(angular)