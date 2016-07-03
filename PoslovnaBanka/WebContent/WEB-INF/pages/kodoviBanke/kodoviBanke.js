(function(angular){
	
	var kodoviBankeModul = angular.module('kodoviBankeEntry',[]);
	
	kodoviBankeModul.controller('kodoviBankeCtrl', function($scope, $http, $state, $stateParams, kodoviBankeZoomServis)
	{
		
		$scope.stanjePregled = true;
		
		if(!angular.equals({}, $stateParams))
		{
			$scope.zoomIcon = false;
		}
		else
		{
			$scope.zoomIcon = true;
		}
		
		
		if(kodoviBankeZoomServis.getZoom())
		{
			$scope.stanjePregled = false; 
			$scope.stanjeIzmena = false;
			
			if(kodoviBankeZoomServis.getPretraga())
			{
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
				
			}
			else
			{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
			}
			
			$scope.sifraSelected = kodoviBankeZoomServis.getSifra();
			$scope.swift = kodoviBankeZoomServis.getSwift();
			$scope.pibPravnogLica = kodoviBankeZoomServis.getPibPravnogLica();
			$scope.nazivPravnogLica = kodoviBankeZoomServis.getNazivPravnogLica();
			
			kodoviBankeZoomServis.setZoom(false);
		}
		
		
		if(!angular.equals({}, $stateParams))
		{
			var drzavaId = $stateParams.id;
			$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/' + drzavaId + '/kodovi_banke')
			.success(function(data, status, header){
				$scope.listaKodova = data;
			});
		}
		else
		{
			$http.get('http://localhost:8080/PoslovnaBanka/kodoviBanke/findAll')
			.success(function(data, status, header){
				
				$scope.listaKodova = data;
			});
		}
		
		
		
		$scope.setSelected = function(id, swift, pib, nazivPL)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = true;
			$scope.stanjeSearch = false;
			
			
			$scope.sifraSelected = id;
			$scope.swift = swift;
			$scope.pibPravnogLica = pib;
			$scope.nazivPravnogLica = nazivPL;
		}
		
		$scope.levoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaKodova[0].sifra;
			$scope.swift = $scope.listaKodova[0].swift;
			$scope.pibPravnogLica = $scope.listaKodova[0].pibPravnogLica;
			$scope.nazivPravnogLica = $scope.listaKodova[0].nazivPravnogLica;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaKodova[$scope.listaKodova.length-1].sifra;
			$scope.swift = $scope.listaKodova[$scope.listaKodova.length-1].swift;
			$scope.pibPravnogLica = $scope.listaKodova[$scope.listaKodova.length-1].pibPravnogLica;
			$scope.nazivPravnogLica = $scope.listaKodova[$scope.listaKodova.length-1].nazivPravnogLica;
		}
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaKodova[$scope.listaKodova.length-1].sifra;
				$scope.swift = $scope.listaKodova[$scope.listaKodova.length-1].swift;
				$scope.pibPravnogLica = $scope.listaKodova[$scope.listaKodova.length-1].pibPravnogLica;
				$scope.nazivPravnogLica = $scope.listaKodova[$scope.listaKodova.length-1].nazivPravnogLica;
			}
			else
			{
				for(var i=0; i<$scope.listaKodova.length; i++)
				{
					if($scope.sifraSelected === $scope.listaKodova[i].sifra)
					{
						if($scope.sifraSelected === $scope.listaKodova[0].sifra)
						{
							$scope.sifraSelected = $scope.listaKodova[$scope.listaKodova.length-1].sifra;
							$scope.swift = $scope.listaKodova[$scope.listaKodova.length-1].swift;
							$scope.pibPravnogLica = $scope.listaKodova[$scope.listaKodova.length-1].pibPravnogLica;
							$scope.nazivPravnogLica = $scope.listaKodova[$scope.listaKodova.length-1].nazivPravnogLica;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaKodova[i-1].sifra;
							$scope.swift = $scope.listaKodova[i-1].swift;
							$scope.pibPravnogLica = $scope.listaKodova[i-1].pibPravnogLica;
							$scope.nazivPravnogLica = $scope.listaKodova[i-1].nazivPravnogLica;
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
				$scope.sifraSelected = $scope.listaKodova[0].sifra;
				$scope.swift = $scope.listaKodova[0].swift;
				$scope.pibPravnogLica = $scope.listaKodova[0].pibPravnogLica;
				$scope.nazivPravnogLica = $scope.listaKodova[0].nazivPravnogLica;
			}
			else
			{
				for(var i=0; i<$scope.listaKodova.length; i++)
				{
					if($scope.sifraSelected === $scope.listaKodova[i].sifra)
					{
						if($scope.sifraSelected === $scope.listaKodova[$scope.listaKodova.length-1].sifra)
						{
							$scope.sifraSelected = $scope.listaKodova[0].sifra;
							$scope.swift = $scope.listaKodova[0].swift;
							$scope.pibPravnogLica = $scope.listaKodova[0].pibPravnogLica;
							$scope.nazivPravnogLica = $scope.listaKodova[0].nazivPravnogLica;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaKodova[i+1].sifra;
							$scope.swift = $scope.listaKodova[i+1].swift;
							$scope.pibPravnogLica = $scope.listaKodova[i+1].pibPravnogLica;
							$scope.nazivPravnogLica = $scope.listaKodova[i+1].nazivPravnogLica;
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
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = null;
			$scope.swift = null;
			
			if(!angular.equals({}, $stateParams))
			{
				var pravnoLiceId = $stateParams.id;
				$scope.pibPravnogLica = drzavaId;
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/findOne',
				{sifra: pravnoLiceId})
				.success(function(data, status, header){
					$scope.nazivPravnogLica = data[0].naziv;
				});
			}
			else
			{
				$scope.pibPravnogLica = null;
				$scope.nazivPravnogLica = null;
			}
			
			
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
			
			
			$scope.sifraSelected = null;
			$scope.swift = null;
			$scope.pibPravnogLica = null;
			$scope.nazivPravnogLica = null;
		}
		
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/kodoviBanke/save',
						{sifra: $scope.sifraSelected, swift: $scope.swift, pibPravnogLica: $scope.pibPravnogLica, nazivPravnogLica: $scope.nazivPravnogLica})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams)){
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/' + drzavaId + '/kodovi_banke')
						.success(function(data, status, header){
							$scope.listaKodova = data;
							
							for(var i=0; i<$scope.listaKodova.length; i++)
							{
								if($scope.sifraSelected == $scope.listaKodova[i].sifra.replace(/[\s]/g, ''))
								{
									$scope.sifraSelected = $scope.listaKodova[i].sifra;
									break;
								}
							}
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/kodoviBanke/findAll')
						.success(function(data, status, header)
						{
							$scope.listaKodova = data;
							for(var i=0; i<$scope.listaKodova.length; i++)
							{
								if($scope.sifraSelected == $scope.listaKodova[i].sifra.replace(/[\s]/g, ''))
								{
									$scope.sifraSelected = $scope.listaKodova[i].sifra;
									break;
								}
							}
						});
					}
					
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/kodoviBanke/search',
						{sifra: $scope.sifraSelected, swift: $scope.swift, pibPravnogLica: $scope.pibPravnogLica, nazivPravnogLica: $scope.nazivPravnogLica})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams))
					{
						$scope.listaKodova = data;
						$state.go('pravni_kod_banke');
					}
					else
					{
						$scope.listaKodova = data;
						$state.go('kodoviBanke');
					}

				});
			}
			else if($scope.stanjeIzmena)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/kodoviBanke/update',
						{sifra: $scope.sifraSelected, swift: $scope.swift, pibPravnogLica: $scope.pibPravnogLica, nazivPravnogLica: $scope.nazivPravnogLica})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams))
					{
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/' + drzavaId + '/kodovi_banke')
						.success(function(data, status, header){
							
							$scope.listaKodova = data;
							$state.go('pravni_kod_banke');
					
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/kodoviBanke/findAll')
						.success(function(data, status, header)
						{
							$scope.listaKodova = data;
							$state.go('kodoviBanke');
						});
					}
				});
				
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteState = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/kodoviBanke/delete/' + $scope.sifraSelected)
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams))
					{
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/' + drzavaId + '/kodovi_banke')
						.success(function(data, status, header){
							
							$scope.listaKodova = data;
							
							$scope.sifraSelected = null;
							$scope.swift = null;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('pravni_kod_banke');
					
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/kodoviBanke/findAll')
						.success(function(data, status, header){
							
							$scope.listaKodova = data;
							
							$scope.sifraSelected = null;
							$scope.swift = null;
							$scope.pibPravnogLica = null;
							$scope.nazivPravnogLica = null;
							 
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('kodoviBanke');
						});		
					}
						
				});
			}
			else
			{
				alert('Morate izabrati kod banke za brisanje.');
			}
		}
		
		
		$scope.refreshState = function()
		{
			if(!angular.equals({}, $stateParams))
			{
				var drzavaId = $stateParams.id;
				
				$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/' + drzavaId + '/kodovi_banke')
				.success(function(data, status, header){
					
					$scope.listaKodova = data;
			
				});
			}
			else
			{
				$http.get('http://localhost:8080/PoslovnaBanka/kodoviBanke/findAll')
				.success(function(data, status, header)
				{
					$scope.listaKodova = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.swift = null;
					$scope.pibPravnogLica = null;
					$scope.nazivPravnogLica = null;
				});
			}
			
			
		}
		
		
		$scope.zoomPick = function()
		{
			kodoviBankeZoomServis.setZoom(true);
			
			if($scope.stanjeSearch)
			{
				kodoviBankeZoomServis.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				kodoviBankeZoomServis.setPretraga(false);
			}
			
			kodoviBankeZoomServis.setSifra($scope.sifraSelected);
			kodoviBankeZoomServis.setSwift($scope.swift);
			
			$state.go('pravno_lice');
		}
		
		
		
		
		
		$scope.searchPravnoLice = function()
		{
			$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/findOne', {sifra : $scope.pibPravnogLica})
			.success(function(data, header, status)
			{
				$scope.nazivPravnogLica = data[0].naziv;
			});
		}
		
	});
	
})(angular)