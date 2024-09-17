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
        $articles = Article::latest()->get();;
        return response()->json([
            "status" => 200,
            "data" => $articles
        ]);
    }

    public function getArticleById(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'required|integer|exists:articles,id'
            ]);

            $article = Article::find($validatedData['id']);
            return response()->json([
                "status" => 200,
                "data" => $article
            ]);
        } catch(\Exception $e){
            return response()->json($e);
        }
    }
}
