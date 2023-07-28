# Crypto Web App

Welcome to the Crypto Web App! This is a real-time web application that provides cryptocurrency information using web sockets and RESTful APIs.

## Overview

The Crypto Web App is a web application that displays real-time cryptocurrency data to users. It combines data from Binance WebSocket API for real-time price updates and Messari API for additional market metrics.

## Contents

1. [Introduction](#introduction)
2. [Client](#client)
3. [Server](#server)
4. [How to Run](#how-to-run)
5. [Dependencies](#dependencies)
6. [APIs Used](#apis-used)

## Introduction

The Crypto Web App is designed to provide users with up-to-date information on various cryptocurrencies. It offers real-time price updates from Binance WebSocket API and additional market metrics from Messari API.

## Client

The `client` folder contains the frontend of the Crypto Web App. It is built using React and is responsible for rendering the user interface and receiving real-time data from the server via WebSocket connections. The frontend provides users with live cryptocurrency prices and market trends.

## Server

The `server` folder contains the backend of the Crypto Web App. It is built using Node.js and Express and serves as an intermediary between the frontend and external APIs (Binance and Messari). The backend sets up a WebSocket server to handle real-time communication with the frontend and fetches additional market metrics from Messari API through RESTful endpoints.

## How to Run

To run the Crypto Web App locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/serchtruj/crypto-web-app
cd crypto-web-app
````

2. Set up the client
```bash
cd client
npm install
npm start
````
This will start the development server for the frontend at http://localhost:3000.


3. Set up the server
```bash
cd ../server
npm install
npm start
````

This will start the WebSocket server for the backend at http://localhost:8000.

### Dependencies
The Crypto Web App uses the following major dependencies:

#### Client:

React: Frontend framework
Axios: HTTP client for API requests
WebSocket: Real-time communication with the backend

#### Server:
Node.js: JavaScript runtime
Express: Web framework for backend
ws: WebSocket library for Node.js
All dependencies are listed in the respective package.json files in the client and server folders.

### APIs Used
The Crypto Web App relies on the following APIs:

- Binance WebSocket API: Provides real-time cryptocurrency prices and trades.
- Messari API: Used for fetching additional market metrics such as 24-hour trading volume, market capitalization, and more.

Please note that while Binance offers WebSocket support, Messari API currently does not have WebSocket capabilities.