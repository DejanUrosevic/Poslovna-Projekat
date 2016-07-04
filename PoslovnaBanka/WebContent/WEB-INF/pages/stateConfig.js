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
		.state('valute', {url: '/valute',
			templateUrl: 'valute/valute.html',
			controller: 'valuteCtrl'
		})
		.state('valute_drzava', {url: '/drzava/:id/valute',
			templateUrl: 'valute/valute.html',
			controller: 'valuteCtrl'
		})
		.state('pravno_lice', {url: '/pravno_lice',
			templateUrl: 'pravno_lice/pravno_lice.html',
			controller: 'pravnoLiceCtrl'
		})
		.state('ovlasceno_lice', {url: '/lice/:id/pravno_lice',
			templateUrl: 'pravno_lice/pravno_lice.html',
			controller: 'pravnoLiceCtrl'
		})
		.state('vrstePlacanja', {url: '/vrstePlacanja',
			templateUrl: 'vrstePlacanja/vrstePlacanja.html',
			controller: 'vrstePlacanjaCtrl'
		})
		.state('kodoviBanke', {url: '/kodoviBanke',
			templateUrl: 'kodoviBanke/kodoviBanke.html',
			controller: 'kodoviBankeCtrl'
		})
		.state('pravni_kod_banke', {url: '/pravno_lice/:id/kod_banke',
			templateUrl: 'kodoviBanke/kodoviBanke.html',
			controller: 'kodoviBankeCtrl'
		})
		.state('racuni_klijenata', {url: '/racuni_klijenata',
			templateUrl: 'racuni_klijenata/racuni.html',
			controller: 'racuniCtrl'
		})
		.state('kursna_lista', {url: '/kursne_liste',
			templateUrl: 'kursna_lista/kursnaLista.html',
			controller: 'kursnaListaCtrl'
		})
		.state('pravna_lica_kurs', {url: '/pravno_lice/:id/kursne_liste',
			templateUrl: 'kursna_lista/kursnaLista.html',
			controller: 'kursnaListaCtrl'
		})
		.state('ukidanje', {url: '/ukidanje',
			templateUrl: 'ukidanje/ukidanje.html',
			controller: 'ukidanjeCtrl'
		})
		.state('kurs_u_valuti', {url: '/kurs_u_valuti',
			templateUrl: 'kursUValuti/kursUValuti.html',
			controller: 'kursUValutiCtrl'
		})
		.state('dnevno_stanje', {url: '/dnevno_stanje',
			templateUrl: 'dnevno_stanje/dnevno_stanje.html',
			controller: 'stanjeCtrl'
		})
	});
})(angular)
