# INF653 Back End Web Development - Final Project

## About

This RESTful API was developed as the final project for the INF653 Back End Web Development course. It serves comprehensive information about U.S. states, including population, admission date, and fun facts. The API adheres to REST standards, providing JSON-formatted responses.

## Features

- Retrieve data for all states or filter by state code or contiguity status.
- Access detailed state information such as capital, nickname, population, and admission date.
- Perform CRUD operations (Create, Read, Update, Delete) for fun facts associated with specific states.

# Project Structure

This project follows a structured organization to facilitate development, maintenance, and scalability.

## Directory Structure



![image](https://github.com/v-gup23/INF653-final-project-api/assets/143101323/b5bab345-f29b-49dc-a875-10a01785d5c7)



## Details

### `models/`
   Contains model definitions. For example, `State.js` defines the structure and behavior of the State entity.

### `routes/`
   Routing configurations reside here. `states.js` defines routes related to state operations.

### `states.json`
   Contains sample data or initial state information in JSON format.

### `server.js`
   The entry point of the application.

### `package.json`
   Metadata about the project, including dependencies required for the project's execution and development.



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


[LINK](https://inf653-final-project-api.onrender.com/)


## Data base
The database is hosted on MongoDB Atlas, and Mongoose is used to access the data.
