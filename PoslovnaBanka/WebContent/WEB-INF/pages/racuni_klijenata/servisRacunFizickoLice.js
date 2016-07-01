(function(angular){
	var app = angular.module('app');
	
	app.service('zoomRacunFizickoService', function(){
		var zoom = false;
		var pretraga = false;
		var jmbg = '';
		var ime = '';
		var prezime = '';
		
		return {
			getZoom : function() {
				return zoom;
			},
			setZoom : function(value) {
				zoom = value;
			},
			getPretraga : function(){
				return pretraga;
			},
			setPretraga : function(value){
				pretraga = value;
			},
			getJmbg : function(){
				return jmbg;
			},
			setJmbg : function(value){
				jmbg = value;
			},
			getIme : function(){
				return ime;
			},
			setIme : function(value){
				ime = value;
			},
			getPrezime : function(){
				return prezime;
			},
			setPrezime : function(value){
				prezime = value;
			}
		};
	});
})(angular)