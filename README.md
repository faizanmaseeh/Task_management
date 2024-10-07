Task Management Project
Project Setup

*******************

Frontend (Client)
Navigate to the client folder:
cd client
Install the necessary dependencies:
npm install
Start the frontend development server:
npm run dev

******************

Backend (API Server)
Navigate to the backend folder:
cd backend
Install the necessary dependencies:
npm install
Start the backend server:
npm start

Make sure you have a .env file with the following content:
MONGO_URI=mongodb+srv://S_Users:Scaler7777@cluster0.p51fsyk.mongodb.net/SCALER_DATA?retryWrites=true&w=majority
JWT_SECRET=secretkey79999
CLIENT_URL=http://localhost:3000
PORT=8000


***************

API Endpoints
Task Management API

Create a Task
URL: /task/create
Method: POST
Description: Creates a new task.
Protected: Yes
Request Body:
json
Copy code
{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2023-10-01"
}


Get All Tasks
URL: /tasks
Method: GET
Description: Retrieves all tasks.
Protected: Yes

Get Task by ID
URL: /task/:id
Method: GET
Description: Retrieves a single task by its ID.
Protected: Yes

Update Task
URL: /task/:id
Method: PATCH
Description: Updates a task by its ID.
Protected: Yes
Request Body:
json
Copy code
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2023-10-05"
}

Delete Task
URL: /task/:id
Method: DELETE
Description: Deletes a task by its ID.
Protected: Yes


User Authentication & Management API

Register User
URL: /register
Method: POST
Description: Registers a new user.
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}


Login User
URL: /login
Method: POST
Description: Authenticates a user.
Request Body:
json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}


Logout User
URL: /logout
Method: GET
Description: Logs out the authenticated user.
Protected: Yes


Get User Profile
URL: /user
Method: GET
Description: Retrieves the logged-in user's profile.
Protected: Yes


Update User Profile
URL: /user
Method: PATCH
Description: Updates the authenticated user's profile.
Protected: Yes
Request Body:
json
Copy code
{
  "name": "Updated Name",
  "email": "updated.email@example.com"
}


Admin: Delete User
URL: /admin/users/:id
Method: DELETE
Description: Deletes a user by ID. Admin access required.
Protected: Yes


Admin: Get All Users
URL: /admin/users
Method: GET
Description: Retrieves a list of all users. Admin access required.
Protected: Yes


Check Login Status
URL: /login-status
Method: GET
Description: Checks if the user is logged in.


Email Verification
URL: /verify-email
Method: POST
Description: Verifies the user's email. Protected route.

Forgot Password
URL: /forgot-password
Method: POST
Description: Sends a password reset email to the user.

Reset Password
URL: /reset-password/:resetPasswordToken
Method: POST
Description: Resets the user's password using the reset token.
Request Body:
json
Copy code
{
  "password": "newpassword123"
}

Change Password
URL: /change-password
Method: PATCH
Description: Changes the user's password. User must be logged in.
Protected: Yes

Additional Information
Database: MongoDB (connected using Mongoose)
Authentication: JWT (JSON Web Token) based

