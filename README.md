## E-Commerce API

## Overview

The E-Commerce API is a backend-focused project built with Node.js, Express, and PostgreSQL. The goal of the project was to provide a RESTful API that supports product management for an e-commerce application and allows a React frontend to interact with product data.
The API enables users to create, read, update, delete, search, and filter products by category while maintaining proper error handling and HTTP status codes.

## Problem Statement
Many e-commerce applications require a backend service to manage product information efficiently. Without a centralized API, product data cannot be stored, updated, or retrieved consistently across the application.
This project was created to provide a simple and scalable backend solution that allows an e-commerce frontend to perform product management operations through RESTful API endpoints.

## Project Goals
- Build a RESTful API using Node.js and Express.
- Connect a React frontend to a backend service.
- Implement full CRUD operations for products.
- Allow product search and category filtering.
- Practice backend development concepts and API design.
- Implement proper error handling and HTTP status codes.

## Technical Architecture

## Frontend
The frontend was built using React and Tailwind CSS.
Responsibilities:
- Display product information.
- Submit requests to the backend API.
- Render search and filtering results.
- Manage user interactions.

## Backend
The backend was built using Node.js and Express.
Responsibilities:
- Handle API requests.
- Process business logic.
- Manage product operations.
- Return appropriate responses and status codes.

## Database
PostgreSQL is used for data persistence.
Stored data includes:
- Product information
- Product categories
- Product details

The React frontend communicates with the Express backend using HTTP requests.
Flow:
React Frontend → Express API → PostgreSQL Database

## Tech Stack

## Frontend
- React
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Tools
- Git
- GitHub
- Thunder client

## Features

- Product Management
- Create a product
- Retrieve all products
- Retrieve a single product
- Update product information
- Delete a product
- Search and Filtering
- Search products
- Filter products by category
- Error Handling
- Validation of incoming requests
- Proper HTTP status codes
- Meaningful error responses
- API Integration
- React frontend connected to backend API
- Dynamic data retrieval and updates

Folder Structure
backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── app.js
frontend/
├── src/
├── public/

## Installation

Clone Repository
git clone https://github.com/JaffDavy/E-commerce-API.git
Backend Setup
cd backend
npm install
Create a .env file and configure your PostgreSQL database connection.
Start the backend server:
npm start
Frontend Setup
cd frontend
npm install
npm start

## Challenges Faced

Backend Challenge
Designing and organizing REST API routes while maintaining a clean project structure using controllers, models, and routes.
Frontend Challenge
Connecting the React frontend to the backend API and ensuring data was displayed correctly after API requests.
Debugging Experience
One of the biggest challenges was resolving Cross-Origin Resource Sharing (CORS) issues. Requests from the frontend were being blocked by the browser because the backend was not properly configured to allow requests from a different origin.
This was resolved by configuring CORS middleware correctly and testing requests using Postman and the browser developer tools.

## What I Learned
Technical Lesson
I gained practical experience building RESTful APIs using Node.js, Express, and PostgreSQL.
Workflow Lesson
I improved my understanding of API testing and debugging using Postman.
Code Organization Lesson
I learned the importance of separating application logic into controllers, routes, models, and utility functions to keep projects maintainable and scalable.

Future Improvements
Product image uploads
Product pagination
Sorting products by price and category
Authentication and authorization
Shopping cart functionality
Order management
API documentation using Swagger

My Role
Full Stack Developer
Responsibilities:
Backend API development
Database design and integration
Frontend integration
Testing and debugging
Deployment and configuration

Live Demo
Frontend: https://e-commerce-api-olive-tau.vercel.app/
Backend: https://e-commerce-api-1-niwn.onrender.com