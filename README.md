Bill Splitting Application

This is a simple bill splitting application built using React.js for the frontend and Node.js with Express.js and MongoDB for the backend.

How to Run Locally
To run this project locally, follow these steps:

Clone the repository to your local machine:

git clone <repository_url>
Navigate to the project directory:

cd <project_directory>
Install dependencies for both the frontend and backend:

# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
Start the backend server:

# Inside the backend directory
node server.js
Start the backend development server:

# Inside the frontend directory
npm start
Open your web browser and navigate to http://localhost:3000 to view the application.

Environment Setup and Configurations
To run this project, ensure that you have Node.js and MongoDB installed on your system. Additionally, make sure that MongoDB Atlas is set up and running, and replace the uri variable in the backend code with your MongoDB Atlas connection URI.

Project Structure
Frontend: React.js is used for the frontend. The main component is App.js, which handles the UI and user interactions.

Backend: Node.js with Express.js and MongoDB is used for the backend. The backend code is structured in server.js, which defines the API endpoints for fetching orders, adding orders, and calculating bills. Mongoose is used to interact with the MongoDB database.

Features
Add orders with total cost, friends, and meals.
View all orders with their details.
Calculate individual shares for each order.
Technologies Used
Frontend: React.js, HTML, CSS, Bootstap5
Backend: Node.js, Express.js, MongoDB, Mongoose
