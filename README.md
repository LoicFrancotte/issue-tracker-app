# Issue-Tracker App - Backend

This project is the backend of an issue-tracking application, developed with Node.js, Express, TypeScript, and MongoDB. It allows for managing and tracking issues for a development team or any other organization. This application has no frontend and can only be tested with Postman. Below you will find all the necessary information to get started with this API.

## Database Schema

![Database Schema](https://imgur.com/gFlXp5D.png)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Populating the Database with Fake Data](#populating-the-database-with-fake-data)

## Features

- Create, modify, and delete issues
- Assign issues to users
- Track issue status (open, in progress, resolved, closed)
- Add comments to issues
- Manage users (add, delete, update)
- Add labels to issues

## Technologies

- Node.js
- Express
- TypeScript
- MongoDB
- Faker to fill the database

## Installation

1. Clone this repository to your machine.
2. Install the dependencies with the following command:

    ```
    npm install
    ```

3. Configure the environment variables by copying the `.env.example` file and renaming it to `.env`.
4. Start the server with the following command:

    ```
    npm run dev
    ```

## Populating the Database with Fake Data

To populate the database with fake data, follow these steps:

1. Build the project:

    ```
    npm run build
    ```

2. Navigate to the `dist` directory:

    ```
    cd dist
    ```

3. Run the `seedDatabase.js` script:

    ```
    node seedDatabase.js
    ```
