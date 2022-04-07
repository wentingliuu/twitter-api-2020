# Simple Twitter API

A simple Twitter API project built with Node.js, Express.js and MySQL, and collaborated with Front-end partners, [Dolly](https://github.com/DollyChen-CYC) & [David](https://github.com/sh330035), and Back-end partner, [Ming](https://github.com/jadokao). Featuring like Twitter, users could post/reply/like posts, follow/unfollow others, edit their own profile including profile phote and cover photo.

🌟 Mainly responsible for **Back-end**, such as design & create database using *MySQL*, develop *RESTful API* for front-end partenr to fetch data, depoly API to cloud application platform *HEROKU*.

🌟 Project introduction written on **[Medium](https://wentingliuu.medium.com/alpha-camp-%E7%95%A2%E6%A5%AD%E5%B0%88%E6%A1%88-twitter-%E5%9C%98%E9%AB%94%E5%8D%94%E4%BD%9C-b0011b05b7f1)** (in Chinese).

🌟 **[Click Here](https://sh330035.github.io/twitter-frontend/)** and use the following dummy data to have a try.

| Account | Password | Role                         |
| --------| ---------| ---------------------------- |
| user1   | 12345678 | User (access to front-stage) |
| root    | 12345678 | Admin (access to back-stage) |

## Features
### Users [(@front-stage)](https://sh330035.github.io/twitter-frontend/)
| Feature                        | API ROUTE                         |
| ------------------------------ | --------------------------------- |
| REGISTER                       | `POST` /users                     | 
| LOGIN                          | `POST` /signin                    | 
| LOGOUT                         | -                                 | 
| GET TOP 10 USERS               | `GET` /users/top                  | 
| USER INFO (Tweet List)         | `GET` /users/:id/tweets           | 
| USER INFO (Reply List)         | `GET` /users/:id/replied_tweets   | 
| USER INFO (Like List)          | `GET` /users/:id/likes            | 
| USER INFO (Following List)     | `GET` /users/:id/followings       |  
| USER INFO (Follower List)      | `GET` /users/:id/followers        | 
| GET USER PROFILE               | `GET` /users/:id                  | 
| EDIT USER PROFILE              | `PUT` /users/:id                  | 
| EDIT USER SETTING              | `PUT` /users/:id/setting          | 
| FOLLOW OTHERS                  | `POST` /followships               | 
| UNFOLLOW OTHERS                | `DELETE` /followships/:followingId| 
| CREAT A POST                   | `POST` /tweets                    | 
| READ ALL POSTS                 | `GET` /tweets                     | 
| READ A POST                    | `GET` /tweets/:tweet_id           | 
| READ REPLIES OF A POST         | `GET` /tweets/:tweet_id/replies   | 
| CREAT NEW REPLY TO A POST      | `POST` /tweets/:tweet_id/replies  | 
| LIKE A POST                    | `POST` /tweets/:tweet_id/like     | 
| UNLIKE A POST                  | `POST` /tweets/:tweet_id/unlike   | 


### Admins [(@back-stage)](https://sh330035.github.io/twitter-frontend/#/admin/login)
| Feature                        | API ROUTE                        |
| ------------------------------ | -------------------------------- |
| LOGIN                          | `POST` /admin/signin             | 
| LOGOUT                         | -                                | 
| GET FULL USER LIST             | `GET` /admin/users               | 
| GET FULL TWEET LIST            | `GET` /admin/tweets              | 
| DELETE SPECIFIC TWEET          | `DLETE` /admin/tweets/:id        | 


## Screenshots
###### FRONT-STAGE
![Front stage](https://github.com/wentingliuu/twitter-api-2020/blob/master/twitter-front-stage.gif)

###### BACK-STAGE
![Back stage](https://github.com/wentingliuu/twitter-api-2020/blob/master/twitter-back-stage.gif)

## Installation and Execution
1. Clone the repository to your computer
```
git clone -b master git@github.com:jadokao/twitter-api-2020.git
```
2. Init: install the npm packages
```
cd twitter-api-2020
```
```
npm install
```
3. Create .env file and store API Key in the file
```
touch .env
```
- Please see [.env.example](https://github.com/wentingliuu/twitter-api-2020/blob/master/.env.example) for reference.
- Please get your own IMGUR_CLIENT_ID from [Imgur](https://api.imgur.com/oauth2/addclient).
4. Direct to ./config/config.json, and modify "username" & "password" in "development" section to map your local Sequelize setting.
5. Setup local database at SQL Workbench
```
drop database if exists forum;
create database ac_twitter_workspace;
```
6. Create data in locl database
```
npx sequelize db:migrate
```
```
npx sequelize db:seed:all
```
7. Run the project
```
npm run dev
```
- For windows system, please direct to ./package.json and change the *script* setting as below.
```
"scripts": {
  "start": "NODE_ENV=development node app.js",
  "dev": "NODE_ENV=nodemon app.js",
  "test": "mocha test --exit --recursive --timeout 5000"
},
```

## Skills & Tools
*  [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/) - JavaScript runtime environment
*  [Express.js](https://expressjs.com/) - web application framework
*  [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - template engine
*  [MySQL](https://www.mongodb.com/) - relational database management system
*  [Sequelize](https://mongoosejs.com/) - a Node.js ORM tool for MySQL
*  [passport-jwt](http://www.passportjs.org/) - authentication middleware for Node.js
*  [multer](https://www.npmjs.com/package/multer) - middleware for uploading files
*  [imgur](https://www.npmjs.com/package/imgur-node-api) - middleware for uploading images to imgur
*  [Git](https://git-scm.com/) control - to collaborate with other teammates.


## LINKS
###### FRONT-END
* github：https://github.com/sh330035/twitter-frontend
* website：https://sh330035.github.io/twitter-frontend/

###### BACK-END
* github：https://github.com/jadokao/twitter-api-2020
* Heroku：https://alphitter-api-server.herokuapp.com/api/

## Authurs
* [Dolly](https://github.com/DollyChen-CYC)
* [David](https://github.com/sh330035)
* [WenTing](https://github.com/wentingliuu)
* [Ming](https://github.com/jadokao)
