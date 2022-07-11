# Ship Manager - Demo API

> This is part of a short sample code created by me for Microsoft Learn and ported to several other applications

## Features

This project is a simple harbor control application to track ships. It consists in only the API.

## Getting Started

### Prerequisites

- Node.js version 18 or later for the backend
- Docker and Docker Compose
- MongoDB

### Installation & Quickstart

#### Running stand alone

Created with TypeScript.

- Just go into the directory, type `npm install` to install all dependencies
- Then `npm run build:start` to run the app or `npm run start:debug` to start in debug mode (TypeScript watch and logging).
- Create a copy of the `.env.example` file and rename it to `.env`
- Change the default values of the variables to match your environment
- Install [direnv](https://direnv.net/) to automatically set the environment variables, run `direnv allow .` in the root directory

You can also build the image from the Dockerfile in the same directory with `docker-compose up`

### Environment Variables

The backend portion requires environment variables to run, those are:

- DATABASE_MONGODB_URI: URI of the MongoDB database
- DATABASE_MONGODB_DBNAME: MongoDB database name
- ENVIRONMENT_VERSION: Version of the application
- ENVIRONMENT_BINDINGPORT: Port to bind the application to
