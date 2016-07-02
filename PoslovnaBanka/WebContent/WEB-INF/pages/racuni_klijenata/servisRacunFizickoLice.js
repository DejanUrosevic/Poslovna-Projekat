(function(angular){
	var app = angular.module('app');
	
	app.service('zoomRacunFizickoService', function(){
		var zoom = false;
		var pretraga = false;
		var jmbg = '';
		var ime = '';
		var prezime = '';
		
		var idValute = '';
		var nazivValute = '';	
		var sifraSelected = '';
		var pibKlijenta = '';
		var nazivKlijenta = '';
		var pibBanka = '';
		var banka = '';
		var brRacuna = '';
		var datumOtvaranja = '';
		var validan = true;
		
		var klijent = false;
		var pravnoLice = false;
		
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
			},
			getSifraSelected : function(){
				return sifraSelected;
			},
			setSifraSelected : function(value){
				sifraSelected = value;
			},
			getPibKlijenta : function(){
				return pibKlijenta;
			},
			setPibKlijenta : function(value){
				pibKlijenta = value;
			},
			getNazivKlijenta : function(){
				return nazivKlijenta;
			},
			setNazivKlijenta : function(value){
				nazivKlijenta = value;
			},
			getPibBanka : function(){
				return pibBanka;
			},
			setPibBanka : function(value){
				pibBanka = value;
			},
			getBanka : function(){
				return banka;
			},
			setBanka : function(value){
				banka = value;
			},
			getBrRacuna : function(){
				return brRacuna;
			},
			setBrRacuna : function(value){
				brRacuna = value;
			},
			getDatumOtvaranja : function(){
				return datumOtvaranja;
			},
			setDatumOtvaranja : function(value){
				datumOtvaranja = value;
			},
			getValidan : function(){
				return validan;
			},
			setValidan : function(value){
				validan = value;
			},
			getKlijent : function(){
				return klijent;
			},
			setKlijent : function(value){
				klijent = value;
			},
			getPravnoLice : function(){
				return pravnoLice;
			},
			setPravnoLice : function(value){
				pravnoLice = value;
			}
		};
	});
})(angular)