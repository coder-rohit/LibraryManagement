I created a project named Library Management which is based on MERN Stack
The motive of this project is to make it easy for the librarian to efficiently manage activities in the library related to books and students.

I have used React.js for the client-side and Node (Express) for the server-side which is connected to a database (MongoDB).

My WebApp starts with a Login page if someone has not already logged in. Then after entering the right credentials it redirects to the dashboard. In the dashboard, we can register new Books or deregister old books, alter details of existing books, and the same in the case of students. There is a Search-box in the center of the navbar in which we can search a book or student using its name. Search-box shows results without submitting. This web app has all CRUD functions.

In the back-end, APIs are created in Node.js which sends and receives data from the database. And In the front end, I am using an npm-package Axios to fetch APIs. For login and logout, I am using react-cookie, and only function-based components are used throughout this WebApp.





I have created several APIs in the Node.js using framework Express.js. I used these APIs in my project for sending POST requests which contain parameters (body) and (header) to the server so it returns data from database or error from server if anything wrong happens. These APIs are used for admin login to match credentials from database, creating new entries, updating old entries or deleting. Basically for all CRUD operations. 

In the front end for fetching, I am using an npm-package Axios in React





There is the login form in which the user has to input their username and password, then after clicking on the login button an API will run and take these credentials to the server where it will match them with the credentials in the database. If they get matched then the user will be redirected to the Admin panel and if not matched then it will tell the user that the username or password is wrong. 

For this, I have used React for Frontend, Node.js (Express) for the backend, and MongoDB for the database.

Yes, I have implemented role management too.
For role management, I have created a field in the database which I named (role). Then while fetching login credentials, the value for this field is also fetched and get saved in react-cookie with the username. Then I used conditional rendering in react to render different components for different roles.





Database I used in my project is MongoDB. Till now I have used this database just for basic CRUD operations. 

I have worked on these backends technologies Node.js, Express.js, PHP, and SQL. For my Library management project, I have created an Admin panel in which I can manipulate data in a database using APIs. For this project, I have created 3 collections.

