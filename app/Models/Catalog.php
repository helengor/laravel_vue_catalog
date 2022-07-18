<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id', 'user_id'];

    public function catalogRoot(){
        return $this->where('parent_id', 0)->get();
    }

    public function childs(){
        return $this->hasMany($this, 'parent_id');
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function breadcrumbs(){
        return $this->belongsTo($this, 'parent_id');
    }

}
