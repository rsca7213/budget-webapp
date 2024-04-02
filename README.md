# Budget WebApp

![CI/CD Actions](https://github.com/rsca7213/budget-webapp/actions/workflows/api.yml/badge.svg)
![CI/CD Actions](https://github.com/rsca7213/budget-webapp/actions/workflows/web.yml/badge.svg)

This is a simple web application that allows users to track their expenses and incomes. The application is built Angular for the frontend and Nest.js for the backend.

## 📚 Prerequisites - Before installing and running the app

- Install the latest LTS of Node.js from [Node.js](https://nodejs.org/en/)
- This should also install npm, the Node.js package manager
- Clone this repository to your local machine
- Install the Angular CLI globally by running `npm install -g @angular/cli`
- Install the Nest.js CLI globally by running `npm install -g @nestjs/cli`

## 🛠️ Installation

- Open a terminal and navigate to the root of the cloned repository

  `cd /path/to/budget-webapp`

- Install the dependencies for the frontend

  `cd web`

  `npm install`

- Install the dependencies for the backend

  `cd api`

  `npm install`

  `npm install`

- Create a `.env` file in the root of the project. You can copy the `example.env` file and rename it to `.env`

  `cd api`

  `cp example.env .env`

## 🚀 Running the app in development mode

- Open a terminal and navigate to the root of the cloned repository

  `cd /path/to/budget-webapp`

- Start the backend server

  `cd api`

  `npm run start:dev`

- Start the frontend server

  `cd web`

  `npm start`

## 📃 Reading the OpenAPI documentation (Swagger UI)

- To read the OpenAPI documentation, first start the API in development mode

  `cd api`

  `npm run start:dev`

- Then, open a browser and navigate to `http://localhost:PORT/docs` where `PORT` is the port number specified in the `.env` file

## 🧪 Running the tests

- Open a terminal and navigate to the root of the cloned repository

  `cd /path/to/budget-webapp`

- Run the tests for the backend

  `cd api`

  `npm run test`

- **Note:** You can also run specific types of tests by running `npm run test:unit`, `npm run test:int`, or `npm run test:e2e`

- Run the tests for the frontend

  `cd web`

  `npm run test`

## ✅ Linting the code

This project uses ESLint to lint the code. To lint the code, you must do the following:

- Open a terminal and navigate to the root of the cloned repository

  `cd /path/to/budget-webapp`

- Lint the code for the backend

  `cd api`

  `npm run lint`

- Lint the code for the frontend

  `cd web`

  `npm run lint`

## 🎨 Formatting the code

This project uses Prettier to format the code to a consistent style. To format the code, you must do the following:

- Install the Prettier extension in your code editor

- Configure Prettier to format the code on save in your code editor

- You're all set! Now, every time you save a file, Prettier will format the code to a consistent style
