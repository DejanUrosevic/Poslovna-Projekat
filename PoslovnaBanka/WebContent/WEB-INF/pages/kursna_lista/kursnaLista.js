(function(angular){
	
	var kursnaListaModul = angular.module('kursnaListaEntry', []);
	
	kursnaListaModul.controller('kursnaListaCtrl', function($scope, $http, $state, $stateParams, zoomKursnaListaService)
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
		
		//ovde fali za zoom, to cu kasnije
		if(zoomKursnaListaService.getZoom())
		{
			$scope.stanjePregled = false; 
			
			
			if(zoomKursnaListaService.getPretraga())
			{
				$scope.stanjeIzmena = false;
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
				
			}
			else if(zoomKursnaListaService.getIzmena())
			{
				$scope.stanjeIzmena = true;
				$scope.stanjeSearch = false;
				$scope.stanjeAdd = false;
			}
			else
			{
				$scope.stanjeIzmena = false;
				$scope.stanjeSearch = false;
				$scope.stanjeAdd = true;
			}
			
			$scope.sifraSelected = zoomKursnaListaService.getId();
			$scope.brKursneListe = zoomKursnaListaService.getBrojKursneListe();
			$scope.primenjujeSeOd = zoomKursnaListaService.getPrimenjujeSeOd();
			
			$scope.pibBanka = zoomKursnaListaService.getSifraBanke(); 
			$scope.nazivBanke = zoomKursnaListaService.getNazivBanke();
			zoomKursnaListaService.setZoom(false);
		}
		//
		
		if(!angular.equals({}, $stateParams))
		{
			var pravnoLiceId = $stateParams.id;
			
			$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/+ ' + pravnoLiceId +'/kursne_liste')
			.success(function(data, status, header){
				$scope.listaKursa = data;
			});
		}
		else
		{
			$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/findAll')
			.success(function(data, status, header){
				$scope.listaKursa = data;
			});
		}
		
		$scope.setSelected = function(id, datum, broj_liste, primenjuje_se_od, pib, naziv_banke)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = true;
			$scope.stanjeSearch = false;
			
			
			$scope.sifraSelected = id;
			$scope.danasnjiDatum = new Date(datum);
			$scope.brKursneListe = broj_liste;
			$scope.primenjujeSeOd = new Date(primenjuje_se_od);
			$scope.pibBanka = pib;
			$scope.nazivBanke = naziv_banke;
		}
		
		$scope.levoDoKraja = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaKursa[0].id;
			$scope.danasnjiDatum = $scope.listaKursa[0].datum;
			$scope.brKursneListe = $scope.listaKursa[0].brojListe;
			$scope.primenjujeSeOd = $scope.listaKursa[0].primenjujeSeOd;
			$scope.pibBanka = $scope.listaKursa[0].pib;
			$scope.nazivBanke = $scope.listaKursa[0].nazivBanke;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaKursa[$scope.listaKursa.length - 1].id;
			$scope.danasnjiDatum = $scope.listaKursa[$scope.listaKursa.length - 1].datum;
			$scope.brKursneListe = $scope.listaKursa[$scope.listaKursa.length - 1].brojListe;
			$scope.primenjujeSeOd = $scope.listaKursa[$scope.listaKursa.length - 1].primenjujeSeOd;
			$scope.pibBanka = $scope.listaKursa[$scope.listaKursa.length - 1].pib;
			$scope.nazivBanke = $scope.listaKursa[$scope.listaKursa.length - 1].nazivBanke;
		}
		
		
		$scope.jedanLevo = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaKursa[$scope.listaKursa.length - 1].id;
				$scope.danasnjiDatum = $scope.listaKursa[$scope.listaKursa.length - 1].datum;
				$scope.brKursneListe = $scope.listaKursa[$scope.listaKursa.length - 1].brojListe;
				$scope.primenjujeSeOd = $scope.listaKursa[$scope.listaKursa.length - 1].primenjujeSeOd;
				$scope.pibBanka = $scope.listaKursa[$scope.listaKursa.length - 1].pib;
				$scope.nazivBanke = $scope.listaKursa[$scope.listaKursa.length - 1].nazivBanke;
			}
			else
			{
				for(var i=0; i<$scope.listaKursa.length; i++)
				{
					if($scope.sifraSelected === $scope.listaKursa[i].id)
					{
						if($scope.sifraSelected === $scope.listaKursa[0].id)
						{
							$scope.sifraSelected = $scope.listaKursa[$scope.listaKursa.length - 1].id;
							$scope.danasnjiDatum = $scope.listaKursa[$scope.listaKursa.length - 1].datum;
							$scope.brKursneListe = $scope.listaKursa[$scope.listaKursa.length - 1].brojListe;
							$scope.primenjujeSeOd = $scope.listaKursa[$scope.listaKursa.length - 1].primenjujeSeOd;
							$scope.pibBanka = $scope.listaKursa[$scope.listaKursa.length - 1].pib;
							$scope.nazivBanke = $scope.listaKursa[$scope.listaKursa.length - 1].nazivBanke;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaKursa[i - 1].id;
							$scope.danasnjiDatum = $scope.listaKursa[i - 1].datum;
							$scope.brKursneListe = $scope.listaKursa[i - 1].brojListe;
							$scope.primenjujeSeOd = $scope.listaKursa[i - 1].primenjujeSeOd;
							$scope.pibBanka = $scope.listaKursa[i - 1].pib;
							$scope.nazivBanke = $scope.listaKursa[i - 1].nazivBanke;
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
				$scope.sifraSelected = $scope.listaKursa[0].id;
				$scope.danasnjiDatum = $scope.listaKursa[0].datum;
				$scope.brKursneListe = $scope.listaKursa[0].brojListe;
				$scope.primenjujeSeOd = $scope.listaKursa[0].primenjujeSeOd;
				$scope.pibBanka = $scope.listaKursa[0].pib;
				$scope.nazivBanke = $scope.listaKursa[0].nazivBanke;
			}
			else
			{
				for(var i=0; i<$scope.listaKursa.length; i++)
				{
					if($scope.sifraSelected === $scope.listaKursa[i].id)
					{
						if($scope.sifraSelected === $scope.listaKursa[$scope.listaKursa.length-1].id)
						{
							$scope.sifraSelected = $scope.listaKursa[0].id;
							$scope.danasnjiDatum = $scope.listaKursa[0].datum;
							$scope.brKursneListe = $scope.listaKursa[0].brojListe;
							$scope.primenjujeSeOd = $scope.listaKursa[0].primenjujeSeOd;
							$scope.pibBanka = $scope.listaKursa[0].pib;
							$scope.nazivBanke = $scope.listaKursa[0].nazivBanke;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaKursa[i+1].id;
							$scope.danasnjiDatum = $scope.listaKursa[i+1].datum;
							$scope.brKursneListe = $scope.listaKursa[i+1].brojListe;
							$scope.primenjujeSeOd = $scope.listaKursa[i+1].primenjujeSeOd;
							$scope.pibBanka = $scope.listaKursa[i+1].pib;
							$scope.nazivBanke = $scope.listaKursa[i+1].nazivBanke;
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
			$scope.danasnjiDatum = null;
			$scope.brKursneListe = null;
			$scope.primenjujeSeOd = null;
			
			
			if(!angular.equals({}, $stateParams)){
				var drzavaId = $stateParams.id;
				
				$scope.pibBanka = drzavaId;
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/findOne',
				{sifra: drzavaId})
				.success(function(data, status, header){
					$scope.nazivBanke = data[0].naziv;
				});
			}else{
				$scope.pibBanka = null;
				$scope.nazivBanke = null;
			}
			
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
		
			$scope.sifraSelected = null;
			$scope.danasnjiDatum = null;
			$scope.brKursneListe = null;
			$scope.primenjujeSeOd = null;
			$scope.pibBanka = null;
			$scope.nazivBanke = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/kursna_lista/save',
						{sifra: $scope.sifraSelected, brojKursneListe: $scope.brKursneListe, primenjuje: $scope.primenjujeSeOd, pib: $scope.pibBanka, nazivBanke: $scope.nazivBanke})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams)){
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/'+drzavaId+'/kursne_liste')
						.success(function(data, status, header)
						{
							$scope.listaKursa = data;
							for(var i=0; i<$scope.listaKursa.length; i++)
							{
								if($scope.sifraSelected == $scope.listaKursa[i].id)
								{
									$scope.sifraSelected = $scope.listaKursa[i].id;
									break;
								}
							}
							$state.go('pravna_lica_kurs');
						});
					}else{
						$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/findAll')
						.success(function(data, status, header){
							
							$scope.listaKursa = data;
							for(var i=0; i<$scope.listaKursa.length; i++)
							{
								if($scope.sifraSelected == $scope.listaKursa[i].id)
								{
									$scope.sifraSelected = $scope.listaKursa[i].id;
									break;
								}
							}
						});
					}
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/kursna_lista/search',
						{sifra: $scope.sifraSelected, datum: $scope.danasnjiDatum, brojKursneListe: $scope.brKursneListe, primenjuje: $scope.primenjujeSeOd, pib: $scope.pibBanka, nazivBanke: $scope.nazivBanke})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams))
					{
						$scope.listaKursa = data;
						$state.go('pravna_lica_kurs');
					}
					else
					{
						$scope.listaKursa = data;
						$state.go('kursna_lista');
					}
				});
			}
			else if($scope.stanjeIzmena)
			{
				if(!angular.equals({}, $stateParams))
				{
					var drzavaId = $stateParams.id;
					
					$http.post('http://localhost:8080/PoslovnaBanka/kursna_lista/update',
							{sifra: $scope.sifraSelected, datum: $scope.danasnjiDatum, brojKursneListe: $scope.brKursneListe, primenjuje: $scope.primenjujeSeOd, pib: $scope.pibBanka, nazivBanke: $scope.nazivBanke})
					.success(function(data, status, header){
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/'+drzavaId+'/kursne_liste')
						.success(function(data, status, header)
						{
							$scope.listaKursa = data;
							$state.go('pravna_lica_kurs');
						});
					});
				}
				else
				{
					$http.post('http://localhost:8080/PoslovnaBanka/kursna_lista/update',
							{sifra: $scope.sifraSelected, datum: $scope.danasnjiDatum, brojKursneListe: $scope.brKursneListe, primenjuje: $scope.primenjujeSeOd, pib: $scope.pibBanka, nazivBanke: $scope.nazivBanke})
					.success(function(data, status, header){
						$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/findAll')
						.success(function(data, status, header)
						{
							$scope.listaKursa = data;
							$state.go('kursna_lista');
						});
					});
				}
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.refreshState = function(){
			if(!angular.equals({}, $stateParams))
			{
				var drzavaId = $stateParams.id;
				$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/'+drzavaId+'/kursne_liste')
				.success(function(data, status, header)
				{
					$scope.listaKursa = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.danasnjiDatum = null;
					$scope.brKursneListe = null;
					$scope.primenjujeSeOd = null;
					$scope.pibBanka = $scope.listaKursa[0].pib;
					$scope.nazivBanke = $scope.listaKursa[0].nazivBanke;
					
					$state.go('pravna_lica_kurs', {id: drzavaId});
				});
			}
			else
			{
				$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/findAll')
				.success(function(data, status, header)
				{
					$scope.listaKursa = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.danasnjiDatum = null;
					$scope.brKursneListe = null;
					$scope.primenjujeSeOd = null;
					$scope.pibBanka = null;
					$scope.nazivBanke = null;
				});
			}
			
		}
		
		$scope.deleteState = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/kursna_lista/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					if(!angular.equals({}, $stateParams))
					{
						var drzavaId = $stateParams.id;
						
						$http.get('http://localhost:8080/PoslovnaBanka/pravno_lice/'+drzavaId+'/kursne_liste')
						.success(function(data, status, header)
						{
							$scope.listaKursa = data;
							
							$scope.sifraSelected = null;
							$scope.danasnjiDatum = null;
							$scope.brKursneListe = null;
							$scope.primenjujeSeOd = null;
							$scope.pibBanka = null;
							$scope.nazivBanke = null;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('pravna_lica_kurs');
						});
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/findAll')
						.success(function(data, status, header){
							$scope.listaKursa = data;
							
							$scope.sifraSelected = null;
							$scope.danasnjiDatum = null;
							$scope.brKursneListe = null;
							$scope.primenjujeSeOd = null;
							$scope.pibBanka = null;
							$scope.nazivBanke = null;
							 
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('kursna_lista');
						});
					}
					
				});
			}
			else
			{
				alert('Morate izabrati naseljeno mesto za brisanje.');
			}
		}
		
		
		$scope.zoomPick = function()
		{
			zoomKursnaListaService.setZoom(true);
			
			zoomKursnaListaService.setId($scope.sifraSelected);
			zoomKursnaListaService.setBrojKursneListe($scope.brKursneListe);
			zoomKursnaListaService.setPrimenjujeSeOd($scope.primenjujeSeOd);
			
			
			if($scope.stanjeSearch)
			{
				zoomKursnaListaService.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomKursnaListaService.setPretraga(false);
			}
			else
			{
				zoomKursnaListaService.setIzmena(true);
			}
			
			$state.go('pravno_lice');
		}
		
		
		$scope.searchPL = function()
		{
			if($scope.listaKursa.length !== 0)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/pravno_lice/findOne', {sifra : $scope.pibBanka})
				.success(function(data, header, status)
				{
					$scope.nazivBanke = data[0].naziv;
				});
			}
			
		}
		
	});
	
})(angular)