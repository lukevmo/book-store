 # Book Store App

## Deployment

The Book Store App is currently deployed on Vercel. You can access the live version of the app by following this link: <a href="https://bookapp-zeta.vercel.app/">Book Store App on Vercel</a>.

## Features

The Book Store App provides the following features:

<ul>
  <li>User authentication: Users can create accounts, log in, and log out.</li>
  <li>Book browsing: Users can view a list of available books and search for specific titles or authors.</li>
  <li>Book details: Users can view detailed information about a specific book, including its title, author, description, and year.</li>
  <li>Shopping cart: Users can add books to their shopping cart, view the contents of the cart, and remove items.</li>
  <li>Checkout: Users can proceed to the checkout process, enter their shipping and payment details, and complete a purchase.</li>
</ul>

## Tech Stack
The Book Store App was built using the following technologies:

### Front-end
- React: A JavaScript library for building user interfaces.
- HTML and CSS: Markup and styling for the app.
- Redux: A state management library for managing global application state.
- React Router: A library for handling routing within a React application.

### Back-end
- Node.js: A JavaScript runtime environment for server-side development.
- Nest.js: A minimal web application framework for Node.js.
- MongoDB: A NoSQL database used for storing book and user information.
- Mongoose: A MongoDB object modeling tool for Node.js.
- JSON Web Tokens (JWT): Used for user authentication and authorization.

## Completed
### Backend
- Using JSON Web Token (JWT) to handle authentication and authorization.The JWT authentication middleware handles the validation and authentication of the token.
- Logging
- Database Integration: mongodb
- API Endpoints
- Event Listeners
- Swagger docs http://localhost:3000/api
- Postman Collection (json)

## Installation and Setup
To run the Book Store App locally, follow these steps:

1. Clone the repository: https://gitlab.com/vmo_training_fresher/vmo-book-store-app
# Direct to project folder
  cd vmo-book-store-app
2. Install dependencies for both the backend and frontend:
# Install backend dependencies
  cd backend
  npm install

# Install frontend dependencies
  cd frontend
  npm install

3. Set up environment variables:
- Create a .env file in the backend directory and add the necessary environment variables for database connection, email service, etc.

4. Start the development server:
# Start the backend server
  cd backend
  npm run start

# Start the frontend server
  cd frontend
  npm run start

<h3>Home Page With Loading Page<h3/>

<h3>Home Page with Book Details<h3/>
     
<h3>Signup Page<h3/>

<h3>Login Page<h3/>
                 
<h3>Home Page with Book Details<h3/>

<h3>Search Functionality<h3/>

<h3>Books Details Page<h3/>
                     
                       
