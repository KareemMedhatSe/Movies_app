###  **Overview**
This project is a Movie Management Application built using Angular for the frontend and Spring Boot for the backend. It allows Admins to search for movies via the OMDB API, save them to a database, and delete them. Regular users can view saved movies, search within them, and see details.

### Features

**_- Authentication & Authorization_**

1. Login system for both Admins and Users.
2. Registration System.
3. Role-based access control.
4.  Admin can add & remove movies.
5. Users can only view saved movies.
6. JWT-based authentication to secure API endpoints.

**_- Movie Management_**

1.   Search movies using the OMDB API (Admin only)
2.   Save movies to the database (Admin only)
3.   Delete movies from the database (Admin only)
4.   Pagination for better navigation
5.   Search functionality for users within saved movies  

**_- UI & UX Improvements_**

1. Styled login page with central input fields
2. Dashboard split into two sections: search results & saved movies
3. Show Details button to view additional movie information
4. Logout button for easy session management

**_- Technologies Used_**

1. Frontend (Angular)
2. Angular 16+
3. TypeScript
4. Bootstrap (for styling)
5. Angular Forms (Reactive Forms)
6. Angular Routing (for navigation)
7. JWT Decode (for user role validation)
8. Backend (Spring Boot)
9. Spring Boot 3 (Java 17)
10. Spring Security (for authentication & JWT handling)
11. Spring Data JPA (for database operations)
12.  MySQL 
13. REST API (using @RestController)
14. OMDB API Integration (via RestTemplate)

### **_How to Run the Application_**
 Backend Setup (Spring Boot)
 
Step 1: Navigate to the backend folder

Step 2: Configure the database all the settings of the database is available in the application.properties file
    
    spring.datasource.url=jdbc:mysql://localhost:3306/movies_db
    
    spring.datasource.username=admin
    
    spring.datasource.password=123456789@Movies
    
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    
    spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
    
Step 3: Run the Backend Server
  mvn spring-boot:run

The backend should now be running at http://localhost:8091


> Frontend Setup (Angular)

**
Step 1: Navigate to the frontend folder
    cd ../frontend
    
Step 2: Install dependencies
    npm install
    
Step 3: Run the Frontend Server

> ### **API Endpoints (Backend)**
 Authentication

                                                                                                    

Method : POST                                 Endpoint: /auth/login                                          Description: login user and return a JWT token

Method: POST                                    Endpoint: /auth/signup                                                      Description:              Registers a new user

### **_Movie Management_**
                                                                                  

Method: GET                   Endpoint:   /movies/search       Description:    Fetches movies from omdb API           Access: Admin

Method: GET                   Endpoint:   /movies/saved          Description:   Fetches saved movies                    Access:  All

Method: POST                  Endpoint:   /movies/add             Description:  saves movies to the database          Access:Admin

Method :DELETE                Endpoint: /movies/{title}            Description:   Deletes a movie by title                Access:    Admin

 **### How to Use the Application**

Admin Actions

Login using these credentials
 username: admin 
 password: admin 
(default admin user credentials created automatically)

1. Use the search bar to find movies from OMDB.
2. Click Add Movie to save a movie to the database.
3. See Saved Movies on the right panel.
4. Click Delete to remove movies from the database.
5. Logout to end session.

![Image](https://github.com/user-attachments/assets/7977db24-4100-4c75-8aab-687fa2286aa4)

User Actions

1. Login as a regular user (Sign up first if needed).
2. View Saved Movies added by the Admin.
3. Use the Search Bar to find specific movies.
4. Click Show Details to see additional movie info.
5. Logout to end session.
![Image](https://github.com/user-attachments/assets/9f39045c-bc22-48ee-b59c-bc792540165c)


the login page 

![Image](https://github.com/user-attachments/assets/946bef65-a16b-48a1-b57c-2acfc58c1179)


the register page 
(I made it applicable to choose to create an admin or user account to make the use of the app while testing easier, otherwise its recommended to use the database to create admin accounts)

![Image](https://github.com/user-attachments/assets/efce7296-d4f7-4aac-a5a3-801aa76ce3c9)

