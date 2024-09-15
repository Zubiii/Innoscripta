<?php

namespace App\Console\Commands;

use Http;
use App\Models\Article;
use Illuminate\Console\Command;

class FetchArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $this->fetchNYData();
            $this->fetchNewsAPIData();

            $this->info('Data fetched and stored successfully.');
        } catch (\Throwable $th) {
            $this->error('An error occurred: ' . $th->getMessage());
        }
    }

    function fetchNYData() {
        $this->info('::FETCHING DATA FROM NEW_YORK TIMES::');

        $response = Http::get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json', [
            'api-key' => env('NY_TIMES')
        ]);

        if ($response->successful()) {
            $data = $response->json();

            
            // Process and save the data into the database
            foreach ($data['results'] as $item) {
                $existingArticle = Article::where('heading', $item['title'])->first();

                if($existingArticle) {
                    Article::create([
                        'heading' => $item['title'],
                        'description' => $item['abstract'],
                        'category' => $item['section'],
                        'source' => $item['source'],
                        'arthur' => $item['byline'],
                        'writtenDate' => $item['published_date'],
                        // Add all necessary fields
                    ]);
                } else {
                    $this->info('Article with this heading already exists: ' . $item['title']);
                }
            }
        } else {
            $this->error('Failed to fetch data from the API.');
        }
        $this->info('::FETCHING COMPLETE FROM NEW_YORK TIMES::');
    }

    function fetchNewsAPIData() {
        $this->info('::FETCHING DATA FROM NEWS API::');

        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'country' => 'us',
            'apiKey' => env('NEWS_API'),
        ]);

        if ($response->successful()) {
            $data = $response->json();
            
            // Process and save the data into the database
            foreach ($data['articles'] as $item) {
                $existingArticle = Article::where('heading', $item['title'])->first();

                if($existingArticle) {
                    Article::create([
                        'heading' => $item['title'],
                        'description' => $item['description'],
                        'category' => 'News', // Not provided
                        'source' => $item['source']['name'],
                        'arthur' => $item['author'],
                        'writtenDate' => $item['publishedAt'],
                        // Add all necessary fields
                    ]);
                } else {
                    $this->info('Article with this heading already exists: ' . $item['title']);
                }
            }
        } else {
            $this->error('Failed to fetch data from the API.');
        }
        $this->info('::FETCHING COMPLETE FROM NEWS API::');
    }
}
