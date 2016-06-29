(function(angular){
	var app = angular.module('app');
	
	app.config(function($stateProvider, $urlRouterProvider)
	{
		$urlRouterProvider.otherwise('/main');
			
		$stateProvider
		.state('main', {url : '/main',
			templateUrl : 'main.html',
			controller : 'mainCtrl'
		})
		.state('drzava', {url : '/drzave',
			templateUrl : 'drzava/drzava.html',
			controller : 'drzavaCtrl'
		})
		.state('drzava_naselje', {url: '/drzava/:id/naseljena_mesta',
			templateUrl: 'naseljeno_mesto/naseljeno_mesto.html',
			controller: 'naseljenoMestoCtrl'
		})
		.state('naseljeno_mesto', {url: '/naseljeno_mesto',
			templateUrl: 'naseljeno_mesto/naseljeno_mesto.html',
			controller: 'naseljenoMestoCtrl'
		})
		.state('fizicko_lice', {url: '/lica',
			templateUrl: 'fizicko_lice/fizicko_lice.html',
			controller: 'fizickoLiceCtrl'
		})
		.state('pravno_lice', {url: '/pravno_lice',
			templateUrl: 'pravno_lice/pravno_lice.html',
			controller: 'pravnoLiceCtrl'
		})
	});
})(angular)
