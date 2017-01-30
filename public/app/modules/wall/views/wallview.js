
define(['text!start/modules/wall/templates/wall.tpl.html',
	'start/modules/wall/views/postview',
	'start/modules/wall/models/post.model',
	'start/modules/wall/collections/posts.col'],
	function(t,postView,postModel,posts){

		var wallView = Backbone.View.extend({

			el: '.main-content',
			tpl: _.template($(t).closest("#wall-main").html()),
			img:null,
			events: {
				"click   #add-post":          "add"	,
				"change  #postimg": "readurl"
			},

			initialize: function() {
				this.$posts = $("#posts");
				this.posts = new posts();
				this.render();
			},

			render: function() {
				$(this.el).html(this.tpl());
				return this;		
			},
			add: function(e){
				e.preventDefault();
				var data = this.$el.find("#new-post").serializeArray();
				var t = _(data).reduce(function(acc, field) {
					acc[field.name] = field.value;
					return acc;
				}, {});

				if(typeof t.title !== "undefined" && t.title !=""){
					var temp = new postModel(t);
	  
				    var form_data = new FormData();                  
				    form_data.append('file', img);  
				    var that = this;                      
				    $.ajax({
				                url: 'api/img', // point to server-side PHP script 
				                cache: false,
				                contentType: false,
				                processData: false,
				                data: form_data,                         
				                type: 'post',
				                success: function(php_script_response){
				                	temp.set('img',php_script_response);
									temp.save(null, {
										wait:true,
										success:function(model, response) {
											console.log("saved");
												that.posts.add(temp);
												var view = new postView({model : temp});
												$("#posts").append(view.render().el);
										},
										error: function(model, error) {
											console.log("error saving")
										}
				                	});
				            	}	
	     			})

				}else{
					alert("tytul nie moze byc pusty");
				}
			},
			readurl: function(e){
		        e.preventDefault();
		    	if (e.target.files && e.target.files[0]) {
		       		var reader = new FileReader();

		        	reader.onload = function (e) {
		            	//$('#blah').attr('src', e.target.result);
		            	console.log("add image")
		            	img=$('#postimg').prop('files')[0];
		            	$(imgpreview)[0].src=e.target.result;
		            	$(imgpreview)[0].style.visibility = "visible";
		       		}

		        	reader.readAsDataURL(e.target.files[0]);
		   		 }		     				
			}
			

	});

	return wallView;

});