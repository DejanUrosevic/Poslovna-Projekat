(function(angular){
	var app = angular.module('app');
	
	app.service('zoomServiceFizickoLice', function(){
		var zoom = false;
		var jmbgKlijenta = '';
		var imeKlijenta = '';
		var prezimeKlijenta = '';
		var pretraga = false;
		
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
			}
		};
	});
})(angular)