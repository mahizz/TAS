define(['start/modules/wall/views/wallview'],function  (view) {

	var r  = Backbone.SubRoute.extend({
		routes: {
			/* matches http://yourserver.org/books */
			""               : "showWall",

			/* matches http://yourserver.org/books/search */
			"search"         : "searchWall",

			/* matches http://yourserver.org/books/view/:bookId */
			"view/:bookId"   : "viewPost",
		},
		initialize: function(){
			this.wallView = new view();
		},

		showWall: function() {
			console.log("Wall router");
		},
		searchWall: function() {
			console.log("Wall test");
		},
		viewPost: function() {
			// ...module-specific code
		},
	});

	return r;
});

