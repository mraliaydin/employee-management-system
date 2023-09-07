# Employee Management System

This project is developed using Java Spring Boot and ReactJs

## Installation

### Backend
Use an IDE to run a Java Spring Boot then run EmsBackendApplication class.
### Frontend
* Vite is used.
- Instal packages:
```
npm install
```
To start the project use:
```
npm run dev
```


## Project Descriptions
### Backend

- This project includes Crud operations. 
- Three Layer architecture implemented.
- - Postman <-> DTO <-> Controller <-> Service <-> Dao <-> DB
- For database, MySql is used. Change application.properties for your local configurations.
- Lombok is used. No need to create getters and setters separately.
- There are two entities Department and Employee. There are many to one relationship between employee and department.
- Repositories extend JpaRepository.
- DTOs used to transfer the data between client and server. Used as a response for Rest APIs. Reason to use DTO is it may be dangerous for the system to access entities directly. 
- Mapper classes is used to map between entites and DTOs
- Business logics implemented inside service layer.
- API endpoints are placed inside of Controllers.
- @CrossOrigin("*") implemented inside of Controllers to get rid of the front-end cors errors.
- For not found errors ResourceNotFoundException class is used to handle errors.

### Frontend
* Bootstrap is used.
* Axios is used for API calls.
* react-router-dom is used for navigation/link/routing purposes.
* There is no context management bc its a small project :)


<img align="right" alt="Coding" width="400" src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif">


## License

[MIT](https://choosealicense.com/licenses/mit/)
