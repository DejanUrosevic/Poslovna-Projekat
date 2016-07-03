(function(angular){
	var racuniModul = angular.module('racuniEntry', []);
	
	racuniModul.controller('racuniCtrl', function($scope, $http, $state, $stateParams, zoomRacunFizickoService, zoomRacunPravnoService, zoomRacunValutaService){
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
			
			if(zoomRacunValutaService.getIdValute() != null || zoomRacunValutaService.getIdValute() != undefined){
				$scope.idValuta = zoomRacunValutaService.getIdValute();
				$scope.valuta = zoomRacunValutaService.getNazivValute();
			}
			
			if(zoomRacunPravnoService.getIdBanke() != null || zoomRacunPravnoService.getIdBanke() != undefined){
				$scope.pibBanka = zoomRacunPravnoService.getIdBanke();
				$scope.banka = zoomRacunPravnoService.getNazivBanke();
			}
			zoomRacunPravnoService.setIdKlijenta('');
			zoomRacunPravnoService.setNazivKlijenta('');
			
			$scope.jmbgKlijenta = zoomRacunFizickoService.getJmbg();
			$scope.imeKlijenta = zoomRacunFizickoService.getIme();
			$scope.prezimeKlijenta = zoomRacunFizickoService.getPrezime();
			
			$scope.sifraSelected = zoomRacunFizickoService.getSifraSelected();
			$scope.brRacuna = zoomRacunFizickoService.getBrRacuna();
			$scope.datumOtvaranja = zoomRacunFizickoService.getDatumOtvaranja();
			$scope.validan = zoomRacunFizickoService.getValidan();
			$scope.klijent = true;
					
			zoomRacunFizickoService.setZoom(false);
		}
		
		if(zoomRacunPravnoService.getZoom()){
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
			
			if(zoomRacunPravnoService.getPretraga()){
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
			}else{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
			}
			
			if(zoomRacunPravnoService.getBanka()){
				$scope.pibBanka = zoomRacunPravnoService.getIdBanke();
				$scope.banka = zoomRacunPravnoService.getNazivBanke();
				
				if(zoomRacunValutaService.getIdValute() != null || zoomRacunValutaService.getIdValute() != undefined){
					$scope.idValuta = zoomRacunValutaService.getIdValute();
					$scope.valuta = zoomRacunValutaService.getNazivValute();
				}
				
				if(zoomRacunFizickoService.getJmbg() != null || zoomRacunFizickoService.getJmbg() != undefined){
					$scope.jmbgKlijenta = zoomRacunFizickoService.getJmbg();
					$scope.imeKlijenta = zoomRacunFizickoService.getIme();
					$scope.prezimeKlijenta = zoomRacunFizickoService.getPrezime();
				}
				
				if(zoomRacunPravnoService.getIdKlijenta() != null || zoomRacunPravnoService.getIdKlijenta() != undefined){
					$scope.pibKlijenta = zoomRacunPravnoService.getIdKlijenta();
					$scope.nazivKlijenta = zoomRacunPravnoService.getNazivKlijenta();
				}
				
				$scope.sifraSelected = zoomRacunPravnoService.getSifraSelected();
				$scope.brRacuna = zoomRacunPravnoService.getBrRacuna();
				$scope.datumOtvaranja = zoomRacunPravnoService.getDatumOtvaranja();
				$scope.validan = zoomRacunPravnoService.getValidan();
				$scope.klijent = zoomRacunPravnoService.getKlijent();
				$scope.pravnoLice = zoomRacunPravnoService.getPravnoLice();
				
			}else{
				if(zoomRacunPravnoService.getIdBanke() != null || zoomRacunPravnoService.getIdBanke() != undefined){
					$scope.pibBanka = zoomRacunPravnoService.getIdBanke();
					$scope.banka = zoomRacunPravnoService.getNazivBanke();
				}
				
				if(zoomRacunValutaService.getIdValute() != null || zoomRacunValutaService.getIdValute() != undefined){
					$scope.idValuta = zoomRacunValutaService.getIdValute();
					$scope.valuta = zoomRacunValutaService.getNazivValute();
				}
				
				$scope.sifraSelected = zoomRacunPravnoService.getSifraSelected();
				$scope.brRacuna = zoomRacunPravnoService.getBrRacuna();
				$scope.datumOtvaranja = zoomRacunPravnoService.getDatumOtvaranja();
				$scope.validan = zoomRacunPravnoService.getValidan();
				$scope.pravnoLice = true;
				
				zoomRacunFizickoService.setJmbg('');
				zoomRacunFizickoService.setIme('');
				zoomRacunFizickoService.setPrezime('');
				
				$scope.pibKlijenta = zoomRacunPravnoService.getIdKlijenta();
				$scope.nazivKlijenta = zoomRacunPravnoService.getNazivKlijenta();
			}
			
			zoomRacunPravnoService.setZoom(false);
		}
		
		if(zoomRacunValutaService.getZoom()){
			$scope.stanjePregled = false;
			
			if(zoomRacunValutaService.getPretraga()){
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
				$scope.stanjeIzmena = false;
			}else{
				$scope.stanjeSearch = false;
				$scope.stanjeAdd = true;
				$scope.stanjeIzmena = false;
			}
			
			if(zoomRacunValutaService.getIzmena()){
				$scope.stanjeSearch = false;
				$scope.stanjeAdd = false;
				$scope.stanjeIzmena = true;
			}
			
			if(!zoomRacunValutaService.getIzmena()){
				if(zoomRacunPravnoService.getIdBanke() != null || zoomRacunPravnoService.getIdBanke() != undefined){
					$scope.pibBanka = zoomRacunPravnoService.getIdBanke();
					$scope.banka = zoomRacunPravnoService.getNazivBanke();
				}
				
				if(zoomRacunPravnoService.getIdKlijenta() != null || zoomRacunPravnoService.getIdKlijenta() != undefined){
					$scope.pibKlijenta = zoomRacunPravnoService.getIdKlijenta();
					$scope.nazivKlijenta = zoomRacunPravnoService.getNazivKlijenta();
				}
				
				if(zoomRacunFizickoService.getJmbg() != null || zoomRacunFizickoService.getJmbg() != undefined){
					$scope.jmbgKlijenta = zoomRacunFizickoService.getJmbg();
					$scope.imeKlijenta = zoomRacunFizickoService.getIme();
					$scope.prezimeKlijenta = zoomRacunFizickoService.getPrezime();
				}
			}else{
				
				$scope.jmbgKlijenta = zoomRacunValutaService.getJmbgKlijenta();
				$scope.imeKlijenta = zoomRacunValutaService.getImeKlijenta();
				$scope.prezimeKlijenta = zoomRacunValutaService.getPrezimeKlijenta();
				$scope.pibKlijenta= zoomRacunValutaService.getPibKlijenta();
				$scope.nazivKlijenta = zoomRacunValutaService.getNazivKlijenta();
				$scope.pibBanka = zoomRacunValutaService.getPibBanka();
				$scope.banka = zoomRacunValutaService.getBanka();
			
			}
				
			$scope.sifraSelected = zoomRacunValutaService.getSifraSelected();
			$scope.brRacuna = zoomRacunValutaService.getBrRacuna();
			$scope.datumOtvaranja = zoomRacunValutaService.getDatumOtvaranja();
			$scope.validan = zoomRacunValutaService.getValidan();
			
			$scope.klijent = zoomRacunValutaService.getKlijent();
			$scope.pravnoLice = zoomRacunValutaService.getPravnoLice();
			
			$scope.idValuta = zoomRacunValutaService.getIdValute();
			$scope.valuta = zoomRacunValutaService.getNazivValute();
			zoomRacunValutaService.setZoom(false);
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
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/racuni_klijenata/save',
						{id: $scope.sifraSelected, jmbg: $scope.jmbgKlijenta, 
					ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta,
					pib: $scope.pibKlijenta, naziv: $scope.nazivKlijenta, 
					idValute: $scope.idValuta, valuta: $scope.valuta,
					pibBanke: $scope.pibBanka, nazivBanke: $scope.banka,
					racun: $scope.brRacuna, datum: $scope.datumOtvaranja, 
					validan: $scope.validan})
				.success(function(data, status, header)
				{
					$http.get('http://localhost:8080/PoslovnaBanka/racuni_klijenata/findAll')
					.success(function(data, status, header)
					{
						$scope.listaRacuna = data;
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = false;
						$scope.stanjePregled = true;
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
						
						zoomRacunFizickoService.setJmbg('');
						zoomRacunFizickoService.setIme('');
						zoomRacunFizickoService.setPrezime('');
						zoomRacunPravnoService.setIdKlijenta('');
						zoomRacunPravnoService.setNazivKlijenta('');
						zoomRacunPravnoService.setIdBanke('');
						zoomRacunPravnoService.setNazivBanke('');
						zoomRacunValutaService.setIdValute('');
						zoomRacunValutaService.setNazivValute('');
						$state.go('racuni_klijenata');
					});
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/racuni_klijenata/search',
						{id: $scope.sifraSelected, jmbg: $scope.jmbgKlijenta, 
					ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta,
					pib: $scope.pibKlijenta, naziv: $scope.nazivKlijenta, 
					idValute: $scope.idValuta, valuta: $scope.valuta,
					pibBanke: $scope.pibBanka, nazivBanke: $scope.banka,
					racun: $scope.brRacuna, datum: $scope.datumOtvaranja, 
					validan: $scope.validan})
				.success(function(data, status, header){
					$scope.listaRacuna = data;
					$state.go('racuni_klijenata');
				});
			}
			else if($scope.stanjeIzmena)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/racuni_klijenata/update',
						{id: $scope.sifraSelected, jmbg: $scope.jmbgKlijenta, 
					ime: $scope.imeKlijenta, prezime: $scope.prezimeKlijenta,
					pib: $scope.pibKlijenta, naziv: $scope.nazivKlijenta, 
					idValute: $scope.idValuta, valuta: $scope.valuta,
					pibBanke: $scope.pibBanka, nazivBanke: $scope.banka,
					racun: $scope.brRacuna, datum: $scope.datumOtvaranja, 
					validan: $scope.validan})
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/racuni_klijenata/findAll')
					.success(function(data, status, header)
					{
						$scope.listaRacuna = data;
						$state.go('racuni_klijenata');
					});
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.zoomFizickoLice = function(){
			zoomRacunFizickoService.setZoom(true);
			
			if($scope.stanjeSearch){
				zoomRacunFizickoService.setPretraga(true);
			}else if($scope.stanjeAdd){
				zoomRacunFizickoService.setPretraga(false);
			}
			
			zoomRacunFizickoService.setSifraSelected($scope.sifraSelected);
			zoomRacunFizickoService.setDatumOtvaranja($scope.datumOtvaranja);
			zoomRacunFizickoService.setValidan($scope.validan);
			zoomRacunFizickoService.setKlijent($scope.klijent);
			zoomRacunFizickoService.setPravnoLice($scope.pravnoLice);
			zoomRacunFizickoService.setIdValute($scope.idValuta);
			zoomRacunFizickoService.setNazivValute($scope.valuta);
			
			$state.go('fizicko_lice');
		}
		
		$scope.zoomPravnoLice = function(){
			zoomRacunPravnoService.setZoom(true);
			zoomRacunPravnoService.setBanka(false);
			
			if($scope.stanjeSearch){
				zoomRacunPravnoService.setPretraga(true);
			}else if($scope.stanjeAdd){
				zoomRacunPravnoService.setPretraga(false);
			}
			
			zoomRacunPravnoService.setSifraSelected($scope.sifraSelected);

			zoomRacunPravnoService.setBrRacuna($scope.brRacuna);
			zoomRacunPravnoService.setDatumOtvaranja($scope.datumOtvaranja);
			zoomRacunPravnoService.setValidan($scope.validan);
			zoomRacunPravnoService.setKlijent($scope.klijent);
			zoomRacunPravnoService.setPravnoLice($scope.pravnoLice);
			
			$state.go('pravno_lice');
		}
		
		$scope.zoomBanka = function(){
			zoomRacunPravnoService.setZoom(true);
			zoomRacunPravnoService.setBanka(true);
			
			if($scope.stanjeSearch){
				zoomRacunPravnoService.setPretraga(true);
			}else if($scope.stanjeAdd){
				zoomRacunPravnoService.setPretraga(false);
			}
			
			zoomRacunPravnoService.setSifraSelected($scope.sifraSelected);
			zoomRacunPravnoService.setBrRacuna($scope.brRacuna);
			zoomRacunPravnoService.setDatumOtvaranja($scope.datumOtvaranja);
			zoomRacunPravnoService.setValidan($scope.validan);
			zoomRacunPravnoService.setKlijent($scope.klijent);
			zoomRacunPravnoService.setPravnoLice($scope.pravnoLice);
			
			$state.go('pravno_lice');
		}
		
		$scope.zoomValuta = function(){
			zoomRacunValutaService.setZoom(true);
			
			if($scope.stanjeSearch){
				zoomRacunValutaService.setPretraga(true);
				zoomRacunValutaService.setIzmena(false);
			}else if($scope.stanjeAdd){
				zoomRacunValutaService.setPretraga(false);
				zoomRacunValutaService.setIzmena(false);
			}else if($scope.stanjeIzmena){
				zoomRacunValutaService.setPretraga(false);
				zoomRacunValutaService.setIzmena(true);
				
				zoomRacunValutaService.setSifraSelected($scope.sifraSelected);
				zoomRacunValutaService.setJmbgKlijenta($scope.jmbgKlijenta);
				zoomRacunValutaService.setImeKlijenta($scope.imeKlijenta);
				zoomRacunValutaService.setPrezimeKlijenta($scope.prezimeKlijenta);
				zoomRacunValutaService.setPibKlijenta($scope.pibKlijenta);
				zoomRacunValutaService.setNazivKlijenta($scope.nazivKlijenta);
				zoomRacunValutaService.setPibBanka($scope.pibBanka);
				zoomRacunValutaService.setBanka($scope.banka);
				zoomRacunValutaService.setBrRacuna($scope.brRacuna);
				zoomRacunValutaService.setDatumOtvaranja($scope.datumOtvaranja);
				zoomRacunValutaService.setValidan($scope.validan);
				zoomRacunValutaService.setKlijent($scope.klijent);
				zoomRacunValutaService.setPravnoLice($scope.pravnoLice);
			}
		
			zoomRacunValutaService.setSifraSelected($scope.sifraSelected);
			zoomRacunValutaService.setBrRacuna($scope.brRacuna);
			zoomRacunValutaService.setDatumOtvaranja($scope.datumOtvaranja);
			zoomRacunValutaService.setValidan($scope.validan);
			zoomRacunValutaService.setKlijent($scope.klijent);
			zoomRacunValutaService.setPravnoLice($scope.pravnoLice);
			
			$state.go('valute');
		}
		
		$scope.deleteLice = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/racuni_klijenata/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/racuni_klijenata/findAll')
					.success(function(data, status, header){
						$scope.listaRacuna = data;
							
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = false;
						$scope.stanjePregled = true;
							
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
							
						$state.go('racuni_klijenata');
					});				
				});
			}
			else
			{
				alert('Morate izabrati pravno lice za brisanje.');
			}
		}
		
	});
})(angular)