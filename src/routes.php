<?php
// Routes

use \Models\Posts as posts;
use \Models\Comments as comments;
use \Models\User as Users;
use \Models\Session as Ses;
use \Models\Score as score;


$app->get('/test', function ($request, $response, $args) {
    if(isset( $_SESSION["user"])){
        return $response->withStatus(200); 
    }else{
        return $response->withStatus(409);
    }
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
    if($_SESSION["admin"]==true){
        return $this->renderer->render($response, 'admin.phtml', $args);
    }else{
        return $response->withStatus(401)->withHeader('Location', '/login');
    }
    
});


$app->get('/login', function ($request, $response, $args) {
    if(isset( $_SESSION["user"])){
        $response->withStatus(200)->withHeader('Location', '/');
        return $this->renderer->render($response, 'index.phtml', $args); 
    }else{

        $this->logger->info("Slim-Skeleton '/login' route");
        // Render admin login view
        return $this->renderer->render($response, 'login.phtml', $args);
    }
});

$app->post('/login', function ($request, $response, $args) {
    $sid = session_id();
	$login =$_POST['login'];
	$password =$_POST['password'];
    $user = Users::where('name', $login)->where('password', md5($password))->first();
	if(isset($user) && !empty($user) ){
        $_SESSION["user"] = $login;
        if($user->admin == 1){
            $_SESSION["admin"]=1;
        }
        $sess = new Ses();
        $sess->userId = $user->id;
        $sess->id = $sid;
        $sess->save();
		return $response->withStatus(200)->withHeader('Location', '/'); 
	}else{
		$args['login_error']=true;
		return $this->renderer->render($response, 'login.phtml', $args); 
	}
});

//logout
$app->delete('/login/[{id}]', function ($request, $response, $args) {
    session_destroy();   
    $sess = Ses::find($args['id']);
    $sess->delete();
    return $response->withStatus(204);
});

$app->get('/register', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/register' route");
    // Render admin login view
    return $this->renderer->render($response, 'register.phtml', $args);
});

$app->post('/api/users', function ($request, $response, $args) {
    $login =$_POST['login'];
    $password =$_POST['password'];

    $user = users::where('name', $login)
                        ->first();
    if(isset($user) && !empty($user)){
        return $response->withStatus(409);
    }else{
        $user =new users();
        $user->name=$login;
        $user->password=md5($password);
        $user->save();
        return $response->withStatus(201);
    }
});


$app->get('/api/users', function ($request, $response, $args) {

    $users = Users::all();
    $response->getBody()->write($users->toJson());
    return $response;

});

$app->delete('/api/users/[{id}]', function ($request, $response, $args) {

    $user = Users::find($args['id']);
    $user->delete();
    return $this->renderer->render($response, 'index.phtml', $args);

});

$app->post('/api/posts', function ($request, $response, $args) {
    $temp = file_get_contents('php://input');
    $data = json_decode($temp, true);
    $post = new posts();
    $post->title = $data['title'];
    $post->text = $data['text'];
    $post->img = $data['img'];
    $post->save();
    $response->getBody()->write($post->toJson());
    return $response;
});

$app->get('/api/posts/[{id}]', function ($request, $response, $args) {


    $post = posts::find($args['id']);
    $response->getBody()->write($post->toJson());
    return $response;
});

$app->post('/api/scores/[{id}]', function ($request, $response, $args) {
    $name = $_SESSION["user"];
    if(isset( $_SESSION["user"])){
        $user = Users::where('name',$name )->first();
        if(isset($user) && !empty($user) ){
            $rating = Score::where('userId', $user->id)->where('postId', $args['id'])->first();
            if(isset($rating) && !empty($rating)){
                $response->getBody()->write("juz dales ocene");
                return $response->withStatus(409);
            }else{
                $value = $_POST["value"];
                $rating = new Score();
                $rating->value = $value;
                $rating->postId = $args['id'];
                $rating->userId = $user->id;
                $rating->save();
                $post = posts::find($args['id']);
                $post->score = $post->score+ $value;
                $post->save();
                $response->getBody()->write($rating->toJson());
                return $response->withStatus(201);
            }
        }
    }else{
        $response->getBody()->write("brak autoryzacji");
        return $response->withStatus(401);
    }
   


});

$app->get('/api/scores/[{id}]', function ($request, $response, $args) {
   
    return $response;
});

$app->get('/api/posts', function ($request, $response, $args) {
    $post = posts::all();
    $response->getBody()->write($post->toJson());
    return $response;
});

$app->post('/api/img', function ($request, $response, $args) {
 if(isset( $_SESSION["user"])){
    $plik_tmp = $_FILES['file']['tmp_name'] ;
    if(is_uploaded_file($plik_tmp)) { 
        move_uploaded_file($plik_tmp,$_SERVER['DOCUMENT_ROOT']. "/images/posts/".$_FILES['file']['name']); 
        $response->getBody()->write($_FILES['file']['name']);
        $response->withStatus(201);
    }else{
        $response->withStatus(400);
    }
}else{
    $response->withStatus(409);
}
    return $response;
});

$app->post('/api/comments', function ($request, $response, $args) {
    $temp = file_get_contents('php://input');
    $data = json_decode($temp, true);
    $comment =new comments();
    $comment->text = $data['text'];
    $comment->postid = $data['postid'];
    $comment->save();
    $response->getBody()->write($comment->toJson());
    return $response;
});

$app->get('/api/comments/[{id}]', function ($request, $response, $args) {

    $comment = comments::where('postid', $args['id'])
                        ->get();
    $response->getBody()->write($comment->toJson());
    return $response;

});



?>