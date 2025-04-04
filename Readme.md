# Project Name
-Multi-Level Category Management API


## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- TypeScript
- Jest (for testing)
- Supertest (API testing)

## Installation (open terminal for run below comands)
- git clone https://github.com/your-username/project-name.git
- cd project-name
- npm install

## Setup (create env file with below variables)
JWT_KEY="somthing_secret"
MONGODB_URL="mongodb://127.0.0.1:27017/task1"
APP_URL="http://127.0.0.1:5000"

## Running Tests
-npx jest tests/01_auth.test.ts && npx jest tests/02_category.test.ts

## Run in devlopment mode
-npm run dev