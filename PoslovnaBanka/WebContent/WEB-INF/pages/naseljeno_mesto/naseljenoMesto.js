(function(angular){
	var naseljenoMestoModul = angular.module('naseljeEntry',[]);
	
	
	naseljenoMestoModul.controller('naseljenoMestoCtrl', function($scope, $http, $state, $stateParams, zoomService){
		
		$scope.stanjePregled = true;
	
		if(!angular.equals({}, $stateParams))
		{
			$scope.zoomIcon = false;
		}
		else
		{
			$scope.zoomIcon = true;
		}
		
		
	
		if(zoomService.getZoom())
		{
			$scope.stanjePregled = false; 
			
			
			if(zoomService.getPretraga())
			{
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
				$scope.stanjeIzmena = false;
				
			}
			else if(zoomService.getIzmena())
			{
				$scope.stanjeSearch = false;
				$scope.stanjeAdd = false;
				$scope.stanjeIzmena = true;
			}
			
			else
			{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
			}
			
			$scope.sifraSelected = zoomService.getSifra();
			$scope.nazivNaselje = zoomService.getNaziv();
			$scope.pttOznaka = zoomService.getPtt();
			
			$scope.oznakaDrzava = zoomService.getSifraDrzave();
			$scope.nazivDrzava = zoomService.getNazivDrzave();
			
			zoomService.setZoom(false);
		}
		
		if(!angular.equals({}, $stateParams)){
			var drzavaId = $stateParams.id;
			$http.get('http://localhost:8080/PoslovnaBanka/drzava/' + drzavaId + '/naseljeno_mesto')
			.success(function(data, status, header){
				$scope.listaNaselja = data;
			});
		}else{
			$http.get('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/findAll')
			.success(function(data, status, header){
				$scope.listaNaselja = data;
			});
		}
		
		$scope.setSelected = function(id, naziv, ptt_oznaka, drzava_oznaka, naziv_drzave)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = true;
			$scope.stanjeSearch = false;
			
			
			$scope.sifraSelected = id;
			$scope.nazivNaselje = naziv;
			$scope.pttOznaka = ptt_oznaka;
			$scope.oznakaDrzava = drzava_oznaka;
			$scope.nazivDrzava = naziv_drzave;
		}
		
		//implementacija gornjih funkija
		$scope.levoDoKraja = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaNaselja[0].sifra;
			$scope.nazivNaselje = $scope.listaNaselja[0].naziv;
			$scope.pttOznaka = $scope.listaNaselja[0].ptt_oznaka;	
			$scope.oznakaDrzava = $scope.listaNaselja[0].sifra_drzava;
			$scope.nazivDrzava = $scope.listaNaselja[0].naziv_drzave;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaNaselja[$scope.listaNaselja.length-1].sifra;
			$scope.nazivNaselje = $scope.listaNaselja[$scope.listaNaselja.length-1].naziv;
			$scope.pttOznaka = $scope.listaNaselja[$scope.listaNaselja.length-1].ptt_oznaka;	
			$scope.oznakaDrzava = $scope.listaNaselja[$scope.listaNaselja.length-1].sifra_drzava;
			$scope.nazivDrzava = $scope.listaNaselja[$scope.listaNaselja.length-1].naziv_drzave;
		}
		
		$scope.jedanLevo = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaNaselja[$scope.listaNaselja.length-1].sifra;
				$scope.nazivNaselje = $scope.listaNaselja[$scope.listaNaselja.length-1].naziv;
				$scope.pttOznaka = $scope.listaNaselja[$scope.listaNaselja.length-1].ptt_oznaka;	
				$scope.oznakaDrzava = $scope.listaNaselja[$scope.listaNaselja.length-1].sifra_drzava;
				$scope.nazivDrzava = $scope.listaNaselja[$scope.listaNaselja.length-1].naziv_drzave;
			}
			else
			{
				for(var i=0; i<$scope.listaNaselja.length; i++)
				{
					if($scope.sifraSelected === $scope.listaNaselja[i].sifra)
					{
						if($scope.sifraSelected === $scope.listaNaselja[0].sifra)
						{
							$scope.sifraSelected = $scope.listaNaselja[$scope.listaNaselja.length-1].sifra;
							$scope.nazivNaselje = $scope.listaNaselja[$scope.listaNaselja.length-1].naziv;
							$scope.pttOznaka = $scope.listaNaselja[$scope.listaNaselja.length-1].ptt_oznaka;	
							$scope.oznakaDrzava = $scope.listaNaselja[$scope.listaNaselja.length-1].sifra_drzava;
							$scope.nazivDrzava = $scope.listaNaselja[$scope.listaNaselja.length-1].naziv_drzave;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaNaselja[i-1].sifra;
							$scope.nazivNaselje = $scope.listaNaselja[i-1].naziv;
							$scope.pttOznaka = $scope.listaNaselja[i-1].ptt_oznaka;	
							$scope.oznakaDrzava = $scope.listaNaselja[i-1].sifra_drzava;
							$scope.nazivDrzava = $scope.listaNaselja[i-1].naziv_drzave;
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
				$scope.sifraSelected = $scope.listaNaselja[0].sifra;
				$scope.nazivNaselje = $scope.listaNaselja[0].naziv;
				$scope.pttOznaka = $scope.listaNaselja[0].ptt_oznaka;	
				$scope.oznakaDrzava = $scope.listaNaselja[0].sifra_drzava;
				$scope.nazivDrzava = $scope.listaNaselja[0].naziv_drzave;
			}
			else
			{
				for(var i=0; i<$scope.listaNaselja.length; i++)
				{
					if($scope.sifraSelected === $scope.listaNaselja[i].sifra)
					{
						if($scope.sifraSelected === $scope.listaNaselja[$scope.listaNaselja.length-1].sifra)
						{
							$scope.sifraSelected = $scope.listaNaselja[0].sifra;
							$scope.nazivNaselje = $scope.listaNaselja[0].naziv;
							$scope.pttOznaka = $scope.listaNaselja[0].ptt_oznaka;	
							$scope.oznakaDrzava = $scope.listaNaselja[0].sifra_drzava;
							$scope.nazivDrzava = $scope.listaNaselja[0].naziv_drzave; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaNaselja[i+1].sifra;
							$scope.nazivNaselje = $scope.listaNaselja[i+1].naziv;
							$scope.pttOznaka = $scope.listaNaselja[i+1].ptt_oznaka;	
							$scope.oznakaDrzava = $scope.listaNaselja[i+1].sifra_drzava;
							$scope.nazivDrzava = $scope.listaNaselja[i+1].naziv_drzave;
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
			$scope.nazivNaselje = null;
			$scope.pttOznaka = null;
			
			if(!angular.equals({}, $stateParams)){
				var drzavaId = $stateParams.id;
				$scope.oznakaDrzava = drzavaId;
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/findOne',
				{sifra: drzavaId})
				.success(function(data, status, header){
					$scope.nazivDrzava = data[0].naziv;
				});
			}else{
				$scope.oznakaDrzava = null;
				$scope.nazivDrzava = null;
			}
			
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
		
			$scope.sifraSelected = null;
			$scope.nazivNaselje = null;
			$scope.pttOznaka = null;
			$scope.oznakaDrzava = null;
			$scope.nazivDrzava = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/save',
						{sifra: $scope.sifraSelected, naziv: $scope.nazivNaselje, ptt: $scope.pttOznaka, oznakaDrzave: $scope.oznakaDrzava, nazivDrzave: $scope.nazivDrzava})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams)){
						var drzavaId = $stateParams.id;
						$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/naseljeno_mesto')
						.success(function(data, status, header)
						{
							$scope.listaNaselja = data;
							for(var i=0; i<$scope.listaNaselja.length; i++)
							{
								if($scope.sifraSelected == $scope.listaNaselja[i].sifra)
								{
									$scope.sifraSelected = $scope.listaNaselja[i].sifra;
									break;
								}
							}
							$state.go('drzava_naselje', {id: drzavaId});
						});
					}else{
						$http.get('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/findAll')
						.success(function(data, status, header){
							
							$scope.listaNaselja = data;
							for(var i=0; i<$scope.listaNaselja.length; i++)
							{
								if($scope.sifraSelected == $scope.listaNaselja[i].sifra)
								{
									$scope.sifraSelected = $scope.listaNaselja[i].sifra;
									break;
								}
							}
						});
					}
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/search',
						{sifra: $scope.sifraSelected, naziv: $scope.nazivNaselje, ptt: $scope.pttOznaka, oznakaDrzave: $scope.oznakaDrzava, nazivDrzave: $scope.nazivDrzava})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams))
					{
						$scope.listaNaselja = data;
						$state.go('drzava_naselje');
					}
					else
					{
						$scope.listaNaselja = data;
						$state.go('naseljeno_mesto');
					}
				});
			}
			else if($scope.stanjeIzmena)
			{
				if(!angular.equals({}, $stateParams))
				{
					var drzavaId = $stateParams.id;
					
					$http.post('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/update',
							{sifra: $scope.sifraSelected, naziv: $scope.nazivNaselje, ptt: $scope.pttOznaka, oznakaDrzave: $scope.oznakaDrzava, nazivDrzave: $scope.nazivDrzava})
					.success(function(data, status, header){
						$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/naseljeno_mesto')
						.success(function(data, status, header)
						{
							$scope.listaNaselja = data;
							$state.go('drzava_naselje');
						});
					});
				}
				else
				{
					$http.post('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/update',
							{sifra: $scope.sifraSelected, naziv: $scope.nazivNaselje, ptt: $scope.pttOznaka, oznakaDrzave: $scope.oznakaDrzava, nazivDrzave: $scope.nazivDrzava})
					.success(function(data, status, header){
						$http.get('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/findAll')
						.success(function(data, status, header)
						{
							$scope.listaNaselja = data;
							$state.go('naseljeno_mesto');
						});
					});
				}
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteState = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					if(!angular.equals({}, $stateParams))
					{
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/naseljeno_mesto')
						.success(function(data, status, header)
						{
							$scope.listaNaselja = data;
							
							$scope.sifraSelected = null;
							$scope.nazivNaselje = null;
							$scope.pttOznaka = null;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('drzava_naselje');
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/findAll')
						.success(function(data, status, header){
							$scope.listaNaselja = data;
							
							$scope.sifraSelected = null;
							$scope.nazivNaselje = null;
							$scope.pttOznaka = null;
							$scope.oznakaDrzava = null;
							$scope.nazivDrzava = null;
							 
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('naseljeno_mesto');
						});
					}
					
				});
			}
			else
			{
				alert('Morate izabrati naseljeno mesto za brisanje.');
			}
		}
		
		$scope.refreshState = function(){
			if(!angular.equals({}, $stateParams))
			{
				var drzavaId = $stateParams.id;
				$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/naseljeno_mesto')
				.success(function(data, status, header)
				{
					$scope.listaNaselja = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.nazivNaselje = null;
					$scope.pttOznaka = null;
					$scope.oznakaDrzava = $scope.listaNaselja[0].drzavaSifra;
					$scope.nazivDrzava = $scope.listaNaselja[0].drzavaNaziv;
					
					$state.go('drzava_naselje', {id: drzavaId});
				});
			}
			else
			{
				$http.get('http://localhost:8080/PoslovnaBanka/naseljeno_mesto/findAll')
				.success(function(data, status, header)
				{
					$scope.listaNaselja = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.nazivNaselje = null;
					$scope.pttOznaka = null;
					$scope.oznakaDrzava = null;
					$scope.nazivDrzava = null;
				});
			}
			
		}
		
		$scope.zoomPick = function()
		{
			zoomService.setZoom(true);
			
			zoomService.setSifra($scope.sifraSelected);
			zoomService.setNaziv($scope.nazivNaselje);
			zoomService.setPtt($scope.pttOznaka);
			
			if($scope.stanjeSearch)
			{
				zoomService.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomService.setPretraga(false);
			}
			else if($scope.stanjeIzmena)
			{
				zoomService.setIzmena(true);
			}
			
			$state.go('drzava');
		}
		
		$scope.searchDrzava = function()
		{
			if($scope.listaNaselja.length !== 0)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/findOne', {sifra : $scope.oznakaDrzava})
				.success(function(data, header, status)
				{
					$scope.nazivDrzava = data[0].naziv;
				});
			}
			
		}
		
	});
})(angular)
