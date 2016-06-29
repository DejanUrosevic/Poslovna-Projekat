(function(angular){
	
	var valuteModul = angular.module('valuteEntry', []);
	
	
	valuteModul.controller('valuteCtrl', function($scope, $http, $state, $stateParams, zoomService)
	{
		$scope.stanjePregled = true;
		$scope.zoom = zoomService.getZoom();
		
		$scope.zoomPickup = function()
		{
			zoomService.setSifraDrzave($scope.sifraSelected);
			zoomService.setNazivDrzave($scope.nazivDrzava);
			$state.go('valute');
		}
		
		$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
		.success(function(data, status, header)
		{
			$scope.listaValuta = data;
			
		});
		
		//funkcija koja podesava koji ce biti selektovani red
		$scope.setSelected = function(id, zvanicnaSifra, naziv, domicilna, drzSifra, drzNaziv)
		{
			$scope.stanjeAdd = false;
			$scope.stanjePregled = false;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = true;
			
			
			$scope.sifraSelected = id;
			$scope.zvanicnaSifra = zvanicnaSifra;
			$scope.naziv = naziv;
			$scope.domicilna = domicilna;
			$scope.sifraDrzava = drzSifra;
			$scope.nazivDrzava = drzNaziv;
		}
		
		//refresovanje liste drzava
		$scope.refreshState = function(){
			$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
			.success(function(data, status, header)
			{
				$scope.listaValuta = data;
				
				$scope.sifraSelected = null;
				$scope.zvanicnaSifra = null;
				$scope.naziv = null;
				$scope.domicilna = null;
				$scope.sifraDrzava = null;
				$scope.nazivDrzava = null;
			});
		}
		
		
		$scope.stanjeDodavanje = function()
		{
			$scope.stanjeAdd = true;
			$scope.stanjeSearch = false;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			
			$scope.sifraSelected = null;
			$scope.zvanicnaSifra = null;
			$scope.naziv = null;
			$scope.domicilna = null;
			$scope.sifraDrzava = null;
			$scope.nazivDrzava = null;
		}
		
		
		$scope.stanjePretrage = function(){
			$scope.stanjeAdd = false;
			$scope.stanjeSearch = true;
			$scope.stanjeIzmena = false;
			$scope.stanjePregled = false;
			
			$scope.sifraSelected = null;
			$scope.zvanicnaSifra = null;
			$scope.naziv = null;
			$scope.domicilna = null;
			$scope.sifraDrzava = null;
			$scope.nazivDrzava = null;
		}
		
		$scope.commitAction = function()
		{
			if($scope.stanjeAdd)
			{
				if($scope.izmenaDomicilna === '' || $scope.izmenaDomicilna === undefined || $scope.izmenaDomicilna === null)
				{
					alert('Izaberite da li je valuta strana ili domaca.');
				}
				
				
				$http.post('http://localhost:8080/PoslovnaBanka/valute/save',
						{sifra: $scope.sifraSelected, zvanicnaSifra: $scope.zvanicnaSifra, naziv: $scope.naziv, domicilna: $scope.izmenaDomicilna, sifraDrzava: $scope.sifraDrzava, nazivDrzava: $scope.nazivDrzava})
				.success(function(data, status, header)
				{
					$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
					.success(function(data, status, header)
					{	
						$scope.listaValuta = data;
						for(var i=0; i<$scope.listaValuta.length; i++)
						{
							if($scope.sifraSelected == $scope.listaValuta[i].idvalute)
							{
								$scope.sifraSelected = $scope.listaValuta[i].idvalute;
								break;
							}
						}
						$state.go('valute');
					});
				});
			}
			else if($scope.stanjeSearch){
				$http.post('http://localhost:8080/PoslovnaBanka/valute/search',
						{sifra: $scope.sifraSelected, zvanicnaSifra: $scope.zvanicnaSifra, naziv: $scope.naziv, domicilna: $scope.izmenaDomicilna, sifraDrzava: $scope.sifraDrzava, nazivDrzava: $scope.nazivDrzava})
				.success(function(data, status, header){
					
					$scope.listaValuta = data;
					$state.go('valute');
				});
			}
			else if($scope.stanjeIzmena)
			{
				if($scope.izmenaDomicilna === '' || $scope.izmenaDomicilna === undefined || $scope.izmenaDomicilna === null)
				{
					alert('Izaberite da li je valuta strana ili domaca.');
				}
				
				$http.post('http://localhost:8080/PoslovnaBanka/valute/update',
						{sifra: $scope.sifraSelected, zvanicnaSifra: $scope.zvanicnaSifra, naziv: $scope.naziv, domicilna: $scope.izmenaDomicilna, sifraDrzava: $scope.sifraDrzava, nazivDrzava: $scope.nazivDrzava})
				.success(function(data, status, header){
					$http.get('http://localhost:8080/PoslovnaBanka/valute/findAll')
					.success(function(data, status, header)
					{
						$scope.listaValuta = data;
						$state.go('valute');
					});
				});
			}
			else
			{
				alert('Morate selektovati stanje.');
			}	
		}
		
	});
	
})(angular)