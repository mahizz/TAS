define(['start/modules/wall/views/wallview'],
	function  (view,topic) {

	var r  = Backbone.SubRoute.extend({
		routes: {
			/* matches http://yourserver.org/books */
			""               : "showWall",

			/* matches http://yourserver.org/books/search */
			"search"         : "searchWall",

			/* matches http://yourserver.org/books/view/:bookId */
			"topic/:topicId"   : "viewTopic",
		},
		initialize: function(){
			
            $.ajax({
                url: '/test',
                type: 'get',
                success: function(result) {  
                    this.wallView = new view();
                },
                error: function(error){
                	window.location.replace('/login');
                }
            });
		},

		showWall: function() {
			console.log("Wall router");
		},
		searchWall: function() {
			console.log("Wall test");
		},
		viewTopic: function(topicId) {
			this.topicView = new topic();
			this.topicView.topicId = topicId;
		},
	});

	return r;
});

