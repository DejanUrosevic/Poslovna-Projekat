(function(angular){
	var racuniModul = angular.module('racuniEntry', []);
	
	racuniModul.controller('racuniCtrl', function($scope, $http, $state, $stateParams, zoomRacunFizickoService){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/racuni_klijenata/findAll')
		.success(function(data, status, header){
			$scope.listaRacuna = data;
		});
		
		if(zoomRacunFizickoService.getZoom()){
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
			
			if(zoomRacunFizickoService.getPretraga()){
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;	
			}else{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
			}
			
			$scope.jmbgKlijenta = zoomRacunFizickoService.getJmbg();
			$scope.imeKlijenta = zoomRacunFizickoService.getIme();
			$scope.prezimeKlijenta = zoomRacunFizickoService.getPrezime();
			zoomRacunFizickoService.setZoom(false);
		}
		
		$scope.setSelected = function(id, jmbg, imeKlijenta, prezimeKlijenta, valuta,
				nazivValute, pibKlijenta, nazivKlijenta, pibBanke, nazivBanke, brRacuna,
				datumOtvaranja, vazeci){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = id;
			if(jmbg != null){
				$scope.klijent = true;
				$scope.pravnoLice = false;
				$scope.jmbgKlijenta = jmbg;
				$scope.imeKlijenta = imeKlijenta;
				$scope.prezimeKlijenta = prezimeKlijenta;
			}
			
			if(pibKlijenta != null){
				$scope.klijent = false;
				$scope.pravnoLice = true;
				$scope.pibKlijenta = pibKlijenta;
				$scope.nazivKlijenta = nazivKlijenta;
			}

			$scope.idValuta = valuta;
			$scope.valuta = nazivValute;
			$scope.pibBanka = pibBanke;
			$scope.banka = nazivBanke;
			$scope.brRacuna = brRacuna;
			$scope.datumOtvaranja = new Date(datumOtvaranja);
			if(vazeci){
				$scope.validan = 'da';
			}else{
				$scope.validan = 'ne';
			}
		}
		
		$scope.refreshLica = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/racuni_klijenata/findAll')
			.success(function(data, status, header){
				$scope.listaRacuna = data;
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				
				$scope.sifraSelected = null;
				$scope.klijent = false;
				$scope.pravnoLice = false;
				$scope.jmbgKlijenta = null;
				$scope.imeKlijenta = null;
				$scope.prezimeKlijenta = null;
				$scope.pibKlijenta = null;
				$scope.nazivKlijenta = null;
				$scope.idValuta = null;
				$scope.valuta = null;
				$scope.pibBanka = null;
				$scope.banka = null;
				$scope.brRacuna = null;
				$scope.datumOtvaranja = null;
				$scope.validan = null;
			});
		}
		
		$scope.levoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaRacuna[0].id;
			if($scope.listaRacuna[0].jmbg != null){
				$scope.klijent = true;
				$scope.pravnoLice = false;
				$scope.jmbgKlijenta = $scope.listaRacuna[0].jmbg;
				$scope.imeKlijenta = $scope.listaRacuna[0].imeKlijenta;
				$scope.prezimeKlijenta = $scope.listaRacuna[0].prezimeKlijenta;
			}
			
			if($scope.listaRacuna[0].pibKlijenta != null){
				$scope.klijent = false;
				$scope.pravnoLice = true;
				$scope.pibKlijenta = $scope.listaRacuna[0].pibKlijenta;
				$scope.nazivKlijenta = $scope.listaRacuna[0].nazivKlijenta;
			}

			$scope.idValuta = $scope.listaRacuna[0].valuta;
			$scope.valuta = $scope.listaRacuna[0].nazivValute;
			$scope.pibBanka = $scope.listaRacuna[0].pibBanke;
			$scope.banka = $scope.listaRacuna[0].nazivBanke;
			$scope.brRacuna = $scope.listaRacuna[0].brRacuna;
			$scope.datumOtvaranja = new Date($scope.listaRacuna[0].datumOtvaranja);
			if($scope.listaRacuna[0].vazeci){
				$scope.validan = 'da';
			}else{
				$scope.validan = 'ne';
			}
		}
		
		$scope.desnoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaRacuna[$scope.listaRacuna.length-1].id;
			if($scope.listaRacuna[$scope.listaRacuna.length-1].jmbg != null){
				$scope.klijent = true;
				$scope.pravnoLice = false;
				$scope.jmbgKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].jmbg;
				$scope.imeKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].imeKlijenta;
				$scope.prezimeKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].prezimeKlijenta;
			}
			
			if($scope.listaRacuna[$scope.listaRacuna.length-1].pibKlijenta != null){
				$scope.klijent = false;
				$scope.pravnoLice = true;
				$scope.pibKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].pibKlijenta;
				$scope.nazivKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivKlijenta;
			}

			$scope.idValuta = $scope.listaRacuna[$scope.listaRacuna.length-1].valuta;
			$scope.valuta = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivValute;
			$scope.pibBanka = $scope.listaRacuna[$scope.listaRacuna.length-1].pibBanke;
			$scope.banka = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivBanke;
			$scope.brRacuna = $scope.listaRacuna[$scope.listaRacuna.length-1].brRacuna;
			$scope.datumOtvaranja = new Date($scope.listaRacuna[$scope.listaRacuna.length-1].datumOtvaranja);
			if($scope.listaRacuna[$scope.listaRacuna.length-1].vazeci){
				$scope.validan = 'da';
			}else{
				$scope.validan = 'ne';
			}
		}
		
		$scope.jedanLevo = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined){
				$scope.sifraSelected = $scope.listaRacuna[$scope.listaRacuna.length-1].id;
				if($scope.listaRacuna[$scope.listaRacuna.length-1].jmbg != null){
					$scope.klijent = true;
					$scope.pravnoLice = false;
					$scope.jmbgKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].jmbg;
					$scope.imeKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].imeKlijenta;
					$scope.prezimeKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].prezimeKlijenta;
				}
				
				if($scope.listaRacuna[$scope.listaRacuna.length-1].pibKlijenta != null){
					$scope.klijent = false;
					$scope.pravnoLice = true;
					$scope.pibKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].pibKlijenta;
					$scope.nazivKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivKlijenta;
				}

				$scope.idValuta = $scope.listaRacuna[$scope.listaRacuna.length-1].valuta;
				$scope.valuta = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivValute;
				$scope.pibBanka = $scope.listaRacuna[$scope.listaRacuna.length-1].pibBanke;
				$scope.banka = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivBanke;
				$scope.brRacuna = $scope.listaRacuna[$scope.listaRacuna.length-1].brRacuna;
				$scope.datumOtvaranja = new Date($scope.listaRacuna[$scope.listaRacuna.length-1].datumOtvaranja);
				if($scope.listaRacuna[$scope.listaRacuna.length-1].vazeci){
					$scope.validan = 'da';
				}else{
					$scope.validan = 'ne';
				}
			}else{
				for(var i=0; i<$scope.listaRacuna.length; i++){
					if($scope.sifraSelected == $scope.listaRacuna[i].id){
						if($scope.sifraSelected == $scope.listaRacuna[0].id){
							$scope.sifraSelected = $scope.listaRacuna[$scope.listaRacuna.length-1].id;
							if($scope.listaRacuna[$scope.listaRacuna.length-1].jmbg != null){
								$scope.klijent = true;
								$scope.pravnoLice = false;
								$scope.jmbgKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].jmbg;
								$scope.imeKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].imeKlijenta;
								$scope.prezimeKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].prezimeKlijenta;
							}
							
							if($scope.listaRacuna[$scope.listaRacuna.length-1].pibKlijenta != null){
								$scope.klijent = false;
								$scope.pravnoLice = true;
								$scope.pibKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].pibKlijenta;
								$scope.nazivKlijenta = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivKlijenta;
							}

							$scope.idValuta = $scope.listaRacuna[$scope.listaRacuna.length-1].valuta;
							$scope.valuta = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivValute;
							$scope.pibBanka = $scope.listaRacuna[$scope.listaRacuna.length-1].pibBanke;
							$scope.banka = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivBanke;
							$scope.brRacuna = $scope.listaRacuna[$scope.listaRacuna.length-1].brRacuna;
							$scope.datumOtvaranja = new Date($scope.listaRacuna[$scope.listaRacuna.length-1].datumOtvaranja);
							if($scope.listaRacuna[$scope.listaRacuna.length-1].vazeci){
								$scope.validan = 'da';
							}else{
								$scope.validan = 'ne';
							}
							break;
						}else{
							$scope.sifraSelected = $scope.listaRacuna[i-1].id;
							if($scope.listaRacuna[i-1].jmbg != null){
								$scope.klijent = true;
								$scope.pravnoLice = false;
								$scope.jmbgKlijenta = $scope.listaRacuna[i-1].jmbg;
								$scope.imeKlijenta = $scope.listaRacuna[i-1].imeKlijenta;
								$scope.prezimeKlijenta = $scope.listaRacuna[i-1].prezimeKlijenta;
							}
							
							if($scope.listaRacuna[i-1].pibKlijenta != null){
								$scope.klijent = false;
								$scope.pravnoLice = true;
								$scope.pibKlijenta = $scope.listaRacuna[i-1].pibKlijenta;
								$scope.nazivKlijenta = $scope.listaRacuna[i-1].nazivKlijenta;
							}

							$scope.idValuta = $scope.listaRacuna[i-1].valuta;
							$scope.valuta = $scope.listaRacuna[i-1].nazivValute;
							$scope.pibBanka = $scope.listaRacuna[i-1].pibBanke;
							$scope.banka = $scope.listaRacuna[i-1].nazivBanke;
							$scope.brRacuna = $scope.listaRacuna[i-1].brRacuna;
							$scope.datumOtvaranja = new Date($scope.listaRacuna[i-1].datumOtvaranja);
							if($scope.listaRacuna[i-1].vazeci){
								$scope.validan = 'da';
							}else{
								$scope.validan = 'ne';
							}
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
				$scope.sifraSelected = $scope.listaRacuna[0].id;
				if($scope.listaRacuna[0].jmbg != null){
					$scope.klijent = true;
					$scope.pravnoLice = false;
					$scope.jmbgKlijenta = $scope.listaRacuna[0].jmbg;
					$scope.imeKlijenta = $scope.listaRacuna[0].imeKlijenta;
					$scope.prezimeKlijenta = $scope.listaRacuna[0].prezimeKlijenta;
				}
				
				if($scope.listaRacuna[0].pibKlijenta != null){
					$scope.klijent = false;
					$scope.pravnoLice = true;
					$scope.pibKlijenta = $scope.listaRacuna[0].pibKlijenta;
					$scope.nazivKlijenta = $scope.listaRacuna[0].nazivKlijenta;
				}

				$scope.idValuta = $scope.listaRacuna[0].valuta;
				$scope.valuta = $scope.listaRacuna[0].nazivValute;
				$scope.pibBanka = $scope.listaRacuna[0].pibBanke;
				$scope.banka = $scope.listaRacuna[0].nazivBanke;
				$scope.brRacuna = $scope.listaRacuna[0].brRacuna;
				$scope.datumOtvaranja = new Date($scope.listaRacuna[0].datumOtvaranja);
				if($scope.listaRacuna[0].vazeci){
					$scope.validan = 'da';
				}else{
					$scope.validan = 'ne';
				}
			}else{
				for(var i=0; i<$scope.listaRacuna.length; i++){
					if($scope.sifraSelected == $scope.listaRacuna[i].id){
						if($scope.sifraSelected == $scope.listaRacuna[$scope.listaRacuna.length-1].id){
							$scope.sifraSelected = $scope.listaRacuna[0].id;
							if($scope.listaRacuna[0].jmbg != null){
								$scope.klijent = true;
								$scope.pravnoLice = false;
								$scope.jmbgKlijenta = $scope.listaRacuna[0].jmbg;
								$scope.imeKlijenta = $scope.listaRacuna[0].imeKlijenta;
								$scope.prezimeKlijenta = $scope.listaRacuna[0].prezimeKlijenta;
							}
							
							if($scope.listaRacuna[0].pibKlijenta != null){
								$scope.klijent = false;
								$scope.pravnoLice = true;
								$scope.pibKlijenta = $scope.listaRacuna[0].pibKlijenta;
								$scope.nazivKlijenta = $scope.listaRacuna[0].nazivKlijenta;
							}

							$scope.idValuta = $scope.listaRacuna[0].valuta;
							$scope.valuta = $scope.listaRacuna[0].nazivValute;
							$scope.pibBanka = $scope.listaRacuna[0].pibBanke;
							$scope.banka = $scope.listaRacuna[0].nazivBanke;
							$scope.brRacuna = $scope.listaRacuna[0].brRacuna;
							$scope.datumOtvaranja = new Date($scope.listaRacuna[0].datumOtvaranja);
							if($scope.listaRacuna[0].vazeci){
								$scope.validan = 'da';
							}else{
								$scope.validan = 'ne';
							}
							break;
						}else{
							$scope.sifraSelected = $scope.listaRacuna[i+1].id;
							if($scope.listaRacuna[i+1].jmbg != null){
								$scope.klijent = true;
								$scope.pravnoLice = false;
								$scope.jmbgKlijenta = $scope.listaRacuna[i+1].jmbg;
								$scope.imeKlijenta = $scope.listaRacuna[i+1].imeKlijenta;
								$scope.prezimeKlijenta = $scope.listaRacuna[i+1].prezimeKlijenta;
							}
							
							if($scope.listaRacuna[i+1].pibKlijenta != null){
								$scope.klijent = false;
								$scope.pravnoLice = true;
								$scope.pibKlijenta = $scope.listaRacuna[i+1].pibKlijenta;
								$scope.nazivKlijenta = $scope.listaRacuna[i+1].nazivKlijenta;
							}

							$scope.idValuta = $scope.listaRacuna[i+1].valuta;
							$scope.valuta = $scope.listaRacuna[i+1].nazivValute;
							$scope.pibBanka = $scope.listaRacuna[i+1].pibBanke;
							$scope.banka = $scope.listaRacuna[i+1].nazivBanke;
							$scope.brRacuna = $scope.listaRacuna[i+1].brRacuna;
							$scope.datumOtvaranja = new Date($scope.listaRacuna[i+1].datumOtvaranja);
							if($scope.listaRacuna[i+1].vazeci){
								$scope.validan = 'da';
							}else{
								$scope.validan = 'ne';
							}
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
			$scope.klijent = false;
			$scope.pravnoLice = false;
			$scope.jmbgKlijenta = null;
			$scope.imeKlijenta = null;
			$scope.prezimeKlijenta = null;
			$scope.pibKlijenta = null;
			$scope.nazivKlijenta = null;
			$scope.idValuta = null;
			$scope.valuta = null;
			$scope.pibBanka = null;
			$scope.banka = null;
			$scope.brRacuna = null;
			$scope.datumOtvaranja = null;
			$scope.validan = null;
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.klijent = false;
			$scope.pravnoLice = false;
			$scope.jmbgKlijenta = null;
			$scope.imeKlijenta = null;
			$scope.prezimeKlijenta = null;
			$scope.pibKlijenta = null;
			$scope.nazivKlijenta = null;
			$scope.idValuta = null;
			$scope.valuta = null;
			$scope.pibBanka = null;
			$scope.banka = null;
			$scope.brRacuna = null;
			$scope.datumOtvaranja = null;
			$scope.validan = null;
		}
		
		$scope.zoomFizickoLice = function(){
			zoomRacunFizickoService.setZoom(true);
			if($scope.stanjeSearch){
				zoomRacunFizickoService.setPretraga(true);
			}else if($scope.stanjeAdd){
				zoomRacunFizickoService.setPretraga(false);
			}
			
			$state.go('fizicko_lice');
		}
	});
})(angular)