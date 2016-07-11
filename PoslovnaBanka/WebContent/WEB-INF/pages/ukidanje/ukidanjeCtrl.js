(function(angular){
	var ukidanjeModul = angular.module('ukidanjeEntry', []);
	
	ukidanjeModul.controller('ukidanjeCtrl',function($scope, $http, $state, $stateParams, zoomServiceUkidanje){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/ukidanje/findAll')
		.success(function(data, status, header){
			$scope.listaRacuna = data;
		});
		
		if(zoomServiceUkidanje.getZoom()){
			$scope.stanjePregled = false;
			
			if(zoomServiceUkidanje.getPretraga()){
				$scope.stanjeSearch = true;
				$scope.stanjeIzmene = false;
				$scope.stanjeAdd = false;
			}else{
				$scope.stanjeSearch = false;
				$scope.stanjeIzmene = false;
				$scope.stanjeAdd = true;
			}
			
			$scope.sifraSelected = zoomServiceUkidanje.getSifraSelected();
			if(zoomServiceUkidanje.getKlijent()){
				if(zoomServiceUkidanje.getIme() != null && zoomServiceUkidanje.getIme() != undefined && zoomServiceUkidanje.getIme() != ''){
					$scope.nazivVlasnika = zoomServiceUkidanje.getIme() + " " + zoomServiceUkidanje.getPrezime();
				}else if(zoomServiceUkidanje.getNaziv() != null && zoomServiceUkidanje.getNaziv() != undefined && zoomServiceUkidanje.getNaziv() != ''){
					$scope.nazivVlasnika = zoomServiceUkidanje.getNaziv();
				}
				
				$scope.vlasnikRacunaZaPrebacivanje = zoomServiceUkidanje.getVlasnikPrebacivanje();
			}else{
				if(zoomServiceUkidanje.getIme2() != null && zoomServiceUkidanje.getIme2() != undefined && zoomServiceUkidanje.getIme2() != ''){
					$scope.vlasnikRacunaZaPrebacivanje = zoomServiceUkidanje.getIme2() + " " + zoomServiceUkidanje.getPrezime2();
				}else if(zoomServiceUkidanje.getNaziv2() != null && zoomServiceUkidanje.getNaziv2() != undefined && zoomServiceUkidanje.getNaziv2() != ''){
					$scope.vlasnikRacunaZaPrebacivanje = zoomServiceUkidanje.getNaziv2();
				}
				
				$scope.nazivVlasnika = zoomServiceUkidanje.getVlasnik();
			}
			
			$scope.racunZaPrebacivanje = zoomServiceUkidanje.getBrRacunaPrebacivanje();
			$scope.brRacuna = zoomServiceUkidanje.getBrRacuna();
			$scope.banka = zoomServiceUkidanje.getNazivBanke();
			$scope.datum = zoomServiceUkidanje.getDatum();
			
			zoomServiceUkidanje.setZoom(false);
		}
		
		$scope.setSelected = function(id, nazivVlasnika, brRacuna, banka, racunZaPrebacivanje, vlasnikRacunaZaPrebacivanje, datum){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = id;
			$scope.nazivVlasnika = nazivVlasnika;
			$scope.brRacuna = brRacuna;
			$scope.banka = banka;
			$scope.racunZaPrebacivanje = racunZaPrebacivanje;
			$scope.vlasnikRacunaZaPrebacivanje = vlasnikRacunaZaPrebacivanje;
			$scope.datum = new Date(datum);
		}
		
		$scope.refreshLica = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/ukidanje/findAll')
			.success(function(data, status, header){
				$scope.listaRacuna = data;
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				

				$scope.sifraSelected = null;
				$scope.nazivVlasnika = null;
				$scope.brRacuna = null;
				$scope.banka = null;
				$scope.racunZaPrebacivanje = null;
				$scope.vlasnikRacunaZaPrebacivanje = null;
				$scope.datum = null;
			});
		}
		
		$scope.stanjeDodavanje = function(){
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.nazivVlasnika = null;
			$scope.brRacuna = null;
			$scope.banka = null;
			$scope.racunZaPrebacivanje = null;
			$scope.vlasnikRacunaZaPrebacivanje = null;
			$scope.datum = null;
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.nazivVlasnika = null;
			$scope.brRacuna = null;
			$scope.banka = null;
			$scope.racunZaPrebacivanje = null;
			$scope.vlasnikRacunaZaPrebacivanje = null;
			$scope.datum = null;
		}
		
		$scope.levoDoKraja = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaRacuna[0].id;
			$scope.nazivVlasnika = $scope.listaRacuna[0].nazivVlasnika;
			$scope.brRacuna = $scope.listaRacuna[0].brRacuna;
			$scope.banka = $scope.listaRacuna[0].banka;
			$scope.racunZaPrebacivanje = $scope.listaRacuna[0].racunZaPrebacivanje;
			$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[0].vlasnikRacunaZaPrebacivanje;
			$scope.datum = new Date($scope.listaRacuna[0].datum);
		}
		
		$scope.desnoDoKraja = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.listaRacuna[$scope.listaRacuna.length-1].id;
			$scope.nazivVlasnika = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivVlasnika;
			$scope.brRacuna = $scope.listaRacuna[$scope.listaRacuna.length-1].brRacuna;
			$scope.banka = $scope.listaRacuna[$scope.listaRacuna.length-1].banka;
			$scope.racunZaPrebacivanje = $scope.listaRacuna[$scope.listaRacuna.length-1].racunZaPrebacivanje;
			$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[$scope.listaRacuna.length-1].vlasnikRacunaZaPrebacivanje;
			$scope.datum = new Date($scope.listaRacuna[$scope.listaRacuna.length-1].datum);
		}
		
		$scope.jedanLevo = function()
		{
			
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaRacuna[$scope.listaRacuna.length-1].id;
				$scope.nazivVlasnika = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivVlasnika;
				$scope.brRacuna = $scope.listaRacuna[$scope.listaRacuna.length-1].brRacuna;
				$scope.banka = $scope.listaRacuna[$scope.listaRacuna.length-1].banka;
				$scope.racunZaPrebacivanje = $scope.listaRacuna[$scope.listaRacuna.length-1].racunZaPrebacivanje;
				$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[$scope.listaRacuna.length-1].vlasnikRacunaZaPrebacivanje;
				$scope.datum = new Date($scope.listaRacuna[$scope.listaRacuna.length-1].datum);
			}
			else
			{
				for(var i=0; i<$scope.listaRacuna.length; i++)
				{
					if($scope.sifraSelected === $scope.listaRacuna[i].id)
					{
						if($scope.sifraSelected === $scope.listaRacuna[0].id)
						{
							$scope.sifraSelected = $scope.listaRacuna[$scope.listaRacuna.length-1].id;
							$scope.nazivVlasnika = $scope.listaRacuna[$scope.listaRacuna.length-1].nazivVlasnika;
							$scope.brRacuna = $scope.listaRacuna[$scope.listaRacuna.length-1].brRacuna;
							$scope.banka = $scope.listaRacuna[$scope.listaRacuna.length-1].banka;
							$scope.racunZaPrebacivanje = $scope.listaRacuna[$scope.listaRacuna.length-1].racunZaPrebacivanje;
							$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[$scope.listaRacuna.length-1].vlasnikRacunaZaPrebacivanje;
							$scope.datum = new Date($scope.listaRacuna[$scope.listaRacuna.length-1].datum);
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaRacuna[i-1].id;
							$scope.nazivVlasnika = $scope.listaRacuna[i-1].nazivVlasnika;
							$scope.brRacuna = $scope.listaRacuna[i-1].brRacuna;
							$scope.banka = $scope.listaRacuna[i-1].banka;
							$scope.racunZaPrebacivanje = $scope.listaRacuna[i-1].racunZaPrebacivanje;
							$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[i-1].vlasnikRacunaZaPrebacivanje;
							$scope.datum = new Date($scope.listaRacuna[i-1].datum);
							break;
						}

					}
				}
			}
		}
		
		$scope.jedanDesno = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{
				$scope.sifraSelected = $scope.listaRacuna[0].id;
				$scope.nazivVlasnika = $scope.listaRacuna[0].nazivVlasnika;
				$scope.brRacuna = $scope.listaRacuna[0].brRacuna;
				$scope.banka = $scope.listaRacuna[0].banka;
				$scope.racunZaPrebacivanje = $scope.listaRacuna[0].racunZaPrebacivanje;
				$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[0].vlasnikRacunaZaPrebacivanje;
				$scope.datum = new Date($scope.listaRacuna[0].datum);
			}
			else
			{
				for(var i=0; i<$scope.listaRacuna.length; i++)
				{
					if($scope.sifraSelected === $scope.listaRacuna[i].id)
					{
						if($scope.sifraSelected === $scope.listaRacuna[$scope.listaRacuna.length-1].id)
						{
							$scope.sifraSelected = $scope.listaRacuna[0].id;
							$scope.nazivVlasnika = $scope.listaRacuna[0].nazivVlasnika;
							$scope.brRacuna = $scope.listaRacuna[0].brRacuna;
							$scope.banka = $scope.listaRacuna[0].banka;
							$scope.racunZaPrebacivanje = $scope.listaRacuna[0].racunZaPrebacivanje;
							$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[0].vlasnikRacunaZaPrebacivanje;
							$scope.datum = new Date($scope.listaRacuna[0].datum); 
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.listaRacuna[i+1].id;
							$scope.nazivVlasnika = $scope.listaRacuna[i+1].nazivVlasnika;
							$scope.brRacuna = $scope.listaRacuna[i+1].brRacuna;
							$scope.banka = $scope.listaRacuna[i+1].banka;
							$scope.racunZaPrebacivanje = $scope.listaRacuna[i+1].racunZaPrebacivanje;
							$scope.vlasnikRacunaZaPrebacivanje = $scope.listaRacuna[i+1].vlasnikRacunaZaPrebacivanje;
							$scope.datum = new Date($scope.listaRacuna[i+1].datum);
							break;	
						}
					}
				}
			}
		}
		
		$scope.zoomRacun = function(){
			zoomServiceUkidanje.setZoom(true);
			zoomServiceUkidanje.setKlijent(true);
			
			if($scope.stanjeSearch){
				zoomServiceUkidanje.setPretraga(true);
			}else{
				zoomServiceUkidanje.setPretraga(false)
			}
			
			zoomServiceUkidanje.setSifraSelected($scope.sifraSelected);
			zoomServiceUkidanje.setDatum($scope.datum);
			zoomServiceUkidanje.setVlasnikPrebacivanje($scope.vlasnikRacunaZaPrebacivanje);
			zoomServiceUkidanje.setBrRacunaPrebacivanje($scope.racunZaPrebacivanje);
			
			$state.go('racuni_klijenata');
		}
		
		$scope.zoomRacun2 = function(){
			zoomServiceUkidanje.setZoom(true);
			zoomServiceUkidanje.setKlijent(false);
			
			if($scope.stanjeSearch){
				zoomServiceUkidanje.setPretraga(true);
			}else{
				zoomServiceUkidanje.setPretraga(false)
			}
			
			zoomServiceUkidanje.setSifraSelected($scope.sifraSelected);
			zoomServiceUkidanje.setDatum($scope.datum);
			zoomServiceUkidanje.setVlasnik($scope.nazivVlasnika);
			zoomServiceUkidanje.setBrRacuna($scope.brRacuna);
			zoomServiceUkidanje.setNazivBanke($scope.banka);
			
			$state.go('racuni_klijenata');
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				$http.post('http://localhost:8080/PoslovnaBanka/ukidanje/save',
						{id: $scope.sifraSelected, idRacuna : zoomServiceUkidanje.getIdRacuna(),
					brRacuna : $scope.brRacuna, nazivVlasnika : $scope.nazivVlasnika, banka : $scope.banka,
					racunZaPrebacivanje : $scope.racunZaPrebacivanje,
					vlasnikRacunaZaPrebacivanje : $scope.vlasnikRacunaZaPrebacivanje})
				.success(function(data, status, header)
				{
					$http.get('http://localhost:8080/PoslovnaBanka/ukidanje/findAll')
					.success(function(data, status, header)
					{
						$scope.listaRacuna = data;
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = false;
						$scope.stanjePregled = true;
						
						$scope.sifraSelected = null;						
						$scope.nazivVlasnika = null;
						$scope.brRacuna = null;
						$scope.banka = null;
						$scope.racunZaPrebacivanje = null;
						$scope.vlasnikRacunaZaPrebacivanje = null;
						$scope.datum = null;
						
						zoomServiceUkidanje.setSifraSelected('');
						zoomServiceUkidanje.setDatum('');
						zoomServiceUkidanje.setVlasnik('');
						zoomServiceUkidanje.setBrRacuna('');
						zoomServiceUkidanje.setNazivBanke('');
						zoomServiceUkidanje.setVlasnikPrebacivanje('');
						zoomServiceUkidanje.setBrRacunaPrebacivanje('');
						zoomServiceUkidanje.setIme('');
						zoomServiceUkidanje.setPrezime('');
						zoomServiceUkidanje.setNaziv('');
						zoomServiceUkidanje.setNazivBanke('');
						zoomServiceUkidanje.setIdRacuna('');
						zoomServiceUkidanje.setIme2('');
						zoomServiceUkidanje.setPrezime2('');
						zoomServiceUkidanje.setNaziv2('');
						
						$state.go('ukidanje');
					});
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/ukidanje/search',
						{id: $scope.sifraSelected, idRacuna : zoomServiceUkidanje.getIdRacuna(),
					brRacuna : $scope.brRacuna, nazivVlasnika : $scope.nazivVlasnika, banka : $scope.banka,
					datum : $scope.datum, racunZaPrebacivanje : $scope.racunZaPrebacivanje,
					vlasnikRacunaZaPrebacivanje : $scope.vlasnikRacunaZaPrebacivanje})
				.success(function(data, status, header){
					$scope.listaRacuna = data;
					$state.go('ukidanje');
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
		$scope.deleteLice = function(){
			if($scope.sifraSelected != null || $scope.sifraSelected != undefined){
				$http.delete('http://localhost:8080/PoslovnaBanka/ukidanje/delete/' + $scope.sifraSelected)
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/ukidanje/findAll')
					.success(function(data, status, header){
						$scope.listaRacuna = data;
							
						$scope.stanjeAdd = false;
						$scope.stanjeSearch = false;
						$scope.stanjeIzmena = false;
						$scope.stanjePregled = true;
							
						$scope.sifraSelected = null;						
						$scope.nazivVlasnika = null;
						$scope.brRacuna = null;
						$scope.banka = null;
						$scope.racunZaPrebacivanje = null;
						$scope.vlasnikRacunaZaPrebacivanje = null;
						$scope.datum = null;
						
						zoomServiceUkidanje.setSifraSelected('');
						zoomServiceUkidanje.setDatum('');
						zoomServiceUkidanje.setVlasnik('');
						zoomServiceUkidanje.setBrRacuna('');
						zoomServiceUkidanje.setNazivBanke('');
						zoomServiceUkidanje.setVlasnikPrebacivanje('');
						zoomServiceUkidanje.setBrRacunaPrebacivanje('');
						zoomServiceUkidanje.setIme('');
						zoomServiceUkidanje.setPrezime('');
						zoomServiceUkidanje.setNaziv('');
						zoomServiceUkidanje.setNazivBanke('');
						zoomServiceUkidanje.setIdRacuna('');
						zoomServiceUkidanje.setIme2('');
						zoomServiceUkidanje.setPrezime2('');
						zoomServiceUkidanje.setNaziv2('');
							
						$state.go('ukidanje');
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