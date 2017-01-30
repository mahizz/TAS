define([],function(){

	//script 

/*
    $(".sidebar-collapse-icon").click(function (event) {
        event.preventDefault();
        $container.toggleClass('sidebar-collapsed').toggleClass('can-resize');

        --if ($container.hasClass('can-resize')) {
         setTimeout(function () {
         $container.removeClass('can-resize');
         }, 500);
         } else {
         setTimeout(function () {
         $container.addClass('can-resize');
         }, 500);
         }--
    });

 	var $is_collapsed = false;
    if ($container.hasClass('sidebar-collapsed')) {
        $is_collapsed = true;
    }

    $window.resize(function resize() {

        var window_width = $window.outerWidth();
        if (window_width < 951 && window_width > 767) {
            if ($container.hasClass('can-resize') === false) {
                $container.addClass('sidebar-collapsed');
            }
        } else if (window_width < 767) {
            $container.removeClass('sidebar-collapsed');
            $container.removeClass('can-resize');
        } else {
            if ($container.hasClass('can-resize') === false && $is_collapsed === false) {
                $container.removeClass('sidebar-collapsed');
            }
        }
    }).trigger('resize');

    

*/	$container = $('div.page-container')

	var mainView = Backbone.View.extend({



		tpl: undefined,
		el: 'body',
		events:{
            "click   #logout":          "logout",
		},
		initialize: function(){
			
			console.log("init application ");

		},

		logout: function(e){
            console.log(document.cookie.split("=")[1]);
            var id = document.cookie.split("=")[1]
            $.ajax({
                url: '/login/'+id,
                type: 'DELETE',
                success: function(result) {
                    window.location.replace('/'); 

                }
            });
		},


		
	
	});

	return mainView;


});