
# Online Learning Platform

## Overview
The Online Learning Platform is a web application designed to provide users with access to educational resources, courses, and interactive learning materials. It offers features for both students and administrators, enabling seamless management of courses, user enrollments, and user authentication.

### Design Decisions
Admin side functionalities in Course Management, Student Management, and Enrollment Management:

- **Course Management**:

**View**: Admins can view all courses. This functionality provides admins with an overview of all courses available on the platform.

**Create**: Admins are allowed to create new courses. This capability is essential as admins need to add new courses to the platform regularly.

**Update**: Admins can update course details. This feature ensures that admins can keep course information accurate and up-to-date.

**Delete**: Admins can delete courses. This capability is crucial for removing outdated or irrelevant courses from the platform.

- **Student Management**:

**View**: Admins can view all student profiles. This capability allows admins to see information about all registered students on the platform.

**Delete**: Admins can delete student profiles. This capability is provided to handle scenarios such as removing duplicate or inactive student accounts.

- **Enrollment Management**:

**View**: Admins can view all enrollment records. This functionality enables admins to see which students are enrolled in which courses and monitor overall enrollment data.

**Delete**: Admins can delete enrollment records. This capability allows admins to manage enrollments, such as removing erroneous or duplicate enrollments.

*The reason for limiting the capabilities in Student Management and Enrollment Management to view and delete for admins is to maintain proper control and oversight. Admins typically have broader access to manage and maintain the platform, including handling user and enrollment data. However, certain operations like creating or modifying student profiles and enrollments restricted to ensure data integrity and security.*

## Technologies Used
### Frontend
- **React.js**: Chosen for its component-based architecture, ease of development, and efficient rendering.
- **React Router**: Utilized for client-side routing to manage navigation within the application.
- **Bootstrap**: Employed for frontend styling and responsive design to ensure a consistent user experience across devices.
- **Axios**: Used for making HTTP requests to the backend server for data retrieval and manipulation.
- **JWT Authentication**: Implemented for secure user authentication and authorization.

### Backend
- **Node.js with Express**: Selected for building a fast and scalable server-side application with minimal overhead.
- **MongoDB**: Chosen as the database for its flexibility and scalability, allowing easy storage and retrieval of structured and unstructured data.
- **Mongoose**: Used as an Object Data Modeling (ODM) library for MongoDB, providing a straightforward way to model application data and interact with the database.
- **JWT (JSON Web Tokens)**: Employed for securing API endpoints and implementing token-based authentication.
- **bcrypt.js**: Utilized for hashing and salting user passwords to enhance security.
- **cookie-session**: Implemented for managing user sessions and storing session data securely on the client-side.

## Architecture
### Frontend
The frontend architecture follows a modular and component-based design pattern facilitated by React.js. The application is structured into reusable components such as Login, Register, Profile, CourseList, etc., each responsible for rendering a specific part of the user interface. React Router is used for client-side routing, allowing seamless navigation between different views.

### Backend
The backend architecture is built using Node.js with Express, following the Model-View-Controller (MVC) pattern for organizing code into distinct modules. Mongoose is utilized for defining data models, which represent the application's domain entities such as User, Course, Enrollment, etc. Express.js handles routing and middleware functions, including authentication and authorization using JWT tokens.

### Database
MongoDB is employed as the database for its flexibility in handling unstructured data and scalability. It stores user information, course details, enrollment data, and other relevant application data. Mongoose ODM simplifies interaction with MongoDB by providing a schema-based solution for modeling application data.

## Trade-offs and Considerations
- **Scalability**: MongoDB offers scalability, but it may require additional configuration and optimization as the application grows to handle increased data volumes.
- **Security**: JWT authentication provides security benefits but requires careful implementation to prevent common vulnerabilities such as token leakage and CSRF attacks.
- **Complexity vs. Performance**: Using React.js and Node.js offers high performance and flexibility but may introduce additional complexity, especially for developers less familiar with these technologies.

## Getting Started
To run the application locally, follow these steps:
1. Clone the repository.
2. Install dependencies using `npm install` in both the frontend and backend directories.
3. Configure the environment variables for database connection and JWT secret.
4. Start the backend server using `npm start` in the backend directory.
5. Start the frontend development server using `npm start` in the frontend directory.
6. Access the application in your web browser at `http://localhost:3000`.

## Contributors
- [Dilanka Nirmal](https://github.com/Dilanka-Nirmal)


