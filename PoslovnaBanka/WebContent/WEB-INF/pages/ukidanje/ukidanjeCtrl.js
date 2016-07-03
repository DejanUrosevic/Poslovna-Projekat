(function(angular){
	var ukidanjeModul = angular.module('ukidanjeEntry', []);
	
	ukidanjeModul.controller('ukidanjeCtrl',function($scope, $http, $state, $stateParams){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/ukidanje/findAll')
		.success(function(data, status, header){
			$scope.listaRacuna = data;
		});
		
		$scope.setSelected = function(id, nazivVlasnika, brRacuna, banka, racunZaPrebacivanje, vlasnikRacunaZaPrebacivanje, datum){
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
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
		
		
	});
})(angular)