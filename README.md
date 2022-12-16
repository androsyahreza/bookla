# bookla
[![Generic badge](https://img.shields.io/badge/npm-v14.16.1-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/node-6.14.12-green.svg)](https://shields.io/)

Bookla is a sport venue booking application built with [AdonisJS](https://adonisjs.com/)
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [RESTful API Endpoints](#restful-api-endpoints)
* [Setup](#setup)

## General info
![tech-stack](/assets/images/techStack.png)

This application uses nodeJS and adonis JS with MYSQL as the database. In this application, users can book venues and choose a field. 
Of course, other users can join and unjoin the field that has been booked. The purpose of this app is to exercise together easily. The fields that can be booked are soccer, mini-soccer, futsal (indoor football), basketball, and volleyball.
### Database Design
![erd](/assets/images/erd.png)

The picture above shows the entity relationship diagram on this project.

### Database Setup
Please note that to run this application, the first thing to do is create a database. here is the query :
```
CREATE DATABASE bookla_db;
```
Database table can be created using the following command:
```
node ace migration:run
```

## Technologies
Project is created with:
* node : 14.16.1
* adonis : 5.9.0
* mysql2 : 2.3.3

## RESTful API Endpoints
RESTful API Endpoints are shown in the table below:
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/register` | Register user. User can enter *name, role, email, password,* and *password_confirmation* |
| POST | `/api/v1/login` | Login user. User can login by entering *email* and *password*. After logging in the user will get a bearer token  |
| POST | `/api/v1/fields/{field_id}/bookings` | Booking field. User can booking field by entering *play_date_start, play_date_end,* and *title* |
| GET | `/api/v1/fields/{field_id}/bookings/{id}` | Show booking. User can view booking list |
| PUT | `/api/v1/bookings/{id}/join` | Join booking. User can join the field that has been booked |
| PUT | `/api/v1/bookings/{id}/unjoin` | Unjoin booking. User can unjoin the booking |
| POST | `/api/v1/venues` | Store a venue. Owner can store venues by insert *name, address,* and *phone* |
| GET | `/api/v1/venues` | List of venues. Owner or user can view list of venues |
| GET | `/api/v1/venues/{id}` | View a venue. Owner or user can view specific venue|
| PUT | `/api/v1/venues/{id}` | Update a venue. Owner can update a venue|
| DELETE | `/api/v1/venues/{id}` | Delete a venue. Owner can delete a venue|
| POST | `/api/v1/venues/{venue_id}/fields` | Store a field. Owner can store field by insert *name* and *type*. The type of fields are soccer, mini-soccer, futsal, basketball, and volleyball |
| GET | `/api/v1/venues/{venue_id}/fields` | List of fields. Owner or user can view list of field in a venue |
| GET | `/api/v1/venues/{venue_id}/fields/{id}` | View a field. Owner or user can view specific field in a venue|
| PUT | `/api/v1/venues/{venue_id}/fields/{id}` | Update a field. Owner can update a specific field in a venue|
| DELETE | `/api/v1/venues/{venue_id}/fields/{id}` | Delete a field. Owner can delete a specific field in a venue|

You can test this API endpoint by using the postman application. Please [**Click Here**](/assets/postman-collection) to download the **postman collection** that was created for this application.

## Setup
To run this application, install it locally using npm:
```
$ cd bookla
$ npm install
$ npm start 
```
or you can run this application by using AdonisJS command line framework:
```
$ cd bookla
$ node ace serve --watch
```
