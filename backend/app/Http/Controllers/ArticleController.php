<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $articles = Article::orderBy('created_at','desc')->paginate(10);
        return response()->json($articles);
    }
}
