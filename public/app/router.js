define([],function  () {
	
	var router = Backbone.Router.extend({
		routes: {
			"":                   "front",
			"help":               "help",    // #help
			"wall":     		  "invokeWallModule",
			"topic/:topicId":     "invokeTopic",
		},

		initialize: function(){
			if (!MyApp.Routers) {
					MyApp.Routers ={};
				}
		},

		help: function() {
			console.log("help help");    
		},
		front: function() {
			require(["start/modules/front/views/frontview"],function(view){
				this.frontview = new view();
			});   
		},

		invokeWallModule: function() {
			require(["start/modules/wall/wallrouter"],function(r){
				if (!MyApp.Routers.Wall) {
					MyApp.Routers.Wall = new r("wall");
				}
			});
		},

		invokeTopic: function(topicId) {
			require(["start/modules/wall/views/topicview"],function(view){
				console.log("topic: "+topicId);
				this.topicview = new view({id : topicId});
			});
		},


	
	});

	return new router();

});

