# Backend(Laravel)

I used laravel 10.48.20v version and php 8.3.11v along with postgresql(16.4v) realtional database. 
Moreover, for authentication used JWT.

## Installation

```sh
git clone project_name
cd backend
composer vendor install
## please add .env
php artisan migrate:fresh OR php artisan migrate
php artisan serve
```

For cron job I use scheduling. Every ten minutes later, data will fetch again and then save it in the DB. To run scheduling use this command:

```sh
php artisan schedule:run
```

# Frontend(ReactJS)

I used NextJS 14.2.11v and NodeJS version is 20.12.2.

## Installation

```sh
cd frontend
npm i
npm run dev
```