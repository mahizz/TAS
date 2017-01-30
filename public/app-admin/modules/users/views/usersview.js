define(['text!start/modules/users/templates/users.tpl.html',
	'start/modules/users/models/user.model',
	'start/modules/users/collections/users.col'],
	function(t,user,users){
		
		var userView = Backbone.View.extend({
			tagName:  'li',
			//el: '.list-group',
			tpl: _.template($(t).closest("#user").html()),
			model: null,
			events: {
				'click .destroy': 'clear',
			},

			initialize: function() {
				this.listenTo(this.model, 'destroy', this.remove);
			
			},

			render: function() {
				this.$el.html(this.tpl(this.model.toJSON()));
				return this;		
			},	

			clear: function(){
				this.model.destroy();
			}
	});


		var usersListView = Backbone.View.extend({

			el: '.list-group',
			collection: null,
			events: {

			},

			initialize: function() {
				this.collection = new users;
				this.listenTo(this.collection, 'sync', this.render);
				this.collection.fetch();
			},

			render: function() {
				this.collection.each(this.addUser,this)
				return this;		
			},	

			addUser: function(temp) {
				var view = new userView({
					model : temp
				});
				$(this.el).append(view.render().el);
			},
	});

	return usersListView;

});