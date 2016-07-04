(function(angular){
	var kursUValutiModul = angular.module('kursUValutiEntry',[]);
	
	kursUValutiModul.controller('kursUValutiCtrl', function($scope, $http, $state, $stateParams, $location, zoomKursUValutiService)
	{
		
		$scope.stanjePregled = true;
		$scope.zoomIcon = true;
		//ovo sluzi da se lakse odredi iz koje tabele se doslo na ovu stranicu
		var url = $location.absUrl().split('?')[0]
		
		
		if(!angular.equals({}, $stateParams))
		{
			if(url.indexOf('kursna_lista') !== -1)
			{
				$scope.zoomIcon = false;
			}
		}
		else
		{
			$scope.zoomIcon = true;
		}
		
		
		// ovde ide za zoom, kasnije cu to.
		if(zoomKursUValutiService.getZoom())
		{
			$scope.stanjePregled = false; 
			$scope.stanjeIzmena = false;
			
			if(zoomKursUValutiService.getPretraga())
			{
				$scope.stanjeSearch = true;
				$scope.stanjeAdd = false;
			}
			else
			{
				$scope.stanjeAdd = true;
				$scope.stanjeSearch = false;
			}
			
			$scope.sifraSelected = zoomKursUValutiService.getRedniBroj();
			$scope.idKursneListe = zoomKursUValutiService.getIdKursneListe();
			$scope.primenjujeSeOd = new Date(zoomKursUValutiService.getPrimenjujeSeOd());
			$scope.idOsnovneValute = zoomKursUValutiService.getIdOsnovneValute();
			$scope.nazivOsnovneValute = zoomKursUValutiService.getNazivOsnovneValute();
			$scope.idPremaValute = zoomKursUValutiService.getIdPremaValuti();
			$scope.nazivPremaValute = zoomKursUValutiService.getNazivPremaValuti();
			$scope.kupovni = zoomKursUValutiService.getKupovni();
			$scope.srednji = zoomKursUValutiService.getSrednji();
			$scope.prodajni = zoomKursUValutiService.getProdajni();
			
			zoomKursUValutiService.setOsnovna(false);
			zoomKursUValutiService.setPrema(false);
			zoomKursUValutiService.setZoom(false);
		}
		//
		
		if(!angular.equals({}, $stateParams)){

			if(url.indexOf('kursna_lista') !== -1)
			{
				var drzavaId = $stateParams.id;
				$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/' + drzavaId + '/kursevi_u_valuti')
				.success(function(data, status, header){
					$scope.listaKursa = data;
				});
			}
			else if(url.indexOf('valuta') !== -1)
			{
				var drzavaId = $stateParams.id;
				$http.get('http://localhost:8080/PoslovnaBanka/valute/' + drzavaId + '/kursevi_u_valuti')
				.success(function(data, status, header){
					$scope.listaKursa = data;
				});
			}
			
		}else{
			$http.get('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/findAll')
			.success(function(data, status, header){
				
				$scope.listaKursa = data;
			});
		}
		
		$scope.setSelected = function(redniBroj, idKursneListe, primenjujeSeOd, idOsnovneValute, nazivOsnovneValute, idPremaValute, nazivPremaValute, kupovni, srednji, prodajni)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = true;
			$scope.stanjeSearch = false;
			
			
			$scope.sifraSelected = redniBroj;
			$scope.idKursneListe = idKursneListe;
			$scope.primenjujeSeOd = new Date(primenjujeSeOd);
			$scope.idOsnovneValute = idOsnovneValute;
			$scope.nazivOsnovneValute = nazivOsnovneValute;
			$scope.idPremaValute = idPremaValute;
			$scope.nazivPremaValute = nazivPremaValute;
			$scope.kupovni = kupovni;
			$scope.srednji = srednji;
			$scope.prodajni = prodajni;
		}
		
		$scope.levoDoKraja = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaKursa[0].redniBroj;
			$scope.idKursneListe = $scope.listaKursa[0].idKursneListe;
			$scope.primenjujeSeOd = new Date($scope.listaKursa[0].primenjujeSeOd);
			$scope.idOsnovneValute = $scope.listaKursa[0].idOsnovneValute;
			$scope.nazivOsnovneValute = $scope.listaKursa[0].nazivOsnovneValute;
			$scope.idPremaValute = $scope.listaKursa[0].idPremaValuti;
			$scope.nazivPremaValute = $scope.listaKursa[0].nazivPremaValuti;
			$scope.kupovni = $scope.listaKursa[0].kupovni;
			$scope.srednji = $scope.listaKursa[0].srednji;
			$scope.prodajni = $scope.listaKursa[0].prodajni;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.listaKursa[$scope.listaKursa.length - 1].redniBroj;
			$scope.idKursneListe = $scope.listaKursa[$scope.listaKursa.length - 1].idKursneListe;
			$scope.primenjujeSeOd = new Date($scope.listaKursa[$scope.listaKursa.length - 1].primenjujeSeOd);
			$scope.idOsnovneValute = $scope.listaKursa[$scope.listaKursa.length - 1].idOsnovneValute;
			$scope.nazivOsnovneValute = $scope.listaKursa[$scope.listaKursa.length - 1].nazivOsnovneValute;
			$scope.idPremaValute = $scope.listaKursa[$scope.listaKursa.length - 1].idPremaValuti;
			$scope.nazivPremaValute = $scope.listaKursa[$scope.listaKursa.length - 1].nazivPremaValuti;
			$scope.kupovni = $scope.listaKursa[$scope.listaKursa.length - 1].kupovni;
			$scope.srednji = $scope.listaKursa[$scope.listaKursa.length - 1].srednji;
			$scope.prodajni = $scope.listaKursa[$scope.listaKursa.length - 1].prodajni;
		}
		
		$scope.jedanLevo = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaKursa[$scope.listaKursa.length - 1].redniBroj;
				$scope.idKursneListe = $scope.listaKursa[$scope.listaKursa.length - 1].idKursneListe;
				$scope.primenjujeSeOd = new Date($scope.listaKursa[$scope.listaKursa.length - 1].primenjujeSeOd);
				$scope.idOsnovneValute = $scope.listaKursa[$scope.listaKursa.length - 1].idOsnovneValute;
				$scope.nazivOsnovneValute = $scope.listaKursa[$scope.listaKursa.length - 1].nazivOsnovneValute;
				$scope.idPremaValute = $scope.listaKursa[$scope.listaKursa.length - 1].idPremaValuti;
				$scope.nazivPremaValute = $scope.listaKursa[$scope.listaKursa.length - 1].nazivPremaValuti;
				$scope.kupovni = $scope.listaKursa[$scope.listaKursa.length - 1].kupovni;
				$scope.srednji = $scope.listaKursa[$scope.listaKursa.length - 1].srednji;
				$scope.prodajni = $scope.listaKursa[$scope.listaKursa.length - 1].prodajni;
			}
			else
			{
				for(var i=0; i< $scope.listaKursa.length; i++)
				{
					if($scope.sifraSelected ===  $scope.listaKursa[i].redniBroj)
					{
						if($scope.sifraSelected ===  $scope.listaKursa[0].redniBroj)
						{
							$scope.sifraSelected = $scope.listaKursa[$scope.listaKursa.length - 1].redniBroj;
							$scope.idKursneListe = $scope.listaKursa[$scope.listaKursa.length - 1].idKursneListe;
							$scope.primenjujeSeOd = new Date($scope.listaKursa[$scope.listaKursa.length - 1].primenjujeSeOd);
							$scope.idOsnovneValute = $scope.listaKursa[$scope.listaKursa.length - 1].idOsnovneValute;
							$scope.nazivOsnovneValute = $scope.listaKursa[$scope.listaKursa.length - 1].nazivOsnovneValute;
							$scope.idPremaValute = $scope.listaKursa[$scope.listaKursa.length - 1].idPremaValuti;
							$scope.nazivPremaValute = $scope.listaKursa[$scope.listaKursa.length - 1].nazivPremaValuti;
							$scope.kupovni = $scope.listaKursa[$scope.listaKursa.length - 1].kupovni;
							$scope.srednji = $scope.listaKursa[$scope.listaKursa.length - 1].srednji;
							$scope.prodajni = $scope.listaKursa[$scope.listaKursa.length - 1].prodajni;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaKursa[i-1].redniBroj;
							$scope.idKursneListe = $scope.listaKursa[i-1].idKursneListe;
							$scope.primenjujeSeOd = new Date($scope.listaKursa[i-1].primenjujeSeOd);
							$scope.idOsnovneValute = $scope.listaKursa[i-1].idOsnovneValute;
							$scope.nazivOsnovneValute = $scope.listaKursa[i-1].nazivOsnovneValute;
							$scope.idPremaValute = $scope.listaKursa[i-1].idPremaValuti;
							$scope.nazivPremaValute = $scope.listaKursa[i-1].nazivPremaValuti;
							$scope.kupovni = $scope.listaKursa[i-1].kupovni;
							$scope.srednji = $scope.listaKursa[i-1].srednji;
							$scope.prodajni = $scope.listaKursa[i-1].prodajni;
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
				$scope.sifraSelected = $scope.listaKursa[0].redniBroj;
				$scope.idKursneListe = $scope.listaKursa[0].idKursneListe;
				$scope.primenjujeSeOd = new Date($scope.listaKursa[0].primenjujeSeOd);
				$scope.idOsnovneValute = $scope.listaKursa[0].idOsnovneValute;
				$scope.nazivOsnovneValute = $scope.listaKursa[0].nazivOsnovneValute;
				$scope.idPremaValute = $scope.listaKursa[0].idPremaValuti;
				$scope.nazivPremaValute = $scope.listaKursa[0].nazivPremaValuti;
				$scope.kupovni = $scope.listaKursa[0].kupovni;
				$scope.srednji = $scope.listaKursa[0].srednji;
				$scope.prodajni = $scope.listaKursa[0].prodajni;
			}
			else
			{
				for(var i=0; i<$scope.listaKursa.length; i++)
				{
					if($scope.sifraSelected === $scope.listaKursa[i].redniBroj)
					{
						if($scope.sifraSelected === $scope.listaKursa[$scope.listaKursa.length-1].redniBroj)
						{
							$scope.sifraSelected = $scope.listaKursa[0].redniBroj;
							$scope.idKursneListe = $scope.listaKursa[0].idKursneListe;
							$scope.primenjujeSeOd = new Date($scope.listaKursa[0].primenjujeSeOd);
							$scope.idOsnovneValute = $scope.listaKursa[0].idOsnovneValute;
							$scope.nazivOsnovneValute = $scope.listaKursa[0].nazivOsnovneValute;
							$scope.idPremaValute = $scope.listaKursa[0].idPremaValuti;
							$scope.nazivPremaValute = $scope.listaKursa[0].nazivPremaValuti;
							$scope.kupovni = $scope.listaKursa[0].kupovni;
							$scope.srednji = $scope.listaKursa[0].srednji;
							$scope.prodajni = $scope.listaKursa[0].prodajni;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaKursa[i+1].redniBroj;
							$scope.idKursneListe = $scope.listaKursa[i+1].idKursneListe;
							$scope.primenjujeSeOd = new Date($scope.listaKursa[i+1].primenjujeSeOd);
							$scope.idOsnovneValute = $scope.listaKursa[i+1].idOsnovneValute;
							$scope.nazivOsnovneValute = $scope.listaKursa[i+1].nazivOsnovneValute;
							$scope.idPremaValute = $scope.listaKursa[i+1].idPremaValuti;
							$scope.nazivPremaValute = $scope.listaKursa[i+1].nazivPremaValuti;
							$scope.kupovni = $scope.listaKursa[i+1].kupovni;
							$scope.srednji = $scope.listaKursa[i+1].srednji;
							$scope.prodajni = $scope.listaKursa[i+1].prodajni;
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
			$scope.idKursneListe = null;
			$scope.primenjujeSeOd = null;
			$scope.idOsnovneValute = null;
			$scope.nazivOsnovneValute = null;
			$scope.idPremaValute = null;
			$scope.nazivPremaValute = null;
			$scope.kupovni = null;
			$scope.srednji = null;
			$scope.prodajni = null;
			//obratiti paznju ovde, bice problema!!!
			if(!angular.equals({}, $stateParams))
			{
				if(url.indexOf('kursna_lista') !== -1)
				{
					var drzavaId = $stateParams.id;
					$scope.idKursneListe = drzavaId;
					$http.post('http://localhost:8080/PoslovnaBanka/kursna_lista/findOne',
					{sifra: drzavaId})
					.success(function(data, status, header){
						$scope.primenjujeSeOd = data[0].primenjujeSeOd;
					});
				}
			}
			
		}
		
		$scope.stanjePretrage = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjePregled = false;
			$scope.stanjeIzmena = false;
		
			$scope.sifraSelected = null;
			if(!angular.equals({}, $stateParams))
			{
				if(url.indexOf('kursna_lista') !== -1)
				{
					var drzavaId = $stateParams.id;
					$scope.idKursneListe = drzavaId;
					$http.post('http://localhost:8080/PoslovnaBanka/kursna_lista/findOne',
					{sifra: drzavaId})
					.success(function(data, status, header){
						$scope.primenjujeSeOd = data[0].primenjujeSeOd;
					});
				}
				
			}
			$scope.idOsnovneValute = null;
			$scope.nazivOsnovneValute = null;
			$scope.idPremaValute = null;
			$scope.nazivPremaValute = null;
			$scope.kupovni = null;
			$scope.srednji = null;
			$scope.prodajni = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/save',
						{redniBroj: $scope.sifraSelected, idKursneListe: $scope.idKursneListe, primenjuje: $scope.primenjujeSeOd, idOsnovneValute: $scope.idOsnovneValute, nazivOsnovneValute: $scope.nazivOsnovneValute, idPremaValute: $scope.idPremaValute, nazivPremaValute: $scope.nazivPremaValute, kupovni: $scope.kupovni, srednji: $scope.srednji, prodajni: $scope.prodajni})
				.success(function(data, status, header)
				{
					if(!angular.equals({}, $stateParams)){
						if(url.indexOf('kursna_lista') !== -1)
						{
							var drzavaId = $stateParams.id;
							$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/' + drzavaId + '/kursevi_u_valuti')
							.success(function(data, status, header)
							{
								$scope.listaKursa = data;
								for(var i=0; i<$scope.listaKursa.length; i++)
								{
									if($scope.sifraSelected == $scope.listaKursa[i].redniBroj)
									{
										$scope.sifraSelected = $scope.listaKursa[i].redniBroj;
										break;
									}
								}
								$state.go('kursna_lista_kursa_u_valuti', {id: drzavaId});
							});
						}
						else if(url.indexOf('valuta') !== -1)
						{
							var drzavaId = $stateParams.id;
							$http.get('http://localhost:8080/PoslovnaBanka/valute/' + drzavaId + '/kursevi_u_valuti')
							.success(function(data, status, header)
							{
								$scope.listaKursa = data;
								for(var i=0; i<$scope.listaKursa.length; i++)
								{
									if($scope.sifraSelected == $scope.listaKursa[i].redniBroj)
									{
										$scope.sifraSelected = $scope.listaKursa[i].redniBroj;
										break;
									}
								}
								$state.go('valuta_kursa_u_valuti', {id: drzavaId});
							});
						}						
					}else{
						$http.get('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/findAll')
						.success(function(data, status, header){
							
							$scope.listaKursa = data;
							for(var i=0; i<$scope.listaKursa.length; i++)
							{
								if($scope.sifraSelected == $scope.listaKursa[i].redniBroj)
								{
									$scope.sifraSelected = $scope.listaKursa[i].redniBroj;
									break;
								}
							}
						});
					}
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/search',
						{redniBroj: $scope.sifraSelected, idKursneListe: $scope.idKursneListe, primenjuje: $scope.primenjujeSeOd, idOsnovneValute: $scope.idOsnovneValute, nazivOsnovneValute: $scope.nazivOsnovneValute, idPremaValute: $scope.idPremaValute, nazivPremaValute: $scope.nazivPremaValute, kupovni: $scope.kupovni, srednji: $scope.srednji, prodajni: $scope.prodajni})
				.success(function(data, status, header){
					
					if(!angular.equals({}, $stateParams))
					{
						if(url.indexOf('kursna_lista') !== -1)
						{
							var drzavaId = $stateParams.id;
							$scope.listaKursa = data;
							
							$state.go('kursna_lista_kursa_u_valuti', {id: drzavaId});
						}
						else if(url.indexOf('valuta') !== -1)
						{
							var drzavaId = $stateParams.id;
							$scope.listaKursa = data;
							
							$state.go('valuta_kursa_u_valuti', {id: drzavaId});
						}

					}
					else
					{
						$scope.listaKursa = data;
						$state.go('kurs_u_valuti');
					}
				});
			}
			else if($scope.stanjeIzmena)
			{
				if(!angular.equals({}, $stateParams))
				{
					if(url.indexOf('kursna_lista') !== -1)
					{
						var drzavaId = $stateParams.id;
						
						$http.post('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/update',
								{redniBroj: $scope.sifraSelected, idKursneListe: $scope.idKursneListe, primenjuje: $scope.primenjujeSeOd, idOsnovneValute: $scope.idOsnovneValute, nazivOsnovneValute: $scope.nazivOsnovneValute, idPremaValute: $scope.idPremaValute, nazivPremaValute: $scope.nazivPremaValute, kupovni: $scope.kupovni, srednji: $scope.srednji, prodajni: $scope.prodajni})
						.success(function(data, status, header){
							$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/' + drzavaId + '/kursevi_u_valuti')
							.success(function(data, status, header)
							{
								$scope.listaKursa = data;
								$state.go('kursna_lista_kursa_u_valuti', {id: drzavaId});
							});
						});
					}
					else if(url.indexOf('valuta') !== -1)
					{
						var drzavaId = $stateParams.id;
						$http.post('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/update',
								{redniBroj: $scope.sifraSelected, idKursneListe: $scope.idKursneListe, primenjuje: $scope.primenjujeSeOd, idOsnovneValute: $scope.idOsnovneValute, nazivOsnovneValute: $scope.nazivOsnovneValute, idPremaValute: $scope.idPremaValute, nazivPremaValute: $scope.nazivPremaValute, kupovni: $scope.kupovni, srednji: $scope.srednji, prodajni: $scope.prodajni})
						.success(function(data, status, header){
							$http.get('http://localhost:8080/PoslovnaBanka/valute/' + drzavaId + '/kursevi_u_valuti')
							.success(function(data, status, header)
							{
								$scope.listaKursa = data;
								$state.go('valuta_kursa_u_valuti', {id: drzavaId});
							});
						});
						
					}			
				
				}
				else
				{
					$http.post('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/update',
							{redniBroj: $scope.sifraSelected, idKursneListe: $scope.idKursneListe, primenjuje: $scope.primenjujeSeOd, idOsnovneValute: $scope.idOsnovneValute, nazivOsnovneValute: $scope.nazivOsnovneValute, idPremaValute: $scope.idPremaValute, nazivPremaValute: $scope.nazivPremaValute, kupovni: $scope.kupovni, srednji: $scope.srednji, prodajni: $scope.prodajni})
					.success(function(data, status, header){
						$http.get('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/findAll')
						.success(function(data, status, header)
						{
							$scope.listaKursa = data;
							$state.go('kurs_u_valuti');
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
				$http.delete('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					if(!angular.equals({}, $stateParams))
					{
						if(url.indexOf('kursna_lista') !== -1)
						{
							var drzavaId = $stateParams.id;
							
							$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/' + drzavaId + '/kursevi_u_valuti')
							.success(function(data, status, header)
							{
								$scope.listaKursa = data;
								
								$scope.sifraSelected = null;
								$scope.idKursneListe = null;
								$scope.primenjujeSeOd = null;
								$scope.idOsnovneValute = null;
								$scope.nazivOsnovneValute = null;
								$scope.idPremaValute = null;
								$scope.nazivPremaValute = null;
								$scope.kupovni = null;
								$scope.srednji = null;
								$scope.prodajni = null;
								
								$scope.stanjeAdd = false;
								$scope.stanjeSearch = false;
								$scope.stanjePregled = true;
								$scope.stanjeIzmena = false;
								
								$state.go('kursna_lista_kursa_u_valuti', {id: drzavaId});
							});
						}
						else if(url.indexOf('valuta') !== -1)
						{
							var drzavaId = $stateParams.id;
							$http.get('http://localhost:8080/PoslovnaBanka/valute/' + drzavaId + '/kursevi_u_valuti')
							.success(function(data, status, header)
							{
								$scope.listaKursa = data;
								
								$scope.sifraSelected = null;
								$scope.idKursneListe = null;
								$scope.primenjujeSeOd = null;
								$scope.idOsnovneValute = null;
								$scope.nazivOsnovneValute = null;
								$scope.idPremaValute = null;
								$scope.nazivPremaValute = null;
								$scope.kupovni = null;
								$scope.srednji = null;
								$scope.prodajni = null;
								
								$scope.stanjeAdd = false;
								$scope.stanjeSearch = false;
								$scope.stanjePregled = true;
								$scope.stanjeIzmena = false;
								
								$state.go('valuta_kursa_u_valuti', {id: drzavaId});
							});
						}
						
					
					}
					else
					{
						$http.get('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/findAll')
						.success(function(data, status, header){
							$scope.listaKursa = data;
							
							$scope.sifraSelected = null;
							$scope.idKursneListe = null;
							$scope.primenjujeSeOd = null;
							$scope.idOsnovneValute = null;
							$scope.nazivOsnovneValute = null;
							$scope.idPremaValute = null;
							$scope.nazivPremaValute = null;
							$scope.kupovni = null;
							$scope.srednji = null;
							$scope.prodajni = null;
							 
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('kurs_u_valuti');
						});
					}
					
				});
			}
			else
			{
				alert('Morate izabrati kurs za brisanje.');
			}
		}
		
		$scope.refreshState = function(){
			if(!angular.equals({}, $stateParams))
			{
				var drzavaId = $stateParams.id;
					if(url.indexOf('kursna_lista') !== -1)
					{
						
						$http.get('http://localhost:8080/PoslovnaBanka/kursna_lista/' + drzavaId + '/kursevi_u_valuti')
						.success(function(data, status, header)
						{
							$scope.listaKursa = data;
							
							$scope.stanjeAdd = false;
							$scope.stanjePregled = true;
							$scope.stanjeSearch = false;
							$scope.stanjeIzmena = false;
							
							$scope.sifraSelected = null;
							$scope.idKursneListe = $scope.listaKursa[0].idKursneListe;
							$scope.primenjujeSeOd = $scope.listaKursa[0].primenjujeSeOd;
							$scope.idOsnovneValute = null;
							$scope.nazivOsnovneValute = null;
							$scope.idPremaValute = null;
							$scope.nazivPremaValute = null;
							$scope.kupovni = null;
							$scope.srednji = null;
							$scope.prodajni = null;
							
							$state.go('kursna_lista_kursa_u_valuti', {id: drzavaId});
						});
						
					}
					else if(url.indexOf('valuta') !== -1)
					{
						$http.get('http://localhost:8080/PoslovnaBanka/valute/' + drzavaId + '/kursevi_u_valuti')
						.success(function(data, status, header)
						{
							var drzavaId = $stateParams.id;
							$scope.listaKursa = data;
							
							$scope.sifraSelected = null;
							$scope.idKursneListe = null;
							$scope.primenjujeSeOd = null;
							$scope.idOsnovneValute = null;
							$scope.nazivOsnovneValute = null;
							$scope.idPremaValute = null;
							$scope.nazivPremaValute = null;
							$scope.kupovni = null;
							$scope.srednji = null;
							$scope.prodajni = null;
							
							$scope.stanjeAdd = false;
							$scope.stanjeSearch = false;
							$scope.stanjePregled = true;
							$scope.stanjeIzmena = false;
							
							$state.go('valuta_kursa_u_valuti', {id: drzavaId});
						});
					}

			}
			else
			{
				$http.get('http://localhost:8080/PoslovnaBanka/kurs_u_valuti/findAll')
				.success(function(data, status, header)
				{
					$scope.listaKursa = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					$scope.sifraSelected = null;
					$scope.idKursneListe = null;
					$scope.primenjujeSeOd = null;
					$scope.idOsnovneValute = null;
					$scope.nazivOsnovneValute = null;
					$scope.idPremaValute = null;
					$scope.nazivPremaValute = null;
					$scope.kupovni = null;
					$scope.srednji = null;
					$scope.prodajni = null;
				});
			}
			
		}
		
		$scope.zoomValuteOsnovne = function()
		{
			zoomKursUValutiService.setZoom(true);
			zoomKursUValutiService.setOsnovna(true);
			zoomKursUValutiService.setPrema(false);
			
			zoomKursUValutiService.setRedniBroj($scope.sifraSelected);
			zoomKursUValutiService.setIdKursneListe($scope.idKursneListe);
			zoomKursUValutiService.setPrimenjujeSeOd($scope.primenjujeSeOd);
			zoomKursUValutiService.setIdOsnovneValute($scope.idOsnovneValute);
			zoomKursUValutiService.setNazivOsnovneValute($scope.nazivOsnovneValute);
			zoomKursUValutiService.setIdPremaValuti($scope.idPremaValute);
			zoomKursUValutiService.setNazivPremaValuti($scope.nazivPremaValute);
			zoomKursUValutiService.setKupovni($scope.kupovni);
			zoomKursUValutiService.setSrednji($scope.srednji);
			zoomKursUValutiService.setProdajni($scope.prodajni);
			
			
			
			if($scope.stanjeSearch)
			{
				zoomKursUValutiService.setPretraga(true);
				if(url.indexOf('kursna_lista') !== -1)
				{
					zoomKursUValutiService.setIzZooma(true);
				}
			}
			else if($scope.stanjeAdd)
			{
				zoomKursUValutiService.setPretraga(false);
				if(url.indexOf('kursna_lista') !== -1)
				{
					zoomKursUValutiService.setIzZooma(true);
				}
			}
			
			$state.go('valute');
		}
		
		$scope.zoomValutePrema = function()
		{
			zoomKursUValutiService.setZoom(true);
			zoomKursUValutiService.setPrema(true);
			zoomKursUValutiService.setOsnovna(false);
			
			zoomKursUValutiService.setRedniBroj($scope.sifraSelected);
			zoomKursUValutiService.setIdKursneListe($scope.idKursneListe);
			zoomKursUValutiService.setPrimenjujeSeOd($scope.primenjujeSeOd);
			zoomKursUValutiService.setIdOsnovneValute($scope.idOsnovneValute);
			zoomKursUValutiService.setNazivOsnovneValute($scope.nazivOsnovneValute);
			zoomKursUValutiService.setIdPremaValuti($scope.idPremaValute);
			zoomKursUValutiService.setNazivPremaValuti($scope.nazivPremaValute);
			zoomKursUValutiService.setKupovni($scope.kupovni);
			zoomKursUValutiService.setSrednji($scope.srednji);
			zoomKursUValutiService.setProdajni($scope.prodajni);
			
			
			
			if($scope.stanjeSearch)
			{
				zoomKursUValutiService.setPretraga(true);
				if(url.indexOf('kursna_lista') !== -1)
				{
					zoomKursUValutiService.setIzZooma(true);
				}
			}
			else if($scope.stanjeAdd)
			{
				zoomKursUValutiService.setPretraga(false);
				if(url.indexOf('kursna_lista') !== -1)
				{
					zoomKursUValutiService.setIzZooma(true);
				}
			}
			
			$state.go('valute');
		}
		
		$scope.zoomKursneListe = function()
		{
			zoomKursUValutiService.setZoom(true);
			
			zoomKursUValutiService.setPrema(true);
			zoomKursUValutiService.setOsnovna(false);
			
			zoomKursUValutiService.setRedniBroj($scope.sifraSelected);
			zoomKursUValutiService.setIdKursneListe($scope.idKursneListe);
			zoomKursUValutiService.setPrimenjujeSeOd($scope.primenjujeSeOd);
			zoomKursUValutiService.setIdOsnovneValute($scope.idOsnovneValute);
			zoomKursUValutiService.setNazivOsnovneValute($scope.nazivOsnovneValute);
			zoomKursUValutiService.setIdPremaValuti($scope.idPremaValute);
			zoomKursUValutiService.setNazivPremaValuti($scope.nazivPremaValute);
			zoomKursUValutiService.setKupovni($scope.kupovni);
			zoomKursUValutiService.setSrednji($scope.srednji);
			zoomKursUValutiService.setProdajni($scope.prodajni);
			
			
			
			if($scope.stanjeSearch)
			{
				zoomKursUValutiService.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomKursUValutiService.setPretraga(false);
			}
			
			$state.go('kursna_lista');
		}
		
		$scope.nazad = function()
		{
			if(!angular.equals({}, $stateParams))
			{
				if(url.indexOf('valuta') !== -1)
				{
					$state.go('valute');
				}
				else if(url.indexOf('kursna_lista') !== -1)
				{
					$state.go('kursna_lista');
				}
				
			}
			else
			{
				$state.go('main');
			}
		}
		
	});
		
})(angular)