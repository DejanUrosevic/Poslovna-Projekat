(function(angular){
	var stanjeModul = angular.module('stanjeEntry', []);
	
	stanjeModul.controller('stanjeCtrl', function($scope, $http, $state, $stateParams, zoomStanjeLice){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/dnevno_stanje/findAll')
		.success(function(data, status, header)
		{
			$scope.lista = data;
			
		});
		
		if(zoomStanjeLice.getZoom()){
			if(zoomStanjeLice.getPretraga){
				$scope.stanjeSearch = true;
				$scope.stanjeIzmene = false;
				$scope.stanjeAdd = false;
				$scope.stanjePregled = false;
			}
			
			$scope.sifraSelected = zoomStanjeLice.getId();
			$scope.racuna = zoomStanjeLice.getRacun();
			$scope.vlasnikRacuna = zoomStanjeLice.getVlasnik();
			$scope.banka = zoomStanjeLice.getBanka();
			$scope.staroStanje = zoomStanjeLice.getStaroStanje();
			$scope.naTeret = zoomStanjeLice.getNaTeret();
			$scope.uKorist = zoomStanjeLice.getUKorist();
			$scope.novoStanje = zoomStanjeLice.getNovoStanje();
			$scope.datum = new Date(zoomStanjeLice.getDatum());
			zoomStanjeLice.setZoom(false);
		}
		
		$scope.setSelected = function(id, racuna, vlasnikRacuna, banka, staroStanje, naTeret, uKorist, novoStanje, datum)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = id;
			$scope.racuna = racuna;
			$scope.vlasnikRacuna = vlasnikRacuna;
			$scope.banka = banka;
			$scope.staroStanje = staroStanje;
			$scope.naTeret = naTeret;
			$scope.uKorist = uKorist;
			$scope.novoStanje = novoStanje;
			$scope.datum = new Date(datum);		
		}
		
		$scope.refreshState = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/dnevno_stanje/findAll')
			.success(function(data, status, header)
			{
				$scope.lista = data;
				
				$scope.stanjeAdd = false;
				$scope.stanjePregled = true;
				$scope.stanjeSearch = false;
				$scope.stanjeIzmena = false;
				
				$scope.sifraSelected = null;
				$scope.racuna = null;
				$scope.vlasnikRacuna = null;
				$scope.banka = null;
				$scope.staroStanje = null;
				$scope.naTeret = null;
				$scope.uKorist = null;
				$scope.novoStanje = null;
				$scope.datum = null;
				
				$state.go('dnevno_stanje');
			});
		}
		
		$scope.levoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.lista[0].id;
			$scope.racuna = $scope.lista[0].racuna;
			$scope.vlasnikRacuna = $scope.lista[0].vlasnikRacuna;
			$scope.banka = $scope.lista[0].banka;
			$scope.staroStanje = $scope.lista[0].staroStanje;
			$scope.naTeret = $scope.lista[0].naTeret;
			$scope.uKorist = $scope.lista[0].uKorist;
			$scope.novoStanje = $scope.lista[0].novoStanje;
			$scope.datum = new Date($scope.lista[0].datum);
		}
		
		$scope.desnoDoKraja = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
			$scope.racuna = $scope.lista[$scope.lista.length-1].racuna;
			$scope.vlasnikRacuna = $scope.lista[$scope.lista.length-1].vlasnikRacuna;
			$scope.banka = $scope.lista[$scope.lista.length-1].banka;
			$scope.staroStanje = $scope.lista[$scope.lista.length-1].staroStanje;
			$scope.naTeret = $scope.lista[$scope.lista.length-1].naTeret;
			$scope.uKorist = $scope.lista[$scope.lista.length-1].uKorist;
			$scope.novoStanje = $scope.lista[$scope.lista.length-1].novoStanje;
			$scope.datum = new Date($scope.lista[$scope.lista.length-1].datum);
		}
		
		$scope.jedanLevo = function()
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			if($scope.sifraSelected === null || $scope.sifraSelected === undefined)
			{

				$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
				$scope.racuna = $scope.lista[$scope.lista.length-1].racuna;
				$scope.vlasnikRacuna = $scope.lista[$scope.lista.length-1].vlasnikRacuna;
				$scope.banka = $scope.lista[$scope.lista.length-1].banka;
				$scope.staroStanje = $scope.lista[$scope.lista.length-1].staroStanje;
				$scope.naTeret = $scope.lista[$scope.lista.length-1].naTeret;
				$scope.uKorist = $scope.lista[$scope.lista.length-1].uKorist;
				$scope.novoStanje = $scope.lista[$scope.lista.length-1].novoStanje;
				$scope.datum = new Date($scope.lista[$scope.lista.length-1].datum);
			}
			else
			{
				for(var i=0; i<$scope.lista.length; i++)
				{
					if($scope.sifraSelected === $scope.lista[i].id)
					{
						if($scope.sifraSelected === $scope.lista[0].id)
						{

							$scope.sifraSelected = $scope.lista[$scope.lista.length-1].id;
							$scope.racuna = $scope.lista[$scope.lista.length-1].racuna;
							$scope.vlasnikRacuna = $scope.lista[$scope.lista.length-1].vlasnikRacuna;
							$scope.banka = $scope.lista[$scope.lista.length-1].banka;
							$scope.staroStanje = $scope.lista[$scope.lista.length-1].staroStanje;
							$scope.naTeret = $scope.lista[$scope.lista.length-1].naTeret;
							$scope.uKorist = $scope.lista[$scope.lista.length-1].uKorist;
							$scope.novoStanje = $scope.lista[$scope.lista.length-1].novoStanje;
							$scope.datum = new Date($scope.lista[$scope.lista.length-1].datum); 
							break;
						}
						else
						{

							$scope.sifraSelected = $scope.lista[i-1].id;
							$scope.racuna = $scope.lista[i-1].racuna;
							$scope.vlasnikRacuna = $scope.lista[i-1].vlasnikRacuna;
							$scope.banka = $scope.lista[i-1].banka;
							$scope.staroStanje = $scope.lista[i-1].staroStanje;
							$scope.naTeret = $scope.lista[i-1].naTeret;
							$scope.uKorist = $scope.lista[i-1].uKorist;
							$scope.novoStanje = $scope.lista[i-1].novoStanje;
							$scope.datum = new Date($scope.lista[i-1].datum);
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
				$scope.sifraSelected = $scope.lista[0].id;
				$scope.racuna = $scope.lista[0].racuna;
				$scope.vlasnikRacuna = $scope.lista[0].vlasnikRacuna;
				$scope.banka = $scope.lista[0].banka;
				$scope.staroStanje = $scope.lista[0].staroStanje;
				$scope.naTeret = $scope.lista[0].naTeret;
				$scope.uKorist = $scope.lista[0].uKorist;
				$scope.novoStanje = $scope.lista[0].novoStanje;
				$scope.datum = new Date($scope.lista[0].datum);
			}
			else
			{
				for(var i=0; i<$scope.lista.length; i++)
				{
					if($scope.sifraSelected === $scope.lista[i].id)
					{
						if($scope.sifraSelected === $scope.lista[$scope.lista.length-1].id)
						{
							$scope.sifraSelected = $scope.lista[0].id;
							$scope.racuna = $scope.lista[0].racuna;
							$scope.vlasnikRacuna = $scope.lista[0].vlasnikRacuna;
							$scope.banka = $scope.lista[0].banka;
							$scope.staroStanje = $scope.lista[0].staroStanje;
							$scope.naTeret = $scope.lista[0].naTeret;
							$scope.uKorist = $scope.lista[0].uKorist;
							$scope.novoStanje = $scope.lista[0].novoStanje;
							$scope.datum = new Date($scope.lista[0].datum);
							break;
						}
						else
						{
							$scope.sifraSelected = $scope.lista[i+1].id;
							$scope.racuna = $scope.lista[i+1].racuna;
							$scope.vlasnikRacuna = $scope.lista[i+1].vlasnikRacuna;
							$scope.banka = $scope.lista[i+1].banka;
							$scope.staroStanje = $scope.lista[i+1].staroStanje;
							$scope.naTeret = $scope.lista[i+1].naTeret;
							$scope.uKorist = $scope.lista[i+1].uKorist;
							$scope.novoStanje = $scope.lista[i+1].novoStanje;
							$scope.datum = new Date($scope.lista[i+1].datum);
							break;	
						}
					}
				}
			}
		}
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.racuna = null;
			$scope.vlasnikRacuna = null;
			$scope.banka = null;
			$scope.staroStanje = null;
			$scope.naTeret = null;
			$scope.uKorist = null;
			$scope.novoStanje = null;
			$scope.datum = null;
		}
		
		$scope.zoomPickup = function(){
			zoomStanjeLice.setZoom(true);
			
			if($scope.stanjeSearch){
				zoomStanjeLice.setPretraga(true);
			}
			
			zoomStanjeLice.setId($scope.sifraSelected);
			zoomStanjeLice.setStaroStanje($scope.staroStanje);
			zoomStanjeLice.setNaTeret($scope.naTeret);
			zoomStanjeLice.setUKorist($scope.uKorist);
			zoomStanjeLice.setNovoStanje($scope.novoStanje);
			zoomStanjeLice.setDatum($scope.datum);
			
			
			$state.go('racuni_klijenata');
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/dnevno_stanje/search',
						{id: $scope.sifraSelected, idRacuna: zoomStanjeLice.getIdRacuna(),
					staroStanje : $scope.staroStanje, naTeret : $scope.naTeret, uKorist : $scope.uKorist,
					novoStanje : $scope.novoStanje, datum : $scope.datum})
				.success(function(data, status, header){
					$scope.lista = data;
					$state.go('dnevno_stanje');
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
	});
})(angular)