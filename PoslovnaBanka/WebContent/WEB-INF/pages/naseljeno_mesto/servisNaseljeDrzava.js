(function(angular){
		var app = angular.module('app');
		
		app.service('zoomService', function() {
			var zoom = false;
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
				}
			};
		});
})(angular)