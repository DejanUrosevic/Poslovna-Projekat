(function(angular){
	
	var valuteModul = angular.module('valuteEntry', []);
	
	
	valuteModul.controller('valuteCtrl', function($scope, $http, $state, $stateParams, $location, zoomValuteService, zoomRacunValutaService, zoomKursUValutiService)
	{
		$scope.stanjePregled = true;
		$scope.zoomRacuni = zoomRacunValutaService.getZoom();
		if(zoomKursUValutiService.getZoom())
		{
			$scope.zoom = zoomKursUValutiService.getZoom();
		}
		//postavljanje default vrednosti za option tag domicilna
		$scope.domicilnaType = [
		    { name: 'Domaca', value: 'true' }, 
		    { name: 'Strana', value: 'false' }                  
		];
		
		
		
		if(!angular.equals({}, $stateParams))
		{
			$scope.zoomIcon = false;
		}
		else
		{
			$scope.zoomIcon = true;
		}
		
		
		
		if(zoomValuteService.getZoom())
		{
			$scope.stanjePregled = false; 
			$scope.stanjeIzmena = false;
			
			if(zoomValuteService.getPretraga())
			{
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
				
			}
			else
			{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
			}
			
			$scope.sifraSelected = zoomValuteService.getIdValute();
			$scope.naziv = zoomValuteService.getNaziv();
			$scope.zvanicnaSifra = zoomValuteService.getZvanicnaSifra();
			$scope.izmenaDomicilna = zoomValuteService.getDomicilna();
			$scope.sifraDrzava = zoomValuteService.getSifraDrzave();
			$scope.nazivDrzava = zoomValuteService.getNazivDrzave();
			zoomValuteService.setZoom(false);
		}
		
		
		
		
		if(!angular.equals({}, $stateParams))
		{
			var drzavaId = $stateParams.id;
			$http.get('http://localhost:8080/PoslovnaBanka/drzava/' + drzavaId + '/valute')
			.success(function(data, status, header)
			{
				$scope.listaValuta = data;
			});
		}
		else
		{
			$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
			.success(function(data, status, header)
			{
				$scope.listaValuta = data;
			});
		}
		
		
		//funkcija koja podesava koji ce biti selektovani red
		$scope.setSelected = function(id, zvanicnaSifra, naziv, domicilna, drzSifra, drzNaziv)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			
			
			$scope.sifraSelected = id;
			$scope.zvanicnaSifra = zvanicnaSifra;
			$scope.naziv = naziv;
			$scope.domicilna = domicilna;
			$scope.sifraDrzava = drzSifra;
			$scope.nazivDrzava = drzNaziv;
			
			//postavljanje default vrednosti za domicilna
			for(var i=0; i<$scope.domicilnaType.length; i++)
			{
				if($scope.domicilnaType[i].value == domicilna.toString())
				{
					$scope.izmenaDomicilna = $scope.domicilnaType[i].value;
					break;
				}
			}
		}
		
		//refresovanje liste drzava
		$scope.refreshState = function(){
			
			if(!angular.equals({}, $stateParams))
			{
				var drzavaId = $stateParams.id;
				$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/valute')
				.success(function(data, status, header)
				{
					$scope.listaValuta = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.zvanicnaSifra = null;
					$scope.naziv = null;
					$scope.izmenaDomicilna = null;
					$scope.sifraDrzava = $scope.listaValuta[0].drzavaSifra;
					$scope.nazivDrzava = $scope.listaValuta[0].drzavaNaziv;
				});
			}
			else
			{
				$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
				.success(function(data, status, header)
				{
					$scope.listaValuta = data;
					
					$scope.sifraSelected = null;
					$scope.zvanicnaSifra = null;
					$scope.naziv = null;
					$scope.izmenaDomicilna = null;
					$scope.sifraDrzava = null;
					$scope.nazivDrzava = null;
				});
			}
		}
		
		
		$scope.stanjeDodavanje = function()
		{
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.zvanicnaSifra = null;
			$scope.naziv = null;
			$scope.izmenaDomicilna = null;
			
			if(!angular.equals({}, $stateParams)){
				var drzavaId = $stateParams.id;
				$scope.sifraDrzava = drzavaId;
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/findOne',
				{sifra: drzavaId})
				.success(function(data, status, header){
					$scope.nazivDrzava = data[0].naziv;
				});
			}else{
				$scope.sifraDrzava = null;
				$scope.nazivDrzava = null;
			}
		}
		
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.zvanicnaSifra = null;
			$scope.naziv = null;
			$scope.izmenaDomicilna = null;
			
			if(!angular.equals({}, $stateParams)){
				var drzavaId = $stateParams.id;
				$scope.sifraDrzava = drzavaId;
				$http.post('http://localhost:8080/PoslovnaBanka/drzava/findOne',
				{sifra: drzavaId})
				.success(function(data, status, header){
					$scope.nazivDrzava = data[0].naziv;
				});
			}else{
				$scope.sifraDrzava = null;
				$scope.nazivDrzava = null;
			}
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				if($scope.izmenaDomicilna === '' || $scope.izmenaDomicilna === undefined || $scope.izmenaDomicilna === null)
				{
					alert('Izaberite da li je valuta strana ili domaca.');
				}
				
				$http.post('http://localhost:8080/PoslovnaBanka/valute/save',
						{sifra: $scope.sifraSelected, zvanicnaSifra: $scope.zvanicnaSifra, naziv: $scope.naziv, domicilna: $scope.izmenaDomicilna, sifraDrzava: $scope.sifraDrzava, nazivDrzava: $scope.nazivDrzava})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams)){
						var drzavaId = $stateParams.id;
						$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/valute')
						.success(function(data, status, header)
						{
							$scope.listaValuta = data;
							for(var i=0; i<$scope.listaValuta.length; i++)
							{
								if($scope.sifraSelected == $scope.listaValuta[i].idvalute)
								{
									$scope.sifraSelected = $scope.listaValuta[i].idvalute;
									break;
								}
							}
							$state.go('valute_drzava', {id: drzavaId});
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
						.success(function(data, status, header)
						{	
							$scope.listaValuta = data;
							for(var i=0; i<$scope.listaValuta.length; i++)
							{
								if($scope.sifraSelected == $scope.listaValuta[i].idvalute)
								{
									$scope.sifraSelected = $scope.listaValuta[i].idvalute;
									break;
								}
							}
							$state.go('valute');
						});
						
					}
				});	
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/valute/search',
						{sifra: $scope.sifraSelected, zvanicnaSifra: $scope.zvanicnaSifra, naziv: $scope.naziv, domicilna: $scope.izmenaDomicilna, sifraDrzava: $scope.sifraDrzava, nazivDrzava: $scope.nazivDrzava})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams))
					{
						$scope.listaValuta = data;
						$state.go('valute_drzava');
					}
					else
					{
						$scope.listaValuta = data;
						$state.go('valute');
					}
					
				});
			}
			else if($scope.stanjeIzmena)
			{
				if($scope.izmenaDomicilna === '' || $scope.izmenaDomicilna === undefined || $scope.izmenaDomicilna === null)
				{
					alert('Izaberite da li je valuta strana ili domaca.');
				}
				
				$http.post('http://localhost:8080/PoslovnaBanka/valute/update',
						{sifra: $scope.sifraSelected, zvanicnaSifra: $scope.zvanicnaSifra, naziv: $scope.naziv, domicilna: $scope.izmenaDomicilna, sifraDrzava: $scope.sifraDrzava, nazivDrzava: $scope.nazivDrzava})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams))
					{
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/valute')
						.success(function(data, status, header)
						{
							$scope.listaValuta = data;
							$state.go('valute_drzava');
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
						.success(function(data, status, header)
						{
							$scope.listaValuta = data;
							$state.go('valute');
						});
					}
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		
		
		//implementacija gornjih funkija
		$scope.levoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaValuta[0].idvalute;
			$scope.zvanicnaSifra = $scope.listaValuta[0].zvanicnaSifra;
			$scope.naziv = $scope.listaValuta[0].naziv;
			$scope.domicilna = $scope.listaValuta[0].domicilna;
			$scope.sifraDrzava = $scope.listaValuta[0].drzavaSifra;
			$scope.nazivDrzava = $scope.listaValuta[0].drzavaNaziv;
		}
		
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaValuta[$scope.listaValuta.length-1].idvalute;
			$scope.zvanicnaSifra = $scope.listaValuta[$scope.listaValuta.length-1].zvanicnaSifra;
			$scope.naziv = $scope.listaValuta[$scope.listaValuta.length-1].naziv;
			$scope.domicilna = $scope.listaValuta[$scope.listaValuta.length-1].domicilna;
			$scope.sifraDrzava = $scope.listaValuta[$scope.listaValuta.length-1].drzavaSifra;
			$scope.nazivDrzava = $scope.listaValuta[$scope.listaValuta.length-1].drzavaNaziv;
		}
		
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaValuta[$scope.listaValuta.length-1].idvalute;
				$scope.zvanicnaSifra = $scope.listaValuta[$scope.listaValuta.length-1].zvanicnaSifra;
				$scope.naziv = $scope.listaValuta[$scope.listaValuta.length-1].naziv;
				$scope.domicilna = $scope.listaValuta[$scope.listaValuta.length-1].domicilna;
				$scope.sifraDrzava = $scope.listaValuta[$scope.listaValuta.length-1].drzavaSifra;
				$scope.nazivDrzava = $scope.listaValuta[$scope.listaValuta.length-1].drzavaNaziv;
			}
			else
			{
				for(var i=0; i<$scope.listaValuta.length; i++)
				{
					if($scope.sifraSelected === $scope.listaValuta[i].idvalute)
					{
						if($scope.sifraSelected === $scope.listaValuta[0].idvalute)
						{
							$scope.sifraSelected = $scope.listaValuta[$scope.listaValuta.length-1].idvalute;
							$scope.zvanicnaSifra = $scope.listaValuta[$scope.listaValuta.length-1].zvanicnaSifra;
							$scope.naziv = $scope.listaValuta[$scope.listaValuta.length-1].naziv;
							$scope.domicilna = $scope.listaValuta[$scope.listaValuta.length-1].domicilna;
							$scope.sifraDrzava = $scope.listaValuta[$scope.listaValuta.length-1].drzavaSifra;
							$scope.nazivDrzava = $scope.listaValuta[$scope.listaValuta.length-1].drzavaNaziv; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaValuta[i-1].idvalute;
							$scope.zvanicnaSifra = $scope.listaValuta[i-1].zvanicnaSifra;
							$scope.naziv = $scope.listaValuta[i-1].naziv;
							$scope.domicilna = $scope.listaValuta[i-1].domicilna;
							$scope.sifraDrzava = $scope.listaValuta[i-1].drzavaSifra;
							$scope.nazivDrzava = $scope.listaValuta[i-1].drzavaNaziv;
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
				$scope.sifraSelected = $scope.listaValuta[0].idvalute;
				$scope.zvanicnaSifra = $scope.listaValuta[0].zvanicnaSifra;
				$scope.naziv = $scope.listaValuta[0].naziv;
				$scope.domicilna = $scope.listaValuta[0].domicilna;
				$scope.sifraDrzava = $scope.listaValuta[0].drzavaSifra;
				$scope.nazivDrzava = $scope.listaValuta[0].drzavaNaziv; 
			}
			else
			{
				for(var i=0; i<$scope.listaValuta.length; i++)
				{
					if($scope.sifraSelected === $scope.listaValuta[i].idvalute)
					{
						if($scope.sifraSelected === $scope.listaValuta[$scope.listaValuta.length-1].idvalute)
						{
							$scope.sifraSelected = $scope.listaValuta[0].idvalute;
							$scope.zvanicnaSifra = $scope.listaValuta[0].zvanicnaSifra;
							$scope.naziv = $scope.listaValuta[0].naziv;
							$scope.domicilna = $scope.listaValuta[0].domicilna;
							$scope.sifraDrzava = $scope.listaValuta[0].drzavaSifra;
							$scope.nazivDrzava = $scope.listaValuta[0].drzavaNaziv; 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaValuta[i+1].idvalute;
							$scope.zvanicnaSifra = $scope.listaValuta[i+1].zvanicnaSifra;
							$scope.naziv = $scope.listaValuta[i+1].naziv;
							$scope.domicilna = $scope.listaValuta[i+1].domicilna;
							$scope.sifraDrzava = $scope.listaValuta[i+1].drzavaSifra;
							$scope.nazivDrzava = $scope.listaValuta[i+1].drzavaNaziv;
							break;	
						}
					}
				}
			}
		}
		
		
		$scope.deleteState = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/valute/delete/' + $scope.sifraSelected)
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams))
					{
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/drzava/'+drzavaId+'/valute')
						.success(function(data, status, header)
						{
							$scope.listaValuta = data;
							
							$scope.sifraSelected = null;
							$scope.zvanicnaSifra = null;
							$scope.naziv = null;
							$scope.domicilna = null;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('valute_drzava');
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
						.success(function(data, status, header){
							
							$scope.listaValuta = data;
							
							$scope.sifraSelected = null;
							$scope.zvanicnaSifra = null;
							$scope.naziv = null;
							$scope.domicilna = null;
							$scope.sifraDrzava = null;
							$scope.nazivDrzava = null;
							
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('valute');
						});
					}
				
				});
			}
			else
			{
				alert('Morate izabrati valutu za brisanje.');
			}
		}
		
		$scope.zoomPick = function()
		{
			zoomValuteService.setZoom(true);
			
			zoomValuteService.setIdValute($scope.sifraSelected);
			zoomValuteService.setNaziv($scope.naziv);
			zoomValuteService.setZvanicnaSifra($scope.zvanicnaSifra);
			zoomValuteService.setDomicilna($scope.izmenaDomicilna);
			
			if($scope.stanjeSearch)
			{
				zoomValuteService.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomValuteService.setPretraga(false);
			}
			
			$state.go('drzava');
		}
		
		$scope.searchDrzava = function()
		{
			$http.post('http://localhost:8080/PoslovnaBanka/drzava/findOne', {sifra : $scope.sifraDrzava})
			.success(function(data, header, status)
			{
				$scope.nazivDrzava = data[0].naziv;
			});
		}
		
		$scope.zoomPickup = function(){
			if(zoomRacunValutaService.getZoom()){
				zoomRacunValutaService.setIdValute($scope.sifraSelected);
				zoomRacunValutaService.setNazivValute($scope.naziv);
				$state.go('racuni_klijenata');
			}
			else if(zoomKursUValutiService.getZoom())
			{
				if(zoomKursUValutiService.getIzZooma())
				{
					if(zoomKursUValutiService.getOsnovna())
					{
						zoomKursUValutiService.setIdOsnovneValute($scope.sifraSelected);
						zoomKursUValutiService.setNazivOsnovneValute($scope.naziv);
						
						$state.go('kursna_lista_kursa_u_valuti', {id: zoomKursUValutiService.getIdKursneListe()});
						
					}
					else if(zoomKursUValutiService.getPrema())
					{
						zoomKursUValutiService.setIdPremaValuti($scope.sifraSelected);
						zoomKursUValutiService.setNazivPremaValuti($scope.naziv);
						
						$state.go('kursna_lista_kursa_u_valuti', {id: zoomKursUValutiService.getIdKursneListe()});
						
					}
				}
				else if(zoomKursUValutiService.getOsnovna())
				{
					zoomKursUValutiService.setIdOsnovneValute($scope.sifraSelected);
					zoomKursUValutiService.setNazivOsnovneValute($scope.naziv);
					
					$state.go('kurs_u_valuti');
				}
				else if(zoomKursUValutiService.getPrema())
				{
					zoomKursUValutiService.setIdPremaValuti($scope.sifraSelected);
					zoomKursUValutiService.setNazivPremaValuti($scope.naziv);
					
					$state.go('kurs_u_valuti');
				}
			}
		}
		
		
	});
	
})(angular)