(function(angular){
		var app = angular.module('app');
		
		app.service('zoomValuteService', function() {
			var zoom = false;
			
			var idvalute = null;
			var naziv = '';
			var zvanicnaSifra = '';
			var domicilna = null;
			var sifraDrzave = '';
			var nazivDrzave = '';
			var pretraga = false;

			return {
				getZoom : function() {
					return zoom;
				},
				setZoom : function(value) {
					zoom = value;
				},
				getSifraDrzave : function()
				{
					return sifraDrzave;
				},
				setSifraDrzave : function(value)
				{
					sifraDrzave = value;
				},
				getNazivDrzave : function()
				{
					return nazivDrzave;
				},
				setNazivDrzave : function(value)
				{
					nazivDrzave = value;
				},
				getPretraga : function()
				{
					return pretraga;
				},
				setPretraga : function(value)
				{
					pretraga = value;
				},
				setIdValute : function(value)
				{
					idValute = value;
				},
				getIdValute : function()
				{
					return idValute;
				},
				setNaziv : function(value)
				{
					naziv = value;
				},
				getNaziv : function()
				{
					return naziv;
				},
				setZvanicnaSifra : function(value)
				{
					zvanicnaSifra = value;
				},
				getZvanicnaSifra : function()
				{
					return zvanicnaSifra;
				},
				setDomicilna : function(value)
				{
					domicilna = value;
				},
				getDomicilna : function()
				{
					return domicilna;
				}
				
			};
		});
})(angular)