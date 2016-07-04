(function(angular){
	var app = angular.module('app');
	
	app.service('zoomStanjeLice', function(){
		var zoom = false;
		var id = '';
		var racun = '';
		var vlasnik = '';
		var banka = '';
		var staroStanje = '';
		var naTeret = '';
		var uKorist = '';
		var novoStanje = '';
		var datum = '';
		var pretraga = false;
		
		var idRacuna = '';
		
		return {
			getZoom : function(){
				return zoom;
			},
			setZoom : function(value){
				zoom = value;
			},
			getPretraga : function(){
				return pretraga;
			},
			setPretraga : function(value){
				pretraga = value;
			},
			getIdRacuna : function(){
				return idRacuna;
			},
			setIdRacuna : function(value){
				idRacuna = value;
			},
			getId : function(){
				return id;
			},
			setId : function(value){
				id = value;
			},
			getRacun : function(){
				return racun;
			},
			setRacun : function(value){
				racun = value;
			},
			getVlasnik : function(){
				return vlasnik;
			},
			setVlasnik : function(value){
				vlasnik = value;
			},
			getBanka : function(){
				return banka;
			},
			setBanka : function(value){
				banka = value;
			},
			getStaroStanje : function(){
				return staroStanje;
			},
			setStaroStanje : function(value){
				staroStanje = value;
			},
			getNaTeret : function(){
				return naTeret;
			},
			setNaTeret : function(value){
				naTeret = value;
			},
			getUKorist : function(){
				return uKorist;
			},
			setUKorist : function(value){
				uKorist = value;
			},
			getNovoStanje : function(){
				return novoStanje;
			},
			setNovoStanje : function(value){
				novoStanje = value;
			},
			getDatum : function(){
				return datum;
			},
			setDatum : function(value){
				datum = value;
			}
		}
	});
})(angular)