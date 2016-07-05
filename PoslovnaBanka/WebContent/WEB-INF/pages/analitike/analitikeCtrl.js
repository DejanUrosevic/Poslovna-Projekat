(function(angular){
	var analitikeModul = angular.module('analitikeEntry', []);
	
	analitikeModul.controller('analitikeCtrl', function($scope, $http, $state, $stateParams){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/analitike/findAll')
		.success(function(data, status, header)
		{
			$scope.lista = data;
			
		});
		
		$scope.setSelected = function(id, duznik, svrha, poverilac, valuta, datumValute, iznos, racunDuznika, 
				modelZaduzenja, pbZaduzenja, racunDuznika, modelZaduzenja, pbZaduzenje, racunPoverioca, 
				modelOdobrenja, pbOdobrenja, nazivPlacanja, naselje, datumPrijema, hitno, tipGreske)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			
			$scope.sifraSelected = id;
			$scope.duznik = duznik;
			$scope.svrha = svrha;
			$scope.poverilac = poverilac;
			$scope.valuta =valuta;
			$scope.datumValute = new Date(datumValute);
			$scope.iznos =iznos;
			$scope.racunDuznika =racunDuznika;
			$scope.modelZaduzenja =modelZaduzenja;
			$scope.pbZaduzenje =pbZaduzenje;
			$scope.racunPoverioca =racunPoverioca;
			$scope.modelOdobrenja =modelOdobrenja;
			$scope.pbOdobrenja =pbOdobrenja;
			$scope.nazivPlacanja =nazivPlacanja;
			$scope.naselje =naselje;
			$scope.datumPrijema = new Date(datumPrijema);
			$scope.hitno =hitno;
			$scope.tipGreske =tipGreske;
		}
	});
})(angular)