# INF653 Back End Web Development - Final Project

## About

This RESTful API was developed as the final project for the INF653 Back End Web Development course. It serves comprehensive information about U.S. states, including population, admission date, and fun facts. The API adheres to REST standards, providing JSON-formatted responses.

## Features

- Retrieve data for all states or filter by state code or contiguity status.
- Access detailed state information such as capital, nickname, population, and admission date.
- Perform CRUD operations (Create, Read, Update, Delete) for fun facts associated with specific states.

## Folder Structure 


project/
|-- config/
|   |-- db.js
|-- models/
|   |-- State.js
|-- controllers/
|   |-- statesController.
|-- middleware/
|   |-- checkState.js
|-- routes/
|   |-- states.js
|-- states.json
|-- server.js
|-- package.json


## Usage

The API is accessible via the following base URL: `TO BE ADDED`

## Endpoints

### GET Requests

- `/states/`: Retrieve data for all states.
- `/states/?contig=true`: Fetch contiguous states data (excluding AK and HI).
- `/states/?contig=false`: Fetch non-contiguous states data (AK and HI only).
- `/states/:state`: Get information for the specified state.
- `/states/:state/funfact`: Retrieve a random fun fact for the specified state.
- `/states/:state/capital`: Get the capital of the specified state.
- `/states/:state/nickname`: Get the nickname of the specified state.
- `/states/:state/population`: Get the population of the specified state.
- `/states/:state/admission`: Get the admission date of the specified state.

### POST Requests

- `/states/:state/funfact`: Add new fun facts for the specified state.

### PATCH Requests

- `/states/:state/funfact`: Update a specific fun fact of the specified state.

### DELETE Requests

- `/states/:state/funfact`: Delete a specific fun fact of the specified state.

## Deployment

This project is deployed on Glitch and can be accessed at the following URL:

[LINK]()


## Data base
The database is hosted on MongoDB Atlas, and Mongoose is used to access the data.
