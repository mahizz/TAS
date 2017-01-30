<?php 
namespace Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
class Comments extends Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'Comments';
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');
}