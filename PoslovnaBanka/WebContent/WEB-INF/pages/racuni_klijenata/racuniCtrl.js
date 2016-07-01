(function(angular){
	var racuniModul = angular.module('racuniEntry', []);
	
	racuniModul.controller('racuniCtrl', function($scope, $http, $state, $stateParams){
		$scope.stanjePregled = true;
		
		$http.get('http://localhost:8080/PoslovnaBanka/racuni_klijenata/findAll')
		.success(function(data, status, header){
			$scope.listaRacuna = data;
		});
	});
})(angular)