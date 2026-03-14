# Online Voting System Backend

This is the Spring Boot backend for the Online Voting System. It provides REST APIs for user authentication, viewing candidates, casting votes, and retrieving results.

## Technologies Used
*   **Java 17**
*   **Spring Boot 3.4.x**
*   **Spring Security & JWT** (JSON Web Tokens) for stateless authentication
*   **Spring Data JPA** (Hibernate) for Object-Relational Mapping
*   **MySQL** Database

## Project Structure
*   `src/main/java/com/voting/model`: JPA Entities (`User`, `Candidate`, `Vote`) mapped to database tables.
*   `src/main/java/com/voting/repository`: Spring Data JPA interfaces for database operations.
*   `src/main/java/com/voting/controller`: REST API endpoints.
*   `src/main/java/com/voting/security`: Spring Security configuration, JWT generation, and validation logic.
*   `src/main/java/com/voting/payload`: Data Transfer Objects (DTOs) for incoming requests and outgoing responses.
*   `src/main/resources/application.properties`: Configuration file for database connection and server port.

## Setup and Running the Project

### Prerequisites
1.  **Java 17** installed.
2.  **MySQL Server** installed and running.

### 1. Database Configuration
Before running the application, you need to configure the database credentials in the `application.properties` file.

1.  Open `src/main/resources/application.properties`.
2.  Update the `spring.datasource.username` and `spring.datasource.password` to match your local MySQL server credentials:
    ```properties
    spring.datasource.username=YOUR_MYSQL_USERNAME
    spring.datasource.password=YOUR_MYSQL_PASSWORD
    ```
    *Note: By default, the application will automatically create a database named `voting_db` and all necessary tables.*

### 2. Running the Application
Open a terminal (or PowerShell) in the root of the `voting-backend` directory and run the following command to start the server:

```bash
# Using Maven Wrapper (Windows)
.\mvnw spring-boot:run

# Using Maven Wrapper (Mac/Linux)
./mvnw spring-boot:run
```

The server will start on port `8080`.

### Initial Data
When the application starts for the first time, it automatically inserts dummy data into the database so you can test the APIs immediately:
*   **Candidates**: Alice Smith, Bob Jones, Charlie Brown
*   **Users**: 
    *   Username: `student1`, Password: `password123`
    *   Username: `student2`, Password: `password123`
    *   Username: `student3`, Password: `password123`

## API Endpoints

The backend exposes the following REST APIs. All APIs have CORS enabled (`@CrossOrigin(origins = "*")`) so your React frontend can consume them from any port (e.g., `localhost:3000` or `localhost:5173`).

### 1. User Login
*   **Endpoint**: `POST /api/auth/login`
*   **Description**: Authenticates a user and returns a JWT token.
*   **Request Body**:
    ```json
    {
      "username": "student1",
      "password": "password123"
    }
    ```
*   **Success Response**: Returns the JWT token and user status.
    ```json
    {
      "token": "eyJhbGciOiJIUz...",
      "userId": 1,
      "hasVoted": false
    }
    ```

### 2. View Candidates
*   **Endpoint**: `GET /api/candidates`
*   **Description**: Returns a list of all candidates. Does NOT require authentication.
*   **Success Response**:
    ```json
    [
      { "id": 1, "name": "Alice Smith", "party": "Science Club", "imageUrl": null },
      { "id": 2, "name": "Bob Jones", "party": "Arts Club", "imageUrl": null }
    ]
    ```

### 3. Cast Vote
*   **Endpoint**: `POST /api/votes`
*   **Description**: Casts a vote for a candidate. Fails if the user has already voted.
*   **Headers Required**: `Authorization: Bearer <your_jwt_token>`
*   **Request Body**:
    ```json
    {
      "candidateId": 1
    }
    ```
*   **Success Response**:
    ```json
    {
      "message": "Vote cast successfully"
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request` if the user has already voted.
    *   `401 Unauthorized` if the JWT token is missing or invalid.

### 4. Display Results
*   **Endpoint**: `GET /api/results`
*   **Description**: Returns the total vote count for each candidate. Does NOT require authentication.
*   **Success Response**:
    ```json
    [
      { "candidateName": "Alice Smith", "voteCount": 2 },
      { "candidateName": "Bob Jones", "voteCount": 1 }
    ]
    ```

## Testing with Postman
A Postman collection has been generated to make it easy to test all the APIs.

1. Open Postman.
2. Click **Import** in the top left corner.
3. Select the file `Hack2-hcl\voting-backend\Voting-System-Postman-Collection.json`.
4. This will import a collection named **Online Voting System** containing 4 requests:
   - **View Candidates**: Gets the list of candidates.
   - **Login**: Sends credentials and automatically saves the returned `jwt_token` to your Postman Environment variables using a test script.
   - **Cast Vote**: Uses the saved token automatically. Just change the `candidateId` in the body.
   - **View Results**: Retrieves the latest vote counts.
