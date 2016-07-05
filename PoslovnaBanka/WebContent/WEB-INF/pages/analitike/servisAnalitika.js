(function(angular){
	var app = angular.module('app');
	
	app.service('zoomServiceAnalitikaRacun', function(){
		var zoom = false;
		var pretraga = false;
		var duznikBoolean = false;
		var id = '';
		var duznik = '';
		var svrha = '';
		var poverilac = '';
		var datumPrijema = '';
		var datumValute = '';
		var racunDuznika = '';
		var modelZaduzenja = '';
		var pbZaduzenja = '';
		var racunPoverioca = '';
		var modelOdobrenja = '';
		var pbOdobrenja = '';
		var hitno = '';
		var iznos = '';
		var tipGreske = '';
		var status = '';
		var idVrstePlacanja = '';
		var nazivPlacanja = '';
		var idNaselje = '';
		var naselje = '';
		var idValute = '';
		var valuta = '';
		var idIzvoda = '';
		var idRacunaDuznika = '';
		var idRacunaPoverioca = '';
		var uplatnica = false;
		
				
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
			getDuznikBoolean : function(){
				return duznikBoolean;
			},
			setDuznikBoolean : function(value){
				duznikBoolean = value;
			},
			getId : function(){
				return id;
			},
			setId : function(value){
				id = value;
			},
			getDuznik : function(){
				return duznik;
			},
			setDuznik : function(value){
				duznik = value;
			},
			getSvrha : function(){
				return svrha;
			},
			setSvrha : function(value){
				svrha = value;
			},
			getPoverilac : function(){
				return poverilac;
			},
			setPoverilac : function(value){
				poverilac = value;
			},
			getDatumPrijema : function(){
				return datumPrijema;
			},
			setDatumPrijema : function(value){
				datumPrijema = value;
			},
			getDatumValute : function(){
				return datumValute;
			},
			setDatumValute : function(value){
				datumValute = value;
			},
			getRacunDuznika : function(){
				return racunDuznika;
			},
			setRacunDuznika : function(value){
				racunDuznika = value;
			},
			getModelZaduzenja : function(){
				return modelZaduzenja;
			},
			setModelZaduzenja : function(value){
				modelZaduzenja = value;
			},
			getPbZaduzenja : function(){
				return pbZaduzenja;
			},
			setPbZaduzenja : function(value){
				pbZaduzenja = value;
			},
			getRacunPoverioca : function(){
				return racunPoverioca;
			},
			setRacunPoverioca : function(value){
				racunPoverioca = value;
			},
			getModelOdobrenja : function(){
				return modelOdobrenja;
			},
			setModelOdobrenja : function(value){
				modelOdobrenja = value;
			},
			getPbOdobrenja : function(){
				return pbOdobrenja;
			},
			setPbOdobrenja : function(value){
				pbOdobrenja = value;
			},
			getHitno : function(){
				return hitno;
			},
			setHitno: function(value){
				hitno = value;
			},
			getIznos : function(){
				return iznos;
			},
			setIznos: function(value){
				iznos = value;
			},
			getTipGreske : function(){
				return tipGreske;
			},
			setTipGreske: function(value){
				tipGreske = value;
			},
			getStatus: function(){
				return status;
			},
			setStatus: function(value){
				status = value;
			},
			getIdVrstePlacanja: function(){
				return idVrstePlacanja;
			},
			setIdVrstePlacanja: function(value){
				idVrstePlacanja = value;
			},
			getNazivPlacanja: function(){
				return nazivPlacanja;
			},
			setNazivPlacanja: function(value){
				nazivPlacanja = value;
			},
			getIdNaselje: function(){
				return idNaselje;
			},
			setIdNaselje: function(value){
				idNaselje = value;
			},
			getNaselje: function(){
				return naselje;
			},
			setNaselje: function(value){
				naselje = value;
			},
			getIdValute: function(){
				return idValute;
			},
			setIdValute: function(value){
				idValute = value;
			},
			getValuta: function(){
				return valuta;
			},
			setValuta: function(value){
				valuta = value;
			},
			getIdIzvoda: function(){
				return idIzvoda;
			},
			setIdIzvoda: function(value){
				idIzvoda = value;
			},
			getIdRacunaDuznika: function(){
				return idRacunaDuznika;
			},
			setIdRacunaDuznika: function(value){
				idRacunaDuznika = value;
			},
			getIdRacunaPoverioca: function(){
				return idRacunaPoverioca;
			},
			setIdRacunaPoverioca: function(value){
				idRacunaPoverioca = value;
			},
			getUplatnica: function(){
				return uplatnica;
			},
			setUplatnica: function(value){
				uplatnica = value;
			}
		};
	});
})(angular)