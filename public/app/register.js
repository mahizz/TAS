$( document ).ready(function() {
	$('#registerform').submit(function(e) {
	   e.preventDefault();
	   $.ajax({
	        type: 'POST',
	        url: 'api/users',
	        data: $(this).serialize(),
			complete: function (response) {
				popup(response);
	      }
	   });

	})

function popup(response){
	if(response.status == 409 ){
		alert("user exists");
	}
	if(response.status == 201 ){
		alert("user created");
	}
};

});