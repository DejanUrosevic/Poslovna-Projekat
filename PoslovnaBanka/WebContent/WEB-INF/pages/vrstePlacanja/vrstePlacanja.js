(function(angular){
	
	var vrstePlacanjaModul = angular.module('vrstePlacanjaEntry', []);
	
	vrstePlacanjaModul.controller('vrstePlacanjaCtrl', function($scope, $http, $state, $stateParams, zoomServiceAnalitikaRacun)
	{
		$scope.stanjePregled = true;
		$scope.zoom = zoomServiceAnalitikaRacun.getZoom();
		
		
		$http.get('http://localhost:8080/PoslovnaBanka/vrstePlacanja/findAll')
		.success(function(data, status, header)
		{
			$scope.listaPlacanja = data;
		});
		
		
		//funkcija koja podesava koji ce biti selektovani red
		$scope.setSelected = function(id, naziv)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			$scope.sifraSelected = id;
			$scope.nazivPlacanja = naziv;
		}
		
		//refresovanje liste drzava
		$scope.refreshState = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/vrstePlacanja/findAll')
			.success(function(data, status, header)
			{
				$scope.listaPlacanja = data;
				
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				
				$scope.sifraSelected = null;
				$scope.nazivPlacanja = null;
			});
		}
		
		//implementacija gornjih funkija
		$scope.levoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaPlacanja[0].oznaka;
			$scope.nazivPlacanja = $scope.listaPlacanja[0].naziv;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaPlacanja[$scope.listaPlacanja.length-1].oznaka;
			$scope.nazivPlacanja = $scope.listaPlacanja[$scope.listaPlacanja.length-1].naziv;
		}
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaPlacanja[$scope.listaPlacanja.length-1].oznaka;
				$scope.nazivPlacanja = $scope.listaPlacanja[$scope.listaPlacanja.length-1].naziv; 
			}
			else
			{
				for(var i=0; i<$scope.listaPlacanja.length; i++)
				{
					if($scope.sifraSelected === $scope.listaPlacanja[i].oznaka)
					{
						if($scope.sifraSelected === $scope.listaPlacanja[0].oznaka)
						{
							$scope.sifraSelected = $scope.listaPlacanja[$scope.listaPlacanja.length-1].oznaka;
							$scope.nazivPlacanja = $scope.listaPlacanja[$scope.listaPlacanja.length-1].naziv; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaPlacanja[i-1].oznaka;
							$scope.nazivPlacanja = $scope.listaPlacanja[i-1].naziv;
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
				$scope.sifraSelected = $scope.listaPlacanja[0].oznaka;
				$scope.nazivPlacanja = $scope.listaPlacanja[0].naziv; 
			}
			else
			{
				for(var i=0; i<$scope.listaPlacanja.length; i++)
				{
					if($scope.sifraSelected === $scope.listaPlacanja[i].oznaka)
					{
						if($scope.sifraSelected === $scope.listaPlacanja[$scope.listaPlacanja.length-1].oznaka)
						{
							$scope.sifraSelected = $scope.listaPlacanja[0].oznaka;
							$scope.nazivPlacanja = $scope.listaPlacanja[0].naziv; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaPlacanja[i+1].oznaka;
							$scope.nazivPlacanja = $scope.listaPlacanja[i+1].naziv;
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
			$scope.nazivPlacanja = null;
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.nazivPlacanja = null;
		}
		
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/vrstePlacanja/save',
						{oznaka: $scope.sifraSelected, naziv: $scope.nazivPlacanja})
				.success(function(data, status, header)
				{
					$http.get('http://localhost:8080/PoslovnaBanka/vrstePlacanja/findAll')
					.success(function(data, status, header)
					{
						$scope.listaPlacanja = data;
						
						for(var i=0; i<$scope.listaPlacanja.length; i++)
						{
							if($scope.sifraSelected == $scope.listaPlacanja[i].oznaka)
							{
								$scope.sifraSelected = $scope.listaPlacanja[i].oznaka;
								break;
							}
						}
						
						$state.go('vrstePlacanja');
					});
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/vrstePlacanja/search',
						{oznaka: $scope.sifraSelected, naziv: $scope.nazivPlacanja})
				.success(function(data, status, header){
					
					$scope.listaPlacanja = data;
					$state.go('vrstePlacanja');
				});
			}
			else if($scope.stanjeIzmena)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/vrstePlacanja/update',
						{oznaka: $scope.sifraSelected, naziv: $scope.nazivPlacanja})
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/vrstePlacanja/findAll')
					.success(function(data, status, header)
					{
						
						$scope.listaPlacanja = data;
						$state.go('vrstePlacanja');
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
				$http.delete('http://localhost:8080/PoslovnaBanka/vrstePlacanja/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/vrstePlacanja/findAll')
					.success(function(data, status, header){
						
						$scope.listaPlacanja = data;
						$scope.sifraSelected = null;
						$scope.nazivPlacanja = null;
						
						
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjePregled = true;
						$scope.stanjeIzmena = false;
						
						$state.go('vrstePlacanja');
					});
				});
			}
			else
			{
				alert('Morate izabrati vrstu placanja za brisanje.');
			}
		}
		
		$scope.zoomPickup = function(){
			zoomServiceAnalitikaRacun.setIdVrstePlacanja($scope.sifraSelected);
			zoomServiceAnalitikaRacun.setNazivPlacanja($scope.nazivPlacanja);
			$state.go('analitike');
		}
		
	});
})(angular)