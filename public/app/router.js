define([],function  () {
	
	var router = Backbone.Router.extend({
		routes: {
			"help":                 "help",    // #help
			"wall":     "invokeWallModule",
			"draw":     "invokeDrawModule"
		},

		initialize: function(){
			if (!MyApp.Routers) {
					MyApp.Routers ={};
				}
		},

		help: function() {
			console.log("help help");    
		},

		invokeWallModule: function() {
			require(["start/modules/wall/wallrouter"],function(r){
				if (!MyApp.Routers.Wall) {
					MyApp.Routers.Wall = new r("wall");
				}
			});
		},
		invokeDrawModule: function(){
			require(["start/modules/draw/drawrouter"],function(r){
				if(!MyApp.Routers.Draw){
					MyApp.Routers.Draw = new r("draw");
				}
			});
		}
	});

	return new router();

});

