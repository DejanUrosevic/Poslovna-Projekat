(function(angular){
	var kliringModul = angular.module('kliringEntry', []);
	
	kliringModul.controller('kliringCtrl', function($scope, $http, $state, $stateParams){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/kliring/findAll')
		.success(function(data, status, header){
			$scope.lista = data;
		});
		
		$scope.setSelected = function(id, nazivBankeDuznika, racunBankeDuznika, nazivBankePoverioca, racunBankePoverioca, datum, datumValute, sifra, ukupno){
			$scope.sifraSelected = id;
			$scope.nazivBankeDuznika = nazivBankeDuznika;
			$scope.racunBankeDuznika = racunBankeDuznika;
			$scope.nazivBankePoverioca = nazivBankePoverioca;
			$scope.racunBankePoverioca = racunBankePoverioca;
			$scope.datum = new Date(datum);
			$scope.datumValute = new Date(datumValute);
			$scope.sifra = sifra;
			$scope.ukupno = ukupno;
		}
		
		$scope.refreshLica = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/kliring/findAll')
			.success(function(data, status, header)
			{
				$scope.lista = data;
				
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				
				$scope.sifraSelected = null;
				$scope.nazivBankeDuznika = null;
				$scope.racunBankeDuznika = null;
				$scope.nazivBankePoverioca = null;
				$scope.racunBankePoverioca = null;
				$scope.datum = null;
				$scope.datumValute = null;
				$scope.sifra = null;
				$scope.ukupno = null;
			});
		}
		
		$scope.levoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.lista[0].id;
			$scope.nazivBankeDuznika = $scope.lista[0].nazivBankeDuznika;
			$scope.racunBankeDuznika = $scope.lista[0].racunBankeDuznika;
			$scope.nazivBankePoverioca = $scope.lista[0].nazivBankePoverioca;
			$scope.racunBankePoverioca = $scope.lista[0].racunBankePoverioca;
			$scope.datum = new Date($scope.lista[0].datum);
			$scope.datumValute = new Date($scope.lista[0].datumValute);
			$scope.sifra = $scope.lista[0].sifra;
			$scope.ukupno = $scope.lista[0].ukupno;
		}
		
		$scope.desnoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
			$scope.nazivBankeDuznika = $scope.lista[$scope.lista.length-1].nazivBankeDuznika;
			$scope.racunBankeDuznika = $scope.lista[$scope.lista.length-1].racunBankeDuznika;
			$scope.nazivBankePoverioca = $scope.lista[$scope.lista.length-1].nazivBankePoverioca;
			$scope.racunBankePoverioca = $scope.lista[$scope.lista.length-1].racunBankePoverioca;
			$scope.datum = new Date($scope.lista[$scope.lista.length-1].datum);
			$scope.datumValute = new Date($scope.lista[$scope.lista.length-1].datumValute);
			$scope.sifra = $scope.lista[$scope.lista.length-1].sifra;
			$scope.ukupno = $scope.lista[$scope.lista.length-1].ukupno;
		}
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
				$scope.nazivBankeDuznika = $scope.lista[$scope.lista.length-1].nazivBankeDuznika;
				$scope.racunBankeDuznika = $scope.lista[$scope.lista.length-1].racunBankeDuznika;
				$scope.nazivBankePoverioca = $scope.lista[$scope.lista.length-1].nazivBankePoverioca;
				$scope.racunBankePoverioca = $scope.lista[$scope.lista.length-1].racunBankePoverioca;
				$scope.datum = new Date($scope.lista[$scope.lista.length-1].datum);
				$scope.datumValute = new Date($scope.lista[$scope.lista.length-1].datumValute);
				$scope.sifra = $scope.lista[$scope.lista.length-1].sifra;
				$scope.ukupno = $scope.lista[$scope.lista.length-1].ukupno; 
			}
			else
			{
				for(var i=0; i<$scope.lista.length; i++)
				{
					if($scope.sifraSelected == $scope.lista[i].id)
					{
						if($scope.sifraSelected == $scope.lista[0].id)
						{
							$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
							$scope.nazivBankeDuznika = $scope.lista[$scope.lista.length-1].nazivBankeDuznika;
							$scope.racunBankeDuznika = $scope.lista[$scope.lista.length-1].racunBankeDuznika;
							$scope.nazivBankePoverioca = $scope.lista[$scope.lista.length-1].nazivBankePoverioca;
							$scope.racunBankePoverioca = $scope.lista[$scope.lista.length-1].racunBankePoverioca;
							$scope.datum = new Date($scope.lista[$scope.lista.length-1].datum);
							$scope.datumValute = new Date($scope.lista[$scope.lista.length-1].datumValute);
							$scope.sifra = $scope.lista[$scope.lista.length-1].sifra;
							$scope.ukupno = $scope.lista[$scope.lista.length-1].ukupno;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i-1].id;
							$scope.nazivBankeDuznika = $scope.lista[i-1].nazivBankeDuznika;
							$scope.racunBankeDuznika = $scope.lista[i-1].racunBankeDuznika;
							$scope.nazivBankePoverioca = $scope.lista[i-1].nazivBankePoverioca;
							$scope.racunBankePoverioca = $scope.lista[i-1].racunBankePoverioca;
							$scope.datum = new Date($scope.lista[i-1].datum);
							$scope.datumValute = new Date($scope.lista[i-1].datumValute);
							$scope.sifra = $scope.lista[i-1].sifra;
							$scope.ukupno = $scope.lista[i-1].ukupno;
							break;
						}
						
					}
				}
			}
		}
		
		$scope.jedanDesno = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.lista[0].id;
				$scope.nazivBankeDuznika = $scope.lista[0].nazivBankeDuznika;
				$scope.racunBankeDuznika = $scope.lista[0].racunBankeDuznika;
				$scope.nazivBankePoverioca = $scope.lista[0].nazivBankePoverioca;
				$scope.racunBankePoverioca = $scope.lista[0].racunBankePoverioca;
				$scope.datum = new Date($scope.lista[0].datum);
				$scope.datumValute = new Date($scope.lista[0].datumValute);
				$scope.sifra = $scope.lista[0].sifra;
				$scope.ukupno = $scope.lista[0].ukupno;
			}
			else
			{
				for(var i=0; i<$scope.listaLica.length; i++)
				{
					if($scope.sifraSelected == $scope.lista[i].id)
					{
						if($scope.sifraSelected == $scope.lista[$scope.lista.length-1].id)
						{
							$scope.sifraSelected = $scope.lista[0].id;
							$scope.nazivBankeDuznika = $scope.lista[0].nazivBankeDuznika;
							$scope.racunBankeDuznika = $scope.lista[0].racunBankeDuznika;
							$scope.nazivBankePoverioca = $scope.lista[0].nazivBankePoverioca;
							$scope.racunBankePoverioca = $scope.lista[0].racunBankePoverioca;
							$scope.datum = new Date($scope.lista[0].datum);
							$scope.datumValute = new Date($scope.lista[0].datumValute);
							$scope.sifra = $scope.lista[0].sifra;
							$scope.ukupno = $scope.lista[0].ukupno;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i+1].id;
							$scope.nazivBankeDuznika = $scope.lista[i+1].nazivBankeDuznika;
							$scope.racunBankeDuznika = $scope.lista[i+1].racunBankeDuznika;
							$scope.nazivBankePoverioca = $scope.lista[i+1].nazivBankePoverioca;
							$scope.racunBankePoverioca = $scope.lista[i+1].racunBankePoverioca;
							$scope.datum = new Date($scope.lista[i+1].datum);
							$scope.datumValute = new Date($scope.lista[i+1].datumValute);
							$scope.sifra = $scope.lista[i+1].sifra;
							$scope.ukupno = $scope.lista[i+1].ukupno;
							break;	
						}
					}
				}
			}
		}
		/*
		$scope.stanjeDodavanje = function()
		{
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.nazivBankeDuznika = null;
			$scope.racunBankeDuznika = null;
			$scope.nazivBankePoverioca = null;
			$scope.racunBankePoverioca = null;
			$scope.datum = null;
			$scope.datumValute = null;
			$scope.sifra = null;
			$scope.ukupno = null;
		}
		*/
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.nazivBankeDuznika = null;
			$scope.racunBankeDuznika = null;
			$scope.nazivBankePoverioca = null;
			$scope.racunBankePoverioca = null;
			$scope.datum = null;
			$scope.datumValute = null;
			$scope.sifra = null;
			$scope.ukupno = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeSearch)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/kliring/search',
						{sifra: $scope.sifraSelected, nazivBankeDuznika: $scope.nazivBankeDuznika, racunBankeDuznika: $scope.racunBankeDuznika, nazivBankePoverioca: $scope.nazivBankePoverioca, racunBankePoverioca: $scope.racunBankePoverioca, datum: $scope.datum, datumValute: $scope.datumValute, sifraPoruke: $scope.sifra, ukupno: $scope.ukupno})
				.success(function(data, status, header)
				{
						$scope.lista = data;
						$state.go('kliring');
				});
			}
		}
	
	});
})(angular)