# Boorgir, your favourite burger app
## Overview
Boorgir is an app that allows customers to order burgers and view detailed information about them, such as the ingredients that they are made of.
The app consists of a front interface for the clients and a back-office for administrators.

Once all set up and seeded, you can use `admin@boorgir.be` with password `admin` to log in as an administrative user. To log in as a non-administrative user, use `joe@gmail.com` with password `password` or register an account before signing in.

## Features
- A front end interface for customers and back office for administrators to set the available products.
- The entire site (+ back office) is fully (statically and data-driven) translatable into three available languages and can be extended to provide more through its scalable database design.
- There are small notifications when logging in or accessing a page you're not supposed to. Try going to the admin URLs as a non-logged-in or unauthorized user.
- You have both a grid and list view available for viewing products, as well as the usual search functionality.

## Bugs
- The orders on the order screen (on the right) are not properly translated when switching languages. This is because I did not want to make an extra fetch for each burger to get their translations in the other languages.
- Because of the many fetches for images, it might make it so you send too many requests in rapid succession. If you need to, increase the rate limit in the API project under `app\Providers\RouteServiceProvider.php`.

## API
To install the API, do the following:
- Clone [the repository](https://github.com/Thiibo/boorgir-api).
- Duplicate the .env.example file and call it .env (put it in the same folder).
- Configure the database settings. Set `DB_CONNECTION` to `sqlite` and put the absolute path to the `.sqlite` file (that you would like to save all the data into) into `DB_DATABASE`.
- Install the packages using `composer install` 
- Generate the keys: use `php artisan key:generate` and `php artisan jwt:secret`.
- Initialise the app using `php artisan app:init`. This will create the database and seed it. If this doesn't work, run `php artisan migrate` first and create the database file.

To run it:
- On Windows/Mac: use Herd or Laragon to run the project. Make sure the host URL is `boorgir.test`.
- On Linux: open a terminal in the repository and run `npm install`, followed by `npm run laravel` or `php artisan serve`. You may need to add `boorgir.test` manually to your host file first.

HTTPS mode is required to use the app.
- On Windows/Mac, use Herd or Laragon to enable this.
- On linux, open another terminal in the project folder and run `npm run proxy` to be able to use the site in HTTPS mode. This might require sudo.

## App
To run the app, clone the repository and run `npm install`.
Then, use `npm run dev` to run the app in development mode.
