(function(angular){
		var app = angular.module('app');
		
		app.service('kodoviBankeZoomServis', function() {
			var zoom = false;
			var sifra = '';
			var swift = '';
			var pibPravnogLica = '';
			var nazivPravnogLica = '';
			
			
			var pretraga = false;

			return {
				getZoom : function() {
					return zoom;
				},
				setZoom : function(value) {
					zoom = value;
				},
				getSifra : function()
				{
					return sifra;
				},
				setSifra : function(value)
				{
					sifra = value;
				},
				getSwift : function()
				{
					return swift;
				},
				setSwift : function(value)
				{
					swift = value;
				},
				setPibPravnogLica : function(value)
				{
					pibPravnogLica = value;
				},
				getPibPravnogLica : function()
				{
					return pibPravnogLica;
				},
				setNazivPravnogLica : function(value)
				{
					nazivPravnogLica = value;
				},
				getNazivPravnogLica : function()
				{
					return nazivPravnogLica;
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