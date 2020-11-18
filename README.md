# Recipes Website Project
This Recipes Website was developed by me as a final full-stack project for Web Development Environments course in Ben Gurion University.
This project is a Single Page Aplication that is written in NodeJS (with ExpressJS and Azure SQL server) for Back-End and VueJS for Frond-End and exposes REST API for external usages enforced by [Swagger API](https://app.swaggerhub.com/apis/naorbe/recipes/1.0.1#/) validation.

## Backend side
### Databases
* External API which includes over 360,000 recipes as well as an open source recipe database (spoonacular API).
* Secured DB at Azure SQL server that is run by the application to keep the private information of the clients.

### Architecture
The server side is based on ExpressJS and divided to 3 routes: 
* Auth - responsible for the register, login and logout and to set the cookie
* User - responsible for the user funcionality routers and private activities for each user. This route authenticates all incoming requests by middleware and gets the permission only for the specific user.
* Recipe - responsible for the recipes functionality routers, no matter who the client is (guests also have a permission). 

## Frontend side
The web application gets all the data from the server side and manages it in the client side or by local storage of the browser. 
In order of to prevent bothering of the server, the given data that we got will kept in global storage that is volatile.  

### Sign-up and Log-in with session cookies
This web application works with session cookies:
1. Once the user signs up, the client posts a HTTP request to the server containing his/her username and password.
2. The server receives this request and hashes the password before storing the username and password in your database. This way, if someone gains access to your database they won't see your users' actual passwords.
3. Now the user logs in. He/she provides their username/password and again, this is posted as a HTTP request to the server.
4. The server looks up the username in the database, hashes the supplied login password, and compares it to the previously hashed password in the database. If it doesn't check out, we may deny them access by sending a 401 status code and ending the request.
5. If everything checks out, we're going to create an access token, which uniquely identifies the user's session. Now the server will do two things with the access token:  store it in the database associated with that user and attach it to a response cookie to be returned to the client. Henceforth, the cookies will be attached to every request (and response) made between the client and server.
6. Back on the client side, we are now logged in. Every time the client makes a request for a page that requires authorization (i.e. they need to be logged in), the server obtains the access token from the cookie and checks it against the one in the database associated with that user. If it checks out, access is granted.

## Screenshots
* Home page for guests:
![home](https://github.com/NaorBenEvgi/Full-Stack-Recipes-Website-Project/blob/master/home.png)

* Home page for logged user:
![Home2](https://github.com/NaorBenEvgi/Full-Stack-Recipes-Website-Project/blob/master/Home2.png)

* Search recipes page filtering by Cuisine/Diet/Intolerance with an option to sort by time or popularity:
![search](https://github.com/NaorBenEvgi/Full-Stack-Recipes-Website-Project/blob/master/search.png)

