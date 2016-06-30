(function(angular){
	var drzavaModul = angular.module('drzavaEntry', []);
	
	drzavaModul.controller('drzavaCtrl', function($scope, $http, $state, $stateParams, zoomService, zoomValuteService)
	{
		
		$scope.stanjePregled = true;
		$scope.klikZaZoom = false;
		
		
		
		if(zoomService.getZoom())
		{
			$scope.zoom = zoomService.getZoom();
		}
		else if(zoomValuteService.getZoom())
		{
			$scope.zoom = zoomValuteService.getZoom();
		}
		
		
		$scope.zoomPickup = function()
		{
			
			if(zoomService.getZoom())
			{
				//za naseljeno mesto podaci
				zoomService.setSifraDrzave($scope.sifraSelected);
				zoomService.setNazivDrzave($scope.nazivDrzava);
				$state.go('naseljeno_mesto');
			}
			else if(zoomValuteService.getZoom())
			{
				//za valute podaci
				zoomValuteService.setSifraDrzave($scope.sifraSelected);
				zoomValuteService.setNazivDrzave($scope.nazivDrzava);
				$state.go('valute');
			}	
		}
		
		
		$http.get('http://localhost:8080/PoslovnaBanka/drzava/findAll')
		.success(function(data, status, header)
		{
			$scope.lista = data;
			
		});
		
		//funkcija koja podesava koji ce biti selektovani red
		$scope.setSelected = function(id, naziv)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			$scope.sifraSelected = id;
			$scope.nazivDrzava = naziv;
		}
		
		
		//refresovanje liste drzava
		$scope.refreshState = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/drzava/findAll')
			.success(function(data, status, header)
			{
				$scope.lista = data;
				
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				
				$scope.sifraSelected = null;
				$scope.nazivDrzava = null;
			});
		}
		
		
		//implementacija gornjih funkija
		$scope.levoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			
			$scope.sifraSelected = $scope.lista[0].sifra;
			$scope.nazivDrzava = $scope.lista[0].naziv;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			
			$scope.sifraSelected = $scope.lista[$scope.lista.length-1].sifra;
			$scope.nazivDrzava = $scope.lista[$scope.lista.length-1].naziv;
		}
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.lista[$scope.lista.length-1].sifra;
				$scope.nazivDrzava = $scope.lista[$scope.lista.length-1].naziv; 
			}
			else
			{
				for(var i=0; i<$scope.lista.length; i++)
				{
					if($scope.sifraSelected === $scope.lista[i].sifra)
					{
						if($scope.sifraSelected === $scope.lista[0].sifra)
						{
							$scope.sifraSelected = $scope.lista[$scope.lista.length-1].sifra;
							$scope.nazivDrzava = $scope.lista[$scope.lista.length-1].naziv; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i-1].sifra;
							$scope.nazivDrzava = $scope.lista[i-1].naziv;
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
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.lista[0].sifra;
				$scope.nazivDrzava = $scope.lista[0].naziv; 
			}
			else
			{
				for(var i=0; i<$scope.lista.length; i++)
				{
					if($scope.sifraSelected === $scope.lista[i].sifra)
					{
						if($scope.sifraSelected === $scope.lista[$scope.lista.length-1].sifra)
						{
							$scope.sifraSelected = $scope.lista[0].sifra;
							$scope.nazivDrzava = $scope.lista[0].naziv; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i+1].sifra;
							$scope.nazivDrzava = $scope.lista[i+1].naziv;
							break;	
						}
					}
				}
			}
		}
		
		//promena stanja na dodavanje
		$scope.stanjeDodavanje = function()
		{
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			
			$scope.sifraSelected = null;
			$scope.nazivDrzava = null;
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.nazivDrzava = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/save',
						{sifra: $scope.sifraSelected, naziv: $scope.nazivDrzava})
				.success(function(data, status, header)
				{
					$http.get('http://localhost:8080/PoslovnaBanka/drzava/findAll')
					.success(function(data, status, header)
					{
						$scope.lista = data;
						$state.go('drzava');
					});
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/search',
						{sifra: $scope.sifraSelected, naziv: $scope.nazivDrzava})
				.success(function(data, status, header){
					$scope.lista = data;
					$state.go('drzava');
				});
			}
			else if($scope.stanjeIzmena)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/update',
						{sifra: $scope.sifraSelected, naziv: $scope.nazivDrzava})
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/drzava/findAll')
					.success(function(data, status, header)
					{
						
						$scope.lista = data;
						$state.go('drzava');
					});
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteState = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/drzava/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/drzava/findAll')
					.success(function(data, status, header){
						$scope.lista = data;
						$scope.sifraSelected = null;
						$scope.nazivDrzava = null;
						
						
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjePregled = true;
						$scope.stanjeIzmena = false;
						
						$state.go('drzava');
					});
				});
			}
			else
			{
				alert('Morate izabrati drzavu za brisanje.');
			}
		}
		
		$scope.findNaselja = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$scope.klikZaZoom = true;
				
				if($scope.izborNext === 'drzava_naselje')
				{
					$state.go('drzava_naselje', {id: $scope.sifraSelected});
				}
				else if($scope.izborNext === 'valute_drzava')
				{
					$state.go('valute_drzava', {id: $scope.sifraSelected});
				}
			}else{
				alert("Odaberite drzavu.");
			}	
		}
	});
})(angular)