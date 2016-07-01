(function(angular){
	var app = angular.module('app');
	
	app.service('zoomRacunPravnoService', function(){
		var zoom = false;
		var pretraga = false;
		var idKlijenta = '';
		var nazivKlijenta = '';
		var idBanke = '';
		var nazivBanke = '';
		var banka = false;
		
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
			getIdKlijenta : function(){
				return idKlijenta;
			},
			setIdKlijenta : function(value){
				idKlijenta = value
			},
			getNazivKlijenta : function(){
				return nazivKlijenta;
			},
			setNazivKlijenta : function(value){
				nazivKlijenta = value;
			},
			getIdBanke : function(){
				return idBanke;
			},
			setIdBanke : function(value){
				idBanke = value;
			},
			getNazivBanke : function(){
				return nazivBanke;
			},
			setNazivBanke : function(value){
				nazivBanke = value;
			},
			getBanka : function(){
				return banka;
			},
			setBanka : function(value){
				banka = value;
			}
		};
	});
})(angular)