# Backend(Laravel)

I used laravel 10.48.20 version and php 8.3.11v along with postgresql(16.4v) realtional database. 
Moreover, for authentication used JWT.

## Installation

```sh
git clone project_name
composer vendor install
// Add .env
php artisan serve
```

For cron job I use scheduling. Every ten minutes later, data will fetch again and then save it in the DB. To run scheduling use this command:

```sh
php artisan schedule:run
```