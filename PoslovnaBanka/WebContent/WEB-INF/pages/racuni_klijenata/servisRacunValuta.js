(function(angular){
	var app = angular.module('app');
	
	app.service('zoomRacunValutaService', function(){
		var zoom = false;
		var pretraga = false;
		var izmena = false;
		var idValute = '';
		var nazivValute = '';
		
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
			getIzmena : function(){
				return izmena;
			},
			setIzmena : function(value){
				izmena = value;
			},
			getIdValute : function(){
				return idValute;
			},
			setIdValute : function(value){
				idValute = value;
			},
			getNazivValute : function(){
				return nazivValute;
			},
			setNazivValute : function(value){
				nazivValute = value;
			}
		};
	});
})(angular)