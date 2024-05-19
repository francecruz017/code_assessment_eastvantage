## How to Setup Backend / API

 - You must have PHP (8.1) and MYSQL (can be changed in ENV) on your machine.

 - OPTIONAL: Create database named `api_code_assessment`. OR CAN BE CONFIGURED in .env file together with host, user and password.
 In my case, everything is in local and default.
 
 - open terminal
 - navigate to backend directory `cd backend`
 - in your terminal run `composer update`.
 - next run `php artisan migrate` to populate database. (database configurations can be configured in ENV)
 - run seeders by `php artisan db:seed` for roles to be populated.
 - finally run by `php artisan serve`
 - can be accessed as `http://localhost:8000`

 - also provided simple unit test

## How to Setup Frontend

 - You must have npm and node installed in your machine.

 - open new terminal.
 - head to frontend directory `cd frontend`
 - run `npm i`
 - run `npm start`
 - you can now test the UI

## API Endpoints
 - POST : http://localhost:8000/api/users send as form-data
    - first_name:admin
    - last_name:tester
    - middle_name:foo
    - email:admin.tester@test.com
    - roles[]:1

- GET: http://localhost:8000/api/users or http://localhost:8000/api/users?role=Author
    - no param role will get all users.
    - with param role will get users with specified role.

- DELETE: http://localhost:8000/api/users/{id}


- POST : http://localhost:8000/api/roles send as form-data
    - name:Tester

- GET: http://localhost:8000/api/roles

- DELETE: http://localhost:8000/api/roles/{id}

## Author's Message
Let me know what I can improve on. I would love to create updates and already have set it up with users but time is of the essense and a lot of task and meetings still on current work. Cheerio!!