# BACKEND API ORDERS

Implement backend to Orders using NodeJs with express.

## Demo

The API deploy: [here](https://orders-carlos.herokuapp.com).

## Documentation

You can view the documentation [here](https://orders-carlos.herokuapp.com/api-docs).

## Estructura del repositorio

This repository has the following  organization:

    ├── api                     # React - app
        ├── components         # Each component has network,index,controller
            ├── auth                 # Get all data of Characters from API.
            ├── order                # Get all data of Episodes from API.
            ├── product              # Get all data of Locations from API. 
            ├── user                 # Get all data of Locations from API. 
        ├── index                # In charge to route to endpoints 
    ├── auth
        ├── index                # In Charge to manage the authorizations.
    ├── network
        ├── error                # Setup patrom to errors.
        ├── response             # Setup patrom for answer from API.
    ├── store                      
        ├── mysql                # In charge to manage the data base.
    └── README.md                   # README


## Details
* Using express
* Using NodeJs 14.15.2

## Library

* bycript         -> to hasher the passwords.
* jwt(jsonbtoken) -> to generate tokens.
* mysql          -> to connect with data base.
* swagger        -> to generate documentation.

## Request

* Git
* Node.js 14.15.2
* npm


## Inicio de la aplicación

* Clone the repository.
* npm install
* nodemon api/index.js
