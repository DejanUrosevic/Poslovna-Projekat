(function(angular){
	var app = angular.module('app');
	
	app.service('zoomServiceUkidanje', function(){
		var zoom = false;
		var pretraga = false;
		
		var sifraSelected = '';
		//onaj kome se ukida
		var ime = '';
		var prezime = '';
		
		var naziv = '';
		
		//onaj kome se prebacuje
		var ime2 = '';
		var prezime2 = '';
		
		var naziv2 = '';
		
		//racun koji se gasi
		var brRacuna = '';
		//racun na koji se prebacuju sredstva
		var brRacunaPrebacivanje = '';
		
		var vlasnikPrebacivanje = '';
		var vlasnik = '';
		
		var datum = '';
		var nazivBanke = '';
		var idRacuna = '';
		
		var klijent = true;
		
		return {
			getZoom : function() {
				return zoom;
			},
			setZoom : function(value) {
				zoom = value;
			},
			getPretraga : function()
			{
				return pretraga;
			},
			setPretraga : function(value)
			{
				pretraga = value;
			},
			getIdRacuna : function(){
				return idRacuna;
			},
			setIdRacuna : function(value){
				idRacuna = value;
			},
			getVlasnikPrebacivanje : function(){
				return vlasnikPrebacivanje;
			},
			setVlasnikPrebacivanje : function(value){
				vlasnikPrebacivanje = value;
			},
			getVlasnik : function(){
				return vlasnik;
			},
			setVlasnik : function(value){
				vlasnik = value;
			},
			getKlijent : function(){
				return klijent;
			},
			setKlijent : function(value){
				klijent = value;
			},
			getSifraSelected : function(){
				return sifraSelected;
			},
			setSifraSelected : function(value){
				sifraSelected = value;
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
			},
			getNaziv : function(){
				return naziv;
			},
			setNaziv : function(value){
				naziv = value;
			},
			getIme2 : function(){
				return ime2;
			},
			setIme2 : function(value){
				ime2 = value;
			},
			getPrezime2 : function(){
				return prezime2;
			},
			setPrezime2 : function(value){
				prezime2 = value;
			},
			getNaziv2 : function(){
				return naziv2;
			},
			setNaziv2 : function(value){
				naziv2 = value;
			},
			getBrRacuna : function(){
				return brRacuna;
			},
			setBrRacuna : function(value){
				brRacuna = value;
			},
			getBrRacunaPrebacivanje : function(){
				return brRacunaPrebacivanje;
			},
			setBrRacunaPrebacivanje : function(value){
				brRacunaPrebacivanje = value;
			},
			getDatum : function(){
				return datum;
			},
			setDatum : function(value){
				datum = value;
			},
			getNazivBanke : function(){
				return nazivBanke;
			},
			setNazivBanke : function(value){
				nazivBanke = value;
			}
		}
	});
})(angular)