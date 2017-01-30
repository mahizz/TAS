/*
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/plugins/metismenu/jquery.metisMenu.js"></script>
<script src="js/plugins/blockui-master/jquery-ui.js"></script>
<script src="js/plugins/blockui-master/jquery.blockUI.js"></script>

<script src="js/plugins/flot/jquery.flot.min.js"></script>
<script src="js/plugins/flot/jquery.flot.tooltip.min.js"></script>
<script src="js/plugins/flot/jquery.flot.resize.min.js"></script>
<script src="js/plugins/flot/jquery.flot.selection.min.js"></script>        
<script src="js/plugins/flot/jquery.flot.pie.min.js"></script>
<script src="js/plugins/flot/jquery.flot.time.min.js"></script>
<script src="js/functions.js"></script>

<script src="js/plugins/chartjs/Chart.min.js"></script>

*/

require.config({
	baseUrl: '../js',
    paths: {
        'vendors': '../vendors',
        'js': '../js',
        'start': '../app-admin'
    }

/*

   'backbone.layoutmanager': {
            deps: ['backbone']
            exports: 'Backbone.LayoutManager'
        }

*/

});

var MyAdmin = MyAdmin || {};

//	"vendors/bower_components/sweetalert/dist/sweetalert.min"

require(['js/jquery.min', 'js/underscore', ],function(){

	require([
			'js/backbone',
			'js/bootstrap.min',
			'js/backbone.subroute'],
		function(){

	
		require(['start/router','start/main'], function(router,main){
			//new router 
			MyAdmin.router = router;
			console.log("history start");
			Backbone.history.start();

			MyAdmin.mainView = new main();

		});	
	

	});

});

