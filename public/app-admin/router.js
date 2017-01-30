define([],function  () {
	
	var router = Backbone.Router.extend({
		routes: {
			"help":                 "help",    // #help
			"users":     "invokeUsersModule",
			"posts":     "invokePostsModule"
		},

		initialize: function(){
			if (!MyAdmin.Routers) {
					MyAdmin.Routers ={};
				}
		},

		help: function() {
			console.log("help admin  help");    
		},

		invokeUsersModule: function() {
			require(["start/modules/users/views/usersview"],function(view){
				MyAdmin.users = new view();
			});
		},
		invokePostsModule: function(){
			require(["start/modules/draw/drawrouter"],function(r){
				if(!MyAdmin.Routers.Draw){
					MyAdmin.Routers.Draw = new r("draw");
				}
			});
		}
	});

	return new router();

});

