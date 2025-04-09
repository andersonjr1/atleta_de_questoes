# Atleta de questões

Atleta de Questões is a comprehensive full-stack application designed to empower users in their preparation for entrance exams. The platform combines a sleek, user-friendly front-end with a robust back-end to deliver a seamless and efficient study experience. Whether you're searching for specific questions, taking mock tests, tracking your performance, or identifying areas for improvement, Atleta de Questões has you covered.

## Table of Content
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project_structure)
* [Configuration](#configuration)
* [API Endpoints](#api_endpoints)
<a name="installation"></a>
## Installation
Steps to set up the project locally:

1. Clone the repository:

     ```bash
     git clone https://github.com/andersonjr1/atleta_de_questoes.git
     cd atleta_de_questoes/
     ```

1. Install dependencies:

     ```bash
     npm install
     ```
1. Set up environment variables:

     * Create a `.env` file in the root directory.
     * Add necessary environment variable (e.g., `PORT`, `SECRETE_KEY`).
1. Run sql scripts in your postgres database.

1. Run the application:

     ```
     npm start
     ```
     or, for development with nodemon:
     ```
     npm run dev
     ```

<a name="usage"></a>
## Usage
Once the application is running, you can interact with it through the front-end or directly via API endpoints.

* Visit `http://localhost:PORT` in your browser to access the home page.

<a name="project_structure"></a>
## Project Structure
```
project-name/
├── src/
│   ├── config/          # Enviroment configuration and database configuration.
│   ├── controllers/     # Logic for handling requests
│   ├── services/     # Logic for applying the rules of service
│   ├── repositories/     # Logic for interacting with the database
│   ├── public/          # Static components
│   ├── routes/          # API route definitions
│   ├── utils/           # Utility functions
│   └── server.js           # Main application file
├── .gitignore           # Files and directories to ignore in Git
├── package-lock.json    # Lockfile for dependencies
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```
<a name="configuration"></a>
## Configuration
To run this project, you need to set up environment variables in a `.env` file. Below are the required variables:
```.env
# Server Configuration
PORT=4000

# JWT Authentication
SECRET_KEY="your-secret-key-for-authentication"

# Database Configuration
DB_PORT=5432
DB_HOST="your ip"
DB_USER="database user"
DB_PASSWORD="database user password"
DB_NAME="database name"

```

Change all URLs in all index.js files in the pages directories.

<a name="api_endpoints"></a>
## API Endpoints
The API provides RESTful endpoints for interacting with the application. Below is a list of available endpoints, their methods, description, if login is necessary and if must be admin.

### Authentication
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| POST | /api/login/ | no | no | Authenticate an user |
| POST | /api/register/ | no | no | Creates an user |
| POST | /api/logout/ | no | no | Removes valid JWT cookie|
| POST | /api/auth/verify/ | no | no | Verify if the user is logged|

### Answer
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| POST | /api/answers/ | yes | no | Save the response |
| GET | /api/answers/ | yes | no | Return all user responses |
| GET | /api/answers/:id | yes | no | Gets an specific responce |

### Exam
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| GET | /api/exam/ | yes | no | Gets all exams that the user did |
| GET | /api/exam/:id | yes | no | Gets an specific exam of the user |
| POST | /api/exam/ | yes | no | Creates an exam for the user |
| PUT | /api/exam/:examId/question/:questionId | yes | no | Saves the response of one question of the exam |
| PUT | /api/exam/:id | yes | no | End one exam |

### Image
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| POST | /api/image/ | yes | yes | Upload an image to the server |

### Performance
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| GET | /api/subject-performance/ | yes | no | Return the performance of the user to be used in a graph |
| GET | /api/performance/ | yes | no | Return the performance of the user to be used in a graph |

### Points
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| GET | /api/points/ | yes | no | Returns the points and the level of a user |
| GET | /api/leaderboard/ | yes | no | Returns the points and the level of all users |

### Profile
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| GET | /api/profile/ | yes | no | Returns information about the logged user |
| PATCH | /api/profile/ | yes | no | Change user informations |
| POST | /api/profile/avatar | yes | no | Change user informations |

### Questions
| Method | Endpoint | Logged in | Admin | Description |
| ------ | -------- | --------- | ----- | ----------- |
| GET | /api/questions/:id | yes | no | Returns a specific question |
| GET | /api/questions | yes | no | Returns questions with or without filters |
| POST | /api/questions | yes | yes | Save a question |
| PUT | /api/questions/:id | yes | yes | Alter data of a question |
| DELETE | /api/questions/:id | yes | yes | Delete a question |






