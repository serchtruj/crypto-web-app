# Crypto API

Crypto API is a Node.js backend project that provides real-time cryptocurrency data through both WebSocket and RESTful APIs.

## Description

The Crypto API project is designed to serve real-time cryptocurrency data and additional market metrics to client applications. It utilizes WebSocket for real-time price updates and RESTful APIs to fetch additional market data.

## Installation

To set up the Crypto API on your local machine, follow these steps:

- `npm install` to install all required dependencies

## Usage

#### Starting the Server
To start the Crypto API server, you have two options:

1.Production Mode:
To get the Node server running locally:

`npm start` 

2.Development Mode (using nodemon):

`npm run dev`

The server will be running at http://localhost:8000.

## API Endpoints
The Crypto API exposes the following endpoints:


## Configuration
The Crypto API uses environment variables to manage configurations. Create a `.env` file in the root directory with the following variables:

`PORT=8000`

Dependencies
The Crypto API relies on the following major dependencies:

`axios`: HTTP client for making API requests.
`cors`: Middleware for enabling Cross-Origin Resource Sharing.
`dotenv`: Library for loading environment variables.
`express`: Web framework for building RESTful APIs.
`ws`: WebSocket library for handling real-time communication.

All dependencies and their versions are listed in the package.json file.