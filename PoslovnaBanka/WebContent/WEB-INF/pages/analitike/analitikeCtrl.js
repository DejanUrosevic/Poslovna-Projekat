(function(angular){
	var analitikeModul = angular.module('analitikeEntry', []);
	
	analitikeModul.controller('analitikeCtrl', function($scope, $http, $state, $stateParams, zoomServiceAnalitikaRacun){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/analitike/findAll')
		.success(function(data, status, header)
		{
			$scope.lista = data;
			
		});
		
		$scope.hitnoType = [
		       { name: 'Da', value: 'true' }, 
		       { name: 'Ne', value: 'false' }                  
		];
		
		if(zoomServiceAnalitikaRacun.getZoom()){
			if(zoomServiceAnalitikaRacun.getPretraga()){
				$scope.stanjeSearch = true;
				$scope.stanjeIzmene = false;
				$scope.stanjeAdd = false;
				$scope.stanjePregled = false;
			}
			else
			{
				$scope.stanjeSearch = false;
				$scope.stanjeIzmene = false;
				$scope.stanjeAdd = true;
				$scope.stanjePregled = false;
			}
			
			$scope.sifraSelected = zoomServiceAnalitikaRacun.getId();
			$scope.duznik = zoomServiceAnalitikaRacun.getDuznik();
			$scope.svrha = zoomServiceAnalitikaRacun.getSvrha();
			$scope.poverilac = zoomServiceAnalitikaRacun.getPoverilac();
			$scope.valuta = zoomServiceAnalitikaRacun.getValuta();
			$scope.datumValute = zoomServiceAnalitikaRacun.getDatumValute();
			$scope.iznos = zoomServiceAnalitikaRacun.getIznos();
			$scope.racunDuznika = zoomServiceAnalitikaRacun.getRacunDuznika();
			$scope.modelZaduzenja =  zoomServiceAnalitikaRacun.getModelZaduzenja();
			$scope.pbZaduzenje = zoomServiceAnalitikaRacun.getPbZaduzenja();
			$scope.racunPoverioca = zoomServiceAnalitikaRacun.getRacunPoverioca();
			$scope.modelOdobrenja = zoomServiceAnalitikaRacun.getModelOdobrenja();
			$scope.pbOdobrenja = zoomServiceAnalitikaRacun.getPbOdobrenja();
			$scope.nazivPlacanja = zoomServiceAnalitikaRacun.getNazivPlacanja();
			$scope.naselje = zoomServiceAnalitikaRacun.getNaselje();
			$scope.datumPrijema = zoomServiceAnalitikaRacun.getDatumPrijema();
			$scope.hitno = zoomServiceAnalitikaRacun.getHitno();
			$scope.tipGreske = zoomServiceAnalitikaRacun.getTipGreske();
			
			zoomServiceAnalitikaRacun.setZoom(false);
		}
		
		$scope.refresh = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/analitike/findAll')
			.success(function(data, status, header)
			{
				$scope.lista = data;
				
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				
				
				$scope.sifraSelected = null;
				$scope.duznik = null;
				$scope.svrha = null;
				$scope.poverilac = null;
				$scope.valuta = null;
				$scope.datumValute = null;
				$scope.iznos = null;
				$scope.racunDuznika = null;
				$scope.modelZaduzenja =  null;
				$scope.pbZaduzenje = null;
				$scope.racunPoverioca = null;
				$scope.modelOdobrenja = null;
				$scope.pbOdobrenja = null;
				$scope.nazivPlacanja = null;
				$scope.naselje = null;
				$scope.datumPrijema = null;
				$scope.hitno = null;
				$scope.tipGreske = null;
				$scope.status = null;
				
				$state.go('analitike');
			});
		}
		
		$scope.setSelected = function(id, duznik, svrha, poverilac, valuta, datumValute, iznos, racunDuznika, 
				modelZaduzenja, pbZaduzenja, racunDuznika, modelZaduzenja, pbZaduzenje, racunPoverioca, 
				modelOdobrenja, pbOdobrenja, nazivPlacanja, naselje, datumPrijema, hitno, tipGreske, status)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = id;
			$scope.duznik = duznik;
			$scope.svrha = svrha;
			$scope.poverilac = poverilac;
			$scope.valuta = valuta;
			$scope.datumValute = new Date(datumValute);
			$scope.iznos = iznos;
			$scope.racunDuznika = racunDuznika;
			$scope.modelZaduzenja =  modelZaduzenja;
			$scope.pbZaduzenje = pbZaduzenje;
			$scope.racunPoverioca = racunPoverioca;
			$scope.modelOdobrenja = modelOdobrenja;
			$scope.pbOdobrenja = pbOdobrenja;
			$scope.nazivPlacanja = nazivPlacanja;
			$scope.naselje = naselje;
			$scope.datumPrijema = new Date(datumPrijema);
			$scope.hitno = hitno;
			$scope.tipGreske = tipGreske;
			$scope.status = status;
		}
		
		$scope.levoDoKraja = function(){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.lista[0].id;
			$scope.duznik = $scope.lista[0].duznik;
			$scope.svrha = $scope.lista[0].svrha;
			$scope.poverilac = $scope.lista[0].poverilac;
			$scope.valuta = $scope.lista[0].valuta;
			$scope.datumValute = new Date($scope.lista[0].datumValute);
			$scope.iznos = $scope.lista[0].iznos;
			$scope.racunDuznika = $scope.lista[0].racunDuznika;
			$scope.modelZaduzenja = $scope.lista[0].modelZaduzenja;
			$scope.pbZaduzenje = $scope.lista[0].pbZaduzenja;
			$scope.racunPoverioca = $scope.lista[0].racunPoverioca;
			$scope.modelOdobrenja = $scope.lista[0].modelOdobrenja;
			$scope.pbOdobrenja = $scope.lista[0].pbOdobrenja;
			$scope.nazivPlacanja = $scope.lista[0].nazivPlacanja;
			$scope.naselje = $scope.lista[0].naselje;
			$scope.datumPrijema = new Date($scope.lista[0].datumPrijema);
			$scope.hitno = $scope.lista[0].hitno;
			$scope.tipGreske = $scope.lista[0].tipGreske;
			$scope.status = $scope.lista[0].status;
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
			$scope.duznik = $scope.lista[$scope.lista.length-1].duznik;
			$scope.svrha = $scope.lista[$scope.lista.length-1].svrha;
			$scope.poverilac = $scope.lista[$scope.lista.length-1].poverilac;
			$scope.valuta = $scope.lista[$scope.lista.length-1].valuta;
			$scope.datumValute = new Date($scope.lista[$scope.lista.length-1].datumValute);
			$scope.iznos = $scope.lista[$scope.lista.length-1].iznos;
			$scope.racunDuznika = $scope.lista[$scope.lista.length-1].racunDuznika;
			$scope.modelZaduzenja = $scope.lista[$scope.lista.length-1].modelZaduzenja;
			$scope.pbZaduzenje = $scope.lista[$scope.lista.length-1].pbZaduzenja;
			$scope.racunPoverioca = $scope.lista[$scope.lista.length-1].racunPoverioca;
			$scope.modelOdobrenja = $scope.lista[$scope.lista.length-1].modelOdobrenja;
			$scope.pbOdobrenja = $scope.lista[$scope.lista.length-1].pbOdobrenja;
			$scope.nazivPlacanja = $scope.lista[$scope.lista.length-1].nazivPlacanja;
			$scope.naselje = $scope.lista[$scope.lista.length-1].naselje;
			$scope.datumPrijema = new Date($scope.lista[$scope.lista.length-1].datumPrijema);
			$scope.hitno = $scope.lista[$scope.lista.length-1].hitno;
			$scope.tipGreske = $scope.lista[$scope.lista.length-1].tipGreske;
			$scope.status = $scope.lista[$scope.lista.length-1].status;
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
				$scope.duznik = $scope.lista[$scope.lista.length-1].duznik;
				$scope.svrha = $scope.lista[$scope.lista.length-1].svrha;
				$scope.poverilac = $scope.lista[$scope.lista.length-1].poverilac;
				$scope.valuta = $scope.lista[$scope.lista.length-1].valuta;
				$scope.datumValute = new Date($scope.lista[$scope.lista.length-1].datumValute);
				$scope.iznos = $scope.lista[$scope.lista.length-1].iznos;
				$scope.racunDuznika = $scope.lista[$scope.lista.length-1].racunDuznika;
				$scope.modelZaduzenja = $scope.lista[$scope.lista.length-1].modelZaduzenja;
				$scope.pbZaduzenje = $scope.lista[$scope.lista.length-1].pbZaduzenja;
				$scope.racunPoverioca = $scope.lista[$scope.lista.length-1].racunPoverioca;
				$scope.modelOdobrenja = $scope.lista[$scope.lista.length-1].modelOdobrenja;
				$scope.pbOdobrenja = $scope.lista[$scope.lista.length-1].pbOdobrenja;
				$scope.nazivPlacanja = $scope.lista[$scope.lista.length-1].nazivPlacanja;
				$scope.naselje = $scope.lista[$scope.lista.length-1].naselje;
				$scope.datumPrijema = new Date($scope.lista[$scope.lista.length-1].datumPrijema);
				$scope.hitno = $scope.lista[$scope.lista.length-1].hitno;
				$scope.tipGreske = $scope.lista[$scope.lista.length-1].tipGreske; 
				$scope.status = $scope.lista[$scope.lista.length-1].status;
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
							$scope.duznik = $scope.lista[$scope.lista.length-1].duznik;
							$scope.svrha = $scope.lista[$scope.lista.length-1].svrha;
							$scope.poverilac = $scope.lista[$scope.lista.length-1].poverilac;
							$scope.valuta = $scope.lista[$scope.lista.length-1].valuta;
							$scope.datumValute = new Date($scope.lista[$scope.lista.length-1].datumValute);
							$scope.iznos = $scope.lista[$scope.lista.length-1].iznos;
							$scope.racunDuznika = $scope.lista[$scope.lista.length-1].racunDuznika;
							$scope.modelZaduzenja = $scope.lista[$scope.lista.length-1].modelZaduzenja;
							$scope.pbZaduzenje = $scope.lista[$scope.lista.length-1].pbZaduzenja;
							$scope.racunPoverioca = $scope.lista[$scope.lista.length-1].racunPoverioca;
							$scope.modelOdobrenja = $scope.lista[$scope.lista.length-1].modelOdobrenja;
							$scope.pbOdobrenja = $scope.lista[$scope.lista.length-1].pbOdobrenja;
							$scope.nazivPlacanja = $scope.lista[$scope.lista.length-1].nazivPlacanja;
							$scope.naselje = $scope.lista[$scope.lista.length-1].naselje;
							$scope.datumPrijema = new Date($scope.lista[$scope.lista.length-1].datumPrijema);
							$scope.hitno = $scope.lista[$scope.lista.length-1].hitno;
							$scope.tipGreske = $scope.lista[$scope.lista.length-1].tipGreske;
							$scope.status = $scope.lista[$scope.lista.length-1].status;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i-1].id;
							$scope.duznik = $scope.lista[i-1].duznik;
							$scope.svrha = $scope.lista[i-1].svrha;
							$scope.poverilac = $scope.lista[i-1].poverilac;
							$scope.valuta = $scope.lista[i-1].valuta;
							$scope.datumValute = new Date($scope.lista[i-1].datumValute);
							$scope.iznos = $scope.lista[i-1].iznos;
							$scope.racunDuznika = $scope.lista[i-1].racunDuznika;
							$scope.modelZaduzenja = $scope.lista[i-1].modelZaduzenja;
							$scope.pbZaduzenje = $scope.lista[i-1].pbZaduzenja;
							$scope.racunPoverioca = $scope.lista[i-1].racunPoverioca;
							$scope.modelOdobrenja = $scope.lista[i-1].modelOdobrenja;
							$scope.pbOdobrenja = $scope.lista[i-1].pbOdobrenja;
							$scope.nazivPlacanja = $scope.lista[i-1].nazivPlacanja;
							$scope.naselje = $scope.lista[i-1].naselje;
							$scope.datumPrijema = new Date($scope.lista[i-1].datumPrijema);
							$scope.hitno = $scope.lista[i-1].hitno;
							$scope.tipGreske = $scope.lista[i-1].tipGreske;
							$scope.status = $scope.lista[i-1].status;
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
				$scope.duznik = $scope.lista[0].duznik;
				$scope.svrha = $scope.lista[0].svrha;
				$scope.poverilac = $scope.lista[0].poverilac;
				$scope.valuta = $scope.lista[0].valuta;
				$scope.datumValute = new Date($scope.lista[0].datumValute);
				$scope.iznos = $scope.lista[0].iznos;
				$scope.racunDuznika = $scope.lista[0].racunDuznika;
				$scope.modelZaduzenja = $scope.lista[0].modelZaduzenja;
				$scope.pbZaduzenje = $scope.lista[0].pbZaduzenja;
				$scope.racunPoverioca = $scope.lista[0].racunPoverioca;
				$scope.modelOdobrenja = $scope.lista[0].modelOdobrenja;
				$scope.pbOdobrenja = $scope.lista[0].pbOdobrenja;
				$scope.nazivPlacanja = $scope.lista[0].nazivPlacanja;
				$scope.naselje = $scope.lista[0].naselje;
				$scope.datumPrijema = new Date($scope.lista[0].datumPrijema);
				$scope.hitno = $scope.lista[0].hitno;
				$scope.tipGreske = $scope.lista[0].tipGreske;
				$scope.status = $scope.lista[0].status;
			}
			else
			{
				for(var i=0; i<$scope.lista.length; i++)
				{
					if($scope.sifraSelected == $scope.lista[i].id)
					{
						if($scope.sifraSelected == $scope.lista[$scope.lista.length-1].id)
						{
							$scope.sifraSelected = $scope.lista[0].id;
							$scope.duznik = $scope.lista[0].duznik;
							$scope.svrha = $scope.lista[0].svrha;
							$scope.poverilac = $scope.lista[0].poverilac;
							$scope.valuta = $scope.lista[0].valuta;
							$scope.datumValute = new Date($scope.lista[0].datumValute);
							$scope.iznos = $scope.lista[0].iznos;
							$scope.racunDuznika = $scope.lista[0].racunDuznika;
							$scope.modelZaduzenja = $scope.lista[0].modelZaduzenja;
							$scope.pbZaduzenje = $scope.lista[0].pbZaduzenja;
							$scope.racunPoverioca = $scope.lista[0].racunPoverioca;
							$scope.modelOdobrenja = $scope.lista[0].modelOdobrenja;
							$scope.pbOdobrenja = $scope.lista[0].pbOdobrenja;
							$scope.nazivPlacanja = $scope.lista[0].nazivPlacanja;
							$scope.naselje = $scope.lista[0].naselje;
							$scope.datumPrijema = new Date($scope.lista[0].datumPrijema);
							$scope.hitno = $scope.lista[0].hitno;
							$scope.tipGreske = $scope.lista[0].tipGreske;
							$scope.status = $scope.lista[0].status;
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i+1].id;
							$scope.duznik = $scope.lista[i+1].duznik;
							$scope.svrha = $scope.lista[i+1].svrha;
							$scope.poverilac = $scope.lista[i+1].poverilac;
							$scope.valuta = $scope.lista[i+1].valuta;
							$scope.datumValute = new Date($scope.lista[i+1].datumValute);
							$scope.iznos = $scope.lista[i+1].iznos;
							$scope.racunDuznika = $scope.lista[i+1].racunDuznika;
							$scope.modelZaduzenja = $scope.lista[i+1].modelZaduzenja;
							$scope.pbZaduzenje = $scope.lista[i+1].pbZaduzenja;
							$scope.racunPoverioca = $scope.lista[i+1].racunPoverioca;
							$scope.modelOdobrenja = $scope.lista[i+1].modelOdobrenja;
							$scope.pbOdobrenja = $scope.lista[i+1].pbOdobrenja;
							$scope.nazivPlacanja = $scope.lista[i+1].nazivPlacanja;
							$scope.naselje = $scope.lista[i+1].naselje;
							$scope.datumPrijema = new Date($scope.lista[i+1].datumPrijema);
							$scope.hitno = $scope.lista[i+1].hitno;
							$scope.tipGreske = $scope.lista[i+1].tipGreske;
							$scope.status = $scope.lista[i+1].status;
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
			$scope.duznik = null;
			$scope.svrha = null;
			$scope.poverilac = null;
			$scope.valuta = null;
			$scope.datumValute = null;
			$scope.iznos = null;
			$scope.racunDuznika = null;
			$scope.modelZaduzenja =  null;
			$scope.pbZaduzenje = null;
			$scope.racunPoverioca = null;
			$scope.modelOdobrenja = null;
			$scope.pbOdobrenja = null;
			$scope.nazivPlacanja = null;
			$scope.naselje = null;
			$scope.datumPrijema = null;
			$scope.hitno = null;
			$scope.tipGreske = null;
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.duznik = null;
			$scope.svrha = null;
			$scope.poverilac = null;
			$scope.valuta = null;
			$scope.datumValute = null;
			$scope.iznos = null;
			$scope.racunDuznika = null;
			$scope.modelZaduzenja =  null;
			$scope.pbZaduzenje = null;
			$scope.racunPoverioca = null;
			$scope.modelOdobrenja = null;
			$scope.pbOdobrenja = null;
			$scope.nazivPlacanja = null;
			$scope.naselje = null;
			$scope.datumPrijema = null;
			$scope.hitno = null;
			$scope.tipGreske = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/analitike/save',
						{sifra: $scope.sifraSelected, duznik: $scope.duznik, svrha: $scope.svrha, poverilac: $scope.poverilac, valuta: $scope.valuta, 
						 datumValute: $scope.datumValute, iznos: $scope.iznos, racunDuznika: $scope.racunDuznika, modelZaduzenja: $scope.modelZaduzenja, 
						 pbZaduzenje: $scope.pbZaduzenje, racunPoverioca: $scope.racunPoverioca, modelOdobrenja: $scope.modelOdobrenja, pbOdobrenja: $scope.pbOdobrenja,
						 nazivPlacanja: $scope.nazivPlacanja, naselje: $scope.naselje, datumPrijema: $scope.datumPrijema, hitno: $scope.hitno,
						 idRacunaPoverioca: zoomServiceAnalitikaRacun.getIdRacunaPoverioca(), idRacunaDuznika: zoomServiceAnalitikaRacun.getIdRacunaDuznika(),
						 idVrstaPlacanja: zoomServiceAnalitikaRacun.getIdVrstePlacanja(), idNaselje: zoomServiceAnalitikaRacun.getIdNaselje(),
						 idValute: zoomServiceAnalitikaRacun.getIdValute(), idIzvoda: zoomServiceAnalitikaRacun.getIdIzvoda()})
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
						$http.get('http://localhost:8080/PoslovnaBanka/analitike/findAll')
						.success(function(data, status, header){
							
							$scope.lista = data;
							for(var i=0; i<$scope.lista.length; i++)
							{
								if($scope.sifraSelected == $scope.lista[i].id)
								{
									$scope.sifraSelected = $scope.lista[i].id;
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
		
		
		
		
		
		$scope.zoomDuznik = function(){
			zoomServiceAnalitikaRacun.setZoom(true);
			
			if($scope.stanjeSearch)
			{
				zoomServiceAnalitikaRacun.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceAnalitikaRacun.setPretraga(false);
			}
			
			zoomServiceAnalitikaRacun.setDuznikBoolean(true);
			zoomServiceAnalitikaRacun.setId($scope.sifraSelected);
			zoomServiceAnalitikaRacun.setSvrha($scope.svrha);
			zoomServiceAnalitikaRacun.setPoverilac($scope.poverilac);
			zoomServiceAnalitikaRacun.setDatumPrijema($scope.datumPrijema);
			zoomServiceAnalitikaRacun.setDatumValute($scope.datumValute);
			zoomServiceAnalitikaRacun.setModelZaduzenja($scope.modelZaduzenja);
			zoomServiceAnalitikaRacun.setPbZaduzenja($scope.pbZaduzenje);
			zoomServiceAnalitikaRacun.setRacunPoverioca($scope.racunPoverioca);
			zoomServiceAnalitikaRacun.setModelOdobrenja($scope.modelOdobrenja);
			zoomServiceAnalitikaRacun.setPbOdobrenja($scope.pbOdobrenja);
			zoomServiceAnalitikaRacun.setHitno($scope.hitno);
			zoomServiceAnalitikaRacun.setIznos($scope.iznos);
			zoomServiceAnalitikaRacun.setTipGreske($scope.tipGreske);
			zoomServiceAnalitikaRacun.setStatus(zoomServiceAnalitikaRacun.getStatus());
			zoomServiceAnalitikaRacun.setIdVrstePlacanja(zoomServiceAnalitikaRacun.getIdVrstePlacanja());
			zoomServiceAnalitikaRacun.setNazivPlacanja($scope.nazivPlacanja);
			zoomServiceAnalitikaRacun.setIdNaselje(zoomServiceAnalitikaRacun.getIdNaselje());
			zoomServiceAnalitikaRacun.setNaselje($scope.naselje);
			zoomServiceAnalitikaRacun.setIdValute(zoomServiceAnalitikaRacun.getIdValute());
			zoomServiceAnalitikaRacun.setValuta($scope.valuta);
			zoomServiceAnalitikaRacun.setIdIzvoda(zoomServiceAnalitikaRacun.getIdIzvoda());
			$state.go('racuni_klijenata');
		}
		
		$scope.zoomPoverilac = function(){
			zoomServiceAnalitikaRacun.setZoom(true);
			if($scope.stanjeSearch)
			{
				zoomServiceAnalitikaRacun.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceAnalitikaRacun.setPretraga(false);
			}
			
			zoomServiceAnalitikaRacun.setDuznikBoolean(false);
			zoomServiceAnalitikaRacun.setId($scope.sifraSelected);
			zoomServiceAnalitikaRacun.setSvrha($scope.svrha);
			zoomServiceAnalitikaRacun.setDuznik($scope.duznik);
			zoomServiceAnalitikaRacun.setDatumPrijema($scope.datumPrijema);
			zoomServiceAnalitikaRacun.setDatumValute($scope.datumValute);
			zoomServiceAnalitikaRacun.setModelZaduzenja($scope.modelZaduzenja);
			zoomServiceAnalitikaRacun.setPbZaduzenja($scope.pbZaduzenje);
			zoomServiceAnalitikaRacun.setRacunDuznika($scope.racunDuznika);
			zoomServiceAnalitikaRacun.setModelOdobrenja($scope.modelOdobrenja);
			zoomServiceAnalitikaRacun.setPbOdobrenja($scope.pbOdobrenja);
			zoomServiceAnalitikaRacun.setHitno($scope.hitno);
			zoomServiceAnalitikaRacun.setIznos($scope.iznos);
			zoomServiceAnalitikaRacun.setTipGreske($scope.tipGreske);
			zoomServiceAnalitikaRacun.setStatus(zoomServiceAnalitikaRacun.getStatus());
			zoomServiceAnalitikaRacun.setIdVrstePlacanja(zoomServiceAnalitikaRacun.getIdVrstePlacanja());
			zoomServiceAnalitikaRacun.setNazivPlacanja($scope.nazivPlacanja);
			zoomServiceAnalitikaRacun.setIdNaselje(zoomServiceAnalitikaRacun.getIdNaselje());
			zoomServiceAnalitikaRacun.setNaselje($scope.naselje);
			zoomServiceAnalitikaRacun.setIdValute(zoomServiceAnalitikaRacun.getIdValute());
			zoomServiceAnalitikaRacun.setValuta($scope.valuta);
			zoomServiceAnalitikaRacun.setIdIzvoda(zoomServiceAnalitikaRacun.getIdIzvoda());
			$state.go('racuni_klijenata');
		}
		
		$scope.zoomValute = function(){
			zoomServiceAnalitikaRacun.setZoom(true);
			
			if($scope.stanjeSearch)
			{
				zoomServiceAnalitikaRacun.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceAnalitikaRacun.setPretraga(false);
			}
			zoomServiceAnalitikaRacun.setDuznikBoolean(false);
			zoomServiceAnalitikaRacun.setId($scope.sifraSelected);
			zoomServiceAnalitikaRacun.setSvrha($scope.svrha);
			zoomServiceAnalitikaRacun.setDuznik($scope.duznik);
			zoomServiceAnalitikaRacun.setPoverilac($scope.poverilac);
			zoomServiceAnalitikaRacun.setDatumPrijema($scope.datumPrijema);
			zoomServiceAnalitikaRacun.setDatumValute($scope.datumValute);
			zoomServiceAnalitikaRacun.setModelZaduzenja($scope.modelZaduzenja);
			zoomServiceAnalitikaRacun.setPbZaduzenja($scope.pbZaduzenje);
			zoomServiceAnalitikaRacun.setRacunDuznika($scope.racunDuznika);
			zoomServiceAnalitikaRacun.setRacunPoverioca($scope.racunPoverioca);
			zoomServiceAnalitikaRacun.setModelOdobrenja($scope.modelOdobrenja);
			zoomServiceAnalitikaRacun.setPbOdobrenja($scope.pbOdobrenja);
			zoomServiceAnalitikaRacun.setHitno($scope.hitno);
			zoomServiceAnalitikaRacun.setIznos($scope.iznos);
			zoomServiceAnalitikaRacun.setTipGreske($scope.tipGreske);
			zoomServiceAnalitikaRacun.setStatus(zoomServiceAnalitikaRacun.getStatus());
			zoomServiceAnalitikaRacun.setIdVrstePlacanja(zoomServiceAnalitikaRacun.getIdVrstePlacanja());
			zoomServiceAnalitikaRacun.setNazivPlacanja($scope.nazivPlacanja);
			zoomServiceAnalitikaRacun.setIdNaselje(zoomServiceAnalitikaRacun.getIdNaselje());
			zoomServiceAnalitikaRacun.setNaselje($scope.naselje);
			zoomServiceAnalitikaRacun.setIdIzvoda(zoomServiceAnalitikaRacun.getIdIzvoda());
			$state.go('valute');
		}
		
		$scope.zoomVrstaPlacanja = function(){
			zoomServiceAnalitikaRacun.setZoom(true);
			
			if($scope.stanjeSearch)
			{
				zoomServiceAnalitikaRacun.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceAnalitikaRacun.setPretraga(false);
			}
			zoomServiceAnalitikaRacun.setDuznikBoolean(false);
			zoomServiceAnalitikaRacun.setId($scope.sifraSelected);
			zoomServiceAnalitikaRacun.setSvrha($scope.svrha);
			zoomServiceAnalitikaRacun.setDuznik($scope.duznik);
			zoomServiceAnalitikaRacun.setPoverilac($scope.poverilac);
			zoomServiceAnalitikaRacun.setDatumPrijema($scope.datumPrijema);
			zoomServiceAnalitikaRacun.setDatumValute($scope.datumValute);
			zoomServiceAnalitikaRacun.setModelZaduzenja($scope.modelZaduzenja);
			zoomServiceAnalitikaRacun.setPbZaduzenja($scope.pbZaduzenje);
			zoomServiceAnalitikaRacun.setRacunDuznika($scope.racunDuznika);
			zoomServiceAnalitikaRacun.setRacunPoverioca($scope.racunPoverioca);
			zoomServiceAnalitikaRacun.setModelOdobrenja($scope.modelOdobrenja);
			zoomServiceAnalitikaRacun.setPbOdobrenja($scope.pbOdobrenja);
			zoomServiceAnalitikaRacun.setHitno($scope.hitno);
			zoomServiceAnalitikaRacun.setIznos($scope.iznos);
			zoomServiceAnalitikaRacun.setTipGreske($scope.tipGreske);
			zoomServiceAnalitikaRacun.setStatus(zoomServiceAnalitikaRacun.getStatus());
			zoomServiceAnalitikaRacun.setIdNaselje(zoomServiceAnalitikaRacun.getIdNaselje());
			zoomServiceAnalitikaRacun.setNaselje($scope.naselje);
			zoomServiceAnalitikaRacun.setIdIzvoda(zoomServiceAnalitikaRacun.getIdIzvoda());
			zoomServiceAnalitikaRacun.setIdValute(zoomServiceAnalitikaRacun.getIdValute());
			zoomServiceAnalitikaRacun.setValuta($scope.valuta);
			$state.go('vrstePlacanja');
		}
		
		$scope.zoomNaselje = function(){
			zoomServiceAnalitikaRacun.setZoom(true);
			
			if($scope.stanjeSearch)
			{
				zoomServiceAnalitikaRacun.setPretraga(true);
			}
			else if($scope.stanjeAdd)
			{
				zoomServiceAnalitikaRacun.setPretraga(false);
			}
			zoomServiceAnalitikaRacun.setDuznikBoolean(false);
			zoomServiceAnalitikaRacun.setId($scope.sifraSelected);
			zoomServiceAnalitikaRacun.setSvrha($scope.svrha);
			zoomServiceAnalitikaRacun.setDuznik($scope.duznik);
			zoomServiceAnalitikaRacun.setPoverilac($scope.poverilac);
			zoomServiceAnalitikaRacun.setDatumPrijema($scope.datumPrijema);
			zoomServiceAnalitikaRacun.setDatumValute($scope.datumValute);
			zoomServiceAnalitikaRacun.setModelZaduzenja($scope.modelZaduzenja);
			zoomServiceAnalitikaRacun.setPbZaduzenja($scope.pbZaduzenje);
			zoomServiceAnalitikaRacun.setRacunDuznika($scope.racunDuznika);
			zoomServiceAnalitikaRacun.setRacunPoverioca($scope.racunPoverioca);
			zoomServiceAnalitikaRacun.setModelOdobrenja($scope.modelOdobrenja);
			zoomServiceAnalitikaRacun.setPbOdobrenja($scope.pbOdobrenja);
			zoomServiceAnalitikaRacun.setHitno($scope.hitno);
			zoomServiceAnalitikaRacun.setIznos($scope.iznos);
			zoomServiceAnalitikaRacun.setTipGreske($scope.tipGreske);
			zoomServiceAnalitikaRacun.setStatus(zoomServiceAnalitikaRacun.getStatus());
			zoomServiceAnalitikaRacun.setIdIzvoda(zoomServiceAnalitikaRacun.getIdIzvoda());
			zoomServiceAnalitikaRacun.setIdValute(zoomServiceAnalitikaRacun.getIdValute());
			zoomServiceAnalitikaRacun.setValuta($scope.valuta);
			zoomServiceAnalitikaRacun.setIdVrstePlacanja(zoomServiceAnalitikaRacun.getIdVrstePlacanja());
			zoomServiceAnalitikaRacun.setNazivPlacanja($scope.nazivPlacanja);
			$state.go('naseljeno_mesto');
		}
		
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/analitike/save',
						{sifra: $scope.sifraSelected, duznik: $scope.duznik, svrha: $scope.svrha, poverilac: $scope.poverilac, valuta: $scope.valuta, 
						 datumValute: $scope.datumValute, iznos: $scope.iznos, racunDuznika: $scope.racunDuznika, modelZaduzenja: $scope.modelZaduzenja, 
						 pbZaduzenje: $scope.pbZaduzenje, racunPoverioca: $scope.racunPoverioca, modelOdobrenja: $scope.modelOdobrenja, pbOdobrenja: $scope.pbOdobrenja,
						 nazivPlacanja: $scope.nazivPlacanja, naselje: $scope.naselje, datumPrijema: $scope.datumPrijema, hitno: $scope.hitno,
						 idRacunaPoverioca: zoomServiceAnalitikaRacun.getIdRacunaPoverioca(), idRacunaDuznika: zoomServiceAnalitikaRacun.getIdRacunaDuznika(),
						 idVrstaPlacanja: zoomServiceAnalitikaRacun.getIdVrstePlacanja(), idNaselje: zoomServiceAnalitikaRacun.getIdNaselje(),
						 idValute: zoomServiceAnalitikaRacun.getIdValute(), idIzvoda: zoomServiceAnalitikaRacun.getIdIzvoda()})
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
						$http.get('http://localhost:8080/PoslovnaBanka/analitike/findAll')
						.success(function(data, status, header){
							
							$scope.lista = data;
							for(var i=0; i<$scope.lista.length; i++)
							{
								if($scope.sifraSelected == $scope.lista[i].id)
								{
									$scope.sifraSelected = $scope.lista[i].id;
									break;
								}
							}
						});
					}
				});
			}
			else if($scope.stanjeSearch)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/analitike/search',
						{sifra: $scope.sifraSelected, duznik: $scope.duznik, svrha: $scope.svrha, poverilac: $scope.poverilac, valuta: $scope.valuta, 
					     datumValute: $scope.datumValute, iznos: $scope.iznos, racunDuznika: $scope.racunDuznika, modelZaduzenja: $scope.modelZaduzenja, 
					     pbZaduzenje: $scope.pbZaduzenje, racunPoverioca: $scope.racunPoverioca, modelOdobrenja: $scope.modelOdobrenja, pbOdobrenja: $scope.pbOdobrenja,
					     nazivPlacanja: $scope.nazivPlacanja, naselje: $scope.naselje, datumPrijema: $scope.datumPrijema, hitno: $scope.hitno, tipGreske: $scope.tipGreske,
					     status: $scope.status})
				.success(function(data, status, header)
				{
					$scope.lista = data;
					$state.go('analitike');
					
				});
			}
		}
		
		$scope.doKliring = function()
		{
			$http.get('http://localhost:8080/PoslovnaBanka/analitike/doClearing')
			.success(function(data, status, header)
			{
				alert('Kliring uspesno odradjen.');
				$http.get('http://localhost:8080/PoslovnaBanka/analitike/findAll')
				.success(function(data, status, header)
				{
					$scope.lista = data;
					
					$scope.stanjeAdd = false;
					$scope.stanjePregled = true;
					$scope.stanjeSearch = false;
					$scope.stanjeIzmena = false;
					
					
					$scope.sifraSelected = null;
					$scope.duznik = null;
					$scope.svrha = null;
					$scope.poverilac = null;
					$scope.valuta = null;
					$scope.datumValute = null;
					$scope.iznos = null;
					$scope.racunDuznika = null;
					$scope.modelZaduzenja =  null;
					$scope.pbZaduzenje = null;
					$scope.racunPoverioca = null;
					$scope.modelOdobrenja = null;
					$scope.pbOdobrenja = null;
					$scope.nazivPlacanja = null;
					$scope.naselje = null;
					$scope.datumPrijema = null;
					$scope.hitno = null;
					$scope.tipGreske = null;
					
					$state.go('analitike');
				});
				
			});
		}
		
		
		
		$scope.importXml = function()
		{
			  var f = document.getElementById('file').files[0],
		      r = new FileReader();
			  r.onloadend = function(e)
			  {
			    var data = e.target.result;
			    //send your binary data via $http or $resource or do anything else with it
			    $http.post('http://localhost:8080/PoslovnaBanka/analitike/importXml', {xml: data})
			    .success(function(data, status, header)
			    {
			    	$scope.lista = data;
			    	
			    })
			  }
			  r.readAsBinaryString(f);
		}
		
	});
})(angular)