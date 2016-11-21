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
    $post->img =$data['img'];
    $post->save();
    $post = posts::where('title', $data['title'])->first();
    $response->getBody()->write($post->toJson());
    return $response;
});


$app->post('/api/img', function ($request, $response, $args) {

    $plik_tmp = $_FILES['file']['tmp_name'] ;
    if(is_uploaded_file($plik_tmp)) { 
        move_uploaded_file($plik_tmp,$_SERVER['DOCUMENT_ROOT']. "/images/posts/".$_FILES['file']['name']); 
        $response->getBody()->write($_FILES['file']['name']);
        $response->withStatus(201);
    }else{
        $response->withStatus(400);
    }

    return $response;
});

?>