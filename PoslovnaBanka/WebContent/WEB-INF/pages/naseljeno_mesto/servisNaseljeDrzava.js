(function(angular){
		var app = angular.module('app');
		
		app.service('zoomService', function() {
			var zoom = false;
			
			var sifra = '';
			var naziv = '';
			var ptt = '';
			
			var sifraDrzave = '';
			var nazivDrzave = '';
			var pretraga = false;
			var izmena = false;

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
				setSifra : function(value)
				{
					sifra = value;
				},
				getSifra : function()
				{
					return sifra;
				},
				setNaziv : function(value)
				{
					naziv = value;
				},
				getNaziv : function()
				{
					return naziv;
				},
				setIzmena : function(value)
				{
					izmena = value;
				},
				getIzmena : function()
				{
					return izmena;
				},
				setPtt : function(value)
				{
					ptt = value;
				},
				getPtt : function()
				{
					return ptt;
				},
				
			};
		});
})(angular)