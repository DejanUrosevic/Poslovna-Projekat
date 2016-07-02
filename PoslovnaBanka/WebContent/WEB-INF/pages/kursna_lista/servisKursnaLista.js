(function(angular){
	var app = angular.module('app');
	
	app.service('zoomKursnaListaService', function(){
		var zoom = false;
		var pretraga = false;
		var izmena = false;
		
		var id = '';
		var brojKursneListe = '';
		var sifraBanke = '';
		var nazivBanke = '';
		var primenjujeSeOd = '';
		
			
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
			getId : function(){
				return id;
			},
			setId : function(value){
				id = value;
			},
			getBrojKursneListe : function(){
				return brojKursneListe;
			},
			setBrojKursneListe : function(value){
				brojKursneListe = value;
			},
			getSifraBanke : function(){
				return sifraBanke;
			},
			setSifraBanke : function(value){
				sifraBanke = value;
			},
			getNazivBanke : function(){
				return nazivBanke;
			},
			setNazivBanke : function(value){
				nazivBanke = value;
			},
			getPrimenjujeSeOd : function(){
				return primenjujeSeOd;
			},
			setPrimenjujeSeOd : function(value){
				primenjujeSeOd = value;
			}
		};
	});
})(angular)