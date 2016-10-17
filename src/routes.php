<?php
// Routes


$app->get('/test', function ($request, $response) {

    $name = $request->getAttribute('name');

    $response->getBody()->write("test nanan its test");

    return $response;
});

$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/admin', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    // Render index view
    return $this->renderer->render($response, 'admin.phtml', $args);
});

$app->get('/login', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");
    // Render admin login view
    return $this->renderer->render($response, 'login.phtml', $args);
});

$app->post('/login', function ($request, $response, $args) {
	$login =$_POST['login'];
	$password =$_POST['password'];
	//hard coded users
	if($login=='test' && $password == 'test'){
		return $response->withStatus(200)->withHeader('Location', 'admin'); 
	}else{
		$args['login_error']=true;
		return $this->renderer->render($response, 'login.phtml', $args); 

	}

});



