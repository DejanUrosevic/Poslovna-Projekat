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
		
		var idValute = '';
		var nazivValute = '';
		var sifraSelected = '';
		var jmbgKlijenta = '';
		var imeKlijenta = '';
		var prezimeKlijenta = '';
		var brRacuna = '';
		var datumOtvaranja = '';
		var validan = true;
		
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
			getSifraSelected : function(){
				return sifraSelected;
			},
			setSifraSelected : function(value){
				sifraSelected = value;
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