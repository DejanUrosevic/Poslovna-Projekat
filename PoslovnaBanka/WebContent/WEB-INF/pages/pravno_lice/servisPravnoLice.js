(function(angular){
	var app = angular.module('app');
	
	app.service('zoomServiceFizickoLice', function(){
		var zoom = false;
		var pib = '';
		var naziv = '';
		var adresa = '';
		var email = '';
		var web = '';
		var telefon = '';
		var fax = '';
		var banka = null;
		
		var jmbgKlijenta = '';
		var imeKlijenta = '';
		var prezimeKlijenta = '';
		
		var pretraga = false;
		var izmena = false;
		
		return {
			getZoom : function() {
				return zoom;
			},
			setZoom : function(value) {
				zoom = value;
			},
			getJmbgKlijenta : function(){
				return jmbgKlijenta;
			},
			setJmbgKlijenta : function(value){
				jmbgKlijenta = value;
			},
			getImeKlijenta : function(){
				return imeKlijenta;
			},
			setImeKlijenta : function(value){
				imeKlijenta = value;
			},
			getPrezimeKlijenta : function(){
				return prezimeKlijenta;
			},
			setPrezimeKlijenta : function(value){
				prezimeKlijenta = value;
			},
			getPretraga : function()
			{
				return pretraga;
			},
			setPretraga : function(value)
			{
				pretraga = value;
			},
			getIzmena : function()
			{
				return izmena;
			},
			setIzmena : function(value)
			{
				izmena = value;
			},
			getPib : function()
			{
				return pib;
			},
			setPib : function(value)
			{
				pib = value;
			},
			getNaziv : function()
			{
				return naziv;
			},
			setNaziv : function(value)
			{
				naziv = value;
			},
			getAdresa : function()
			{
				return adresa;
			},
			setAdresa : function(value)
			{
				adresa = value;
			},
			getEmail : function()
			{
				return email;
			},
			setEmail : function(value)
			{
				email = value;
			},
			getWeb : function()
			{
				return web;
			},
			setWeb : function(value)
			{
				web = value;
			},
			getTelefon : function()
			{
				return telefon;
			},
			setTelefon : function(value)
			{
				telefon = value;
			},
			getFax : function()
			{
				return fax;
			},
			setFax : function(value)
			{
				fax = value;
			},
			getBanka : function()
			{
				return banka;
			},
			setBanka : function(value)
			{
				banka = value;
			}
			
		};
	});
})(angular)