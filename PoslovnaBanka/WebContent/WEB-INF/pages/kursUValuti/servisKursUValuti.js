(function(angular){
	var app = angular.module('app');
	
	app.service('zoomKursUValutiService', function(){
		var zoom = false;
		var pretraga = false;
		var izmena = false;
		var osnovna = false;
		var prema = false;
		
		var redniBroj = '';
		var kupovni = '';
		var srednji = '';
		var prodajni = '';
		var idKursneListe = '';
		var primenjujeSeOd = '';
		var idOsnovneValute = '';
		var nazivOsnovneValute = '';
		var idPremaValuti = '';
		var nazivPremaValuti = '';
		
		
			
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
			getRedniBroj : function(){
				return redniBroj;
			},
			setRedniBroj : function(value){
				redniBroj = value;
			},
			getKupovni : function(){
				return kupovni;
			},
			setKupovni : function(value){
				kupovni = value;
			},
			getSrednji : function(){
				return srednji;
			},
			setSrednji : function(value){
				srednji = value;
			},
			getProdajni : function(){
				return prodajni;
			},
			setProdajni : function(value){
				prodajni = value;
			},
			getIdKursneListe : function(){
				return idKursneListe;
			},
			setIdKursneListe : function(value){
				idKursneListe = value;
			},
			getPrimenjujeSeOd : function(){
				return primenjujeSeOd;
			},
			setPrimenjujeSeOd : function(value){
				primenjujeSeOd = value;
			},
			getIdOsnovneValute : function(){
				return idOsnovneValute;
			},
			setIdOsnovneValute : function(value){
				idOsnovneValute = value;
			},
			getNazivOsnovneValute : function(){
				return nazivOsnovneValute;
			},
			setNazivOsnovneValute : function(value){
				nazivOsnovneValute = value;
			},
			getIdPremaValuti : function(){
				return idPremaValuti;
			},
			setIdPremaValuti : function(value){
				idPremaValuti = value;
			},
			getNazivPremaValuti : function()
			{
				return nazivPremaValuti;
			},
			setNazivPremaValuti : function(value)
			{
				nazivPremaValuti = value;
			},
			getOsnovna : function()
			{
				return osnovna;
			},
			setOsnovna : function(value)
			{
				osnovna = value;
			},
			getPrema : function()
			{
				return prema;
			},
			setPrema : function(value)
			{
				prema = value;
			}
		};
	});
})(angular)