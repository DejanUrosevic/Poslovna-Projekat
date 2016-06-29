(function(angular){
	var mainModul = angular.module('mainEntry', []);
	
	mainModul.controller('mainCtrl', function($scope, $http, $state)
	{
		
		$scope.izborTabela = function()
		{
			if($scope.izborTab === '' || $scope.izborTab === null || $scope.izborTab === undefined)
			{
				alert('Izaberite tabelu iz liste.');
			}
			else
			{
				$state.go($scope.izborTab);
			}
			
		}
	});
})(angular)