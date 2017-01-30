define(['text!start/modules/wall/templates/topic.tpl.html',
	'start/modules/wall/models/comment.model',
	'start/modules/wall/collections/comments.col'],
	function(t,commentModel,comments){
	
	var commentView = Backbone.View.extend({
		el: '.card w-item',
		tpl: _.template($(t).closest("#wall-comment").html()),

		events: {
			
		},
		initialize: function() {
			this.render;		
		},

		render: function() {
			$(this.el).append(this.tpl(this.model.toJSON()));
			return this;		
		},
		add: function(e){
			e.preventDefault();
			$('#header').removeClass('search-toggled');
		}

	});

	var postView = Backbone.View.extend({
		tagname: 'div',
		tpl: _.template($(t).closest("#wall-post").html()),
		model: undefined,
		collection: undefined,
		rating: undefined,
		events: {
			"click   .comment-open":          "toggleCommentOn", 
			"click   .comment-close":         "toggleCommentOff", 
			"click   .comment-add":           "comment",
			"click   #stars":           "stars",
			"click   #rate":           "rate"
		},

		initialize: function() {
			this.collection = new comments();
			this.collection.url = this.collection.url +"/"+ this.model.id;
			this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.model, 'sync', this.update);
			this.collection.fetch();
			//this.render();
		},

		render: function() {
			this.el.innerHTML = this.tpl(this.model.toJSON());
			this.collection.each(this.addComment, this);
			return this;		
		},		
		update: function() {
			this.el.innerHTML = this.tpl(this.model.toJSON());
			return this;		
		},

		addComment: function(temp) {
			var view = new commentView({
				el : $(".list-group"),
				model : temp
			});

			view.render();
		},

		toggleCommentOn: function(e){
			console.log("test");
            if(!$(e.currentTarget).closest('.wic-form').hasClass('toggled')) {
                $(e.currentTarget).closest('.wic-form').addClass('toggled');
            }
		},

		toggleCommentOff: function(e){
            if($(e.currentTarget).closest('.wic-form').hasClass('toggled')) {
				$(e.currentTarget).closest('.wic-form').find('textarea').val('');
				$(e.currentTarget).closest('.wic-form').removeClass('toggled');
			}
		},
		stars: function(e){
			if( typeof e.target.value !== "undefined"){
				this.rating = e.target.value;

			}
		},
		rate: function(e){
			e.preventDefault();
			var temp = {
				"value": this.rating
			};
			if( typeof this.rating !== "undefined"){
	           var that = this;
	       		$.ajax({
		            url: 'api/scores/'+this.model.id, // point to server-side PHP script                         
		            type: 'post',
		            data: temp,
		            success: function(php_script_response){
		            	that.model.fetch();
		        	},
		        	error: function(xhr, ajaxOptions, thrownErro){
		        		if(xhr.status == 401){
		        			alert("zaloguj sie");
		        		}
		        		if(xhr.status == 409){
		        			alert("juz oceniles");
		        		}
		        	}
				})
			}else{
				alert("wystaw ocene");
			}

		},
		comment: function(e){
			e.preventDefault();
			var data = $('textarea').val();
			if(typeof data !== "undefined" && data !=""){
				var temp = new commentModel({
					text : data,
					postid : this.model.id
				});
				temp.save();
				this.collection.fetch();				
			}else{
				alert("komentaz nie moze byc pusty");
			}

		}

	});

	return postView;

});