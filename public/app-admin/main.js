define(['text!start/modules/login/templates/login.tpl.html','js/plugins/metismenu/jquery.metisMenu.js'],function(t,metis){

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



		tpl: _.template($(t).closest("#loginpopup").html()),
		el: 'body',
		events:{
			"click   #login":          "login",
			"click   .sidebar-collapse-icon":    "sidebarCollapse"

		},
		initialize: function(){
			
			console.log("init application ");
			$('#side-nav').metisMenu();

		},

		sidebarCollapse: function(e){
			e.preventDefault();
        	event.preventDefault();
        	$container.toggleClass('sidebar-collapsed').toggleClass('can-resize');
		},

		
	
	});

	return mainView;


});