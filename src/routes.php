<?php
// Routes

use \Models\Posts as posts;

$app->get('/test/[{id}]', function ($request, $response, $args) {

    $name = $request->getAttribute('name');
    $user = $this->db->table('users')->find($args['id']);
    
    var_dump($user);

    $response->getBody()->write("test nanan its ". $args['id']);

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


$app->post('/api/posts', function ($request, $response, $args) {
    $temp = file_get_contents('php://input');
    $data = json_decode($temp, true);
    $post =new posts();
    $post->title =$data['title'];
    $post->text =$data['text'];
    $response->getBody()->write("test nanan its ".$post->toJson());
    $post->save();
    return $response;
});


$app->post('/api/img', function ($request, $response, $args) {

    $plik_tmp = $_FILES['file']['tmp_name'] ;


    if(is_uploaded_file($plik_tmp)) { 
         move_uploaded_file($plik_tmp, "/posts". $_FILES['file']['name']); 
    } 
    $response->getBody()->write("image recived".var_dump($_FILES));
    return $response;
});

?>