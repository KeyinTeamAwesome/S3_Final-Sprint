<!--
    In VSCode, To switch to markdown preview mode, press Ctrl+Shift+V in the editor.

    To view preview side-by-side press (Ctrl+K V).
-->

# Semester 3 | Full-Stack JavaScript

## **Final Sprint: Movie Database Search Engine**

This is a group project for the Full-Stack JavaScript Final Sprint (3nd Semester) at Keyin College's Software Development Program.

This project uses **Node, Express, and PostgreSQL, MongoDB** to create a database search engine application, complete with user authentication, logging, multi-table joins and more. The user must visit the webpage to register and login, and then they gain access to a page which allows them to select either our Postgres or Mongo database, enter their search term and view the results.

### **Setup**

❗ The following instructions assume some prior experience with PostgreSQL and MongoDB.

#### **Setting up the PostgreSQL Database**

1. First, the database needs to be restored locally. In pgAdmin, create a new database named `data-structures-sprint1`. (If you decide you choose a different name for the database, make sure to update the 'database' property in `config.js` with the name you've chosen.)

2. Then, restore it using the file `SQL_and_Mongo-Docs/final-sprint_postgres_db_backup.sql`

   **OR**

   Create a database, and in a schema named 'public', run the table creation and insert statements for the 'movies' and 'production_companies' tables.

   The statements for the 'movies' table can be found in `SQL_and_Mongo-Docs/SQL_movies_create_and_insert.txt`

   The statements for the 'production_companies' table can be found in `SQL_and_Mongo-Docs/SQL_production_companies_create_and_insert.txt`

3. Before you start the program, please note that you must first alter `services/pgdb.js` to use your credentials. It is currently using the credentials used for PostgreSQL/pgAdmin from our Database Programming and Processing class, so you'll most likely have to update the user and password properties.

   In `config.js`, replace these user and password properties with your PostgreSQL credentials between the double quotes, and save the file.

   (**NOTE:** Do not include <>, they are just are placeholder markers.)

   ```
   const pool = new Pool({
      user: "<YOUR USERNAME>",
      host: "localhost",
      database: "<YOUR DATABASE NAME>",
      password: "<YOUR PASSWORD>",
      port: 5432,
   });
   ```

#### **Setting up the MongoDB Database**

1. Create a new database with two collections named 'movies' and 'production_companies'.

2. In the 'movies' collection, insert their respective documents.

   The statements for the 'movies' collection can be found in `SQL_and_Mongo-Docs/JSON_movies_documents.json`

   The statements for the 'production_companies' collection can be found in `SQL_and_Mongo-Docs/JSON_production_companies_documents.json`

3. In the main project folder, create a file named `.env` and paste your URI/MongoDB connection string. Replace `<YOUR CONNECTION STRING>` with your MongoDB connection string and save the file. We are using Mongo Atlas, so our variable is named `ATLAS_URI`

   ```
   ATLAS_URI=<YOUR CONNECTION STRING>
   ```

   The file `services/mdb.js` will use that connection string to connect to your database.

4. Lastly, navigate to `services/search.dal.js`. Around **line 100** you'll see the following code. Replace `"<YOUR DATABASE NAME>` with the name of the Mongo database you've created for this project, and save.

   ```
   try {
   		await mDal.connect();
   		const cursor = await mDal
   			.db("<YOUR DATABASE NAME>")
   			.collection("movies")
   			.aggregate(aggregateObject);
   ```
#### **Setting up the SESSION_SECRET in .env**

For this project, express must utilize an environment variable named `SESSION_SECRET`. In the .env file you created earlier, simply add the follwing line and replace <YOUR NAME> with your name. Don't forget to save.

```
SESSION_SECRET=<YOUR_NAME>
```
#### **Connecting to the Server**

1. To navigate to the main project folder, open the terminal and enter the command:

   ```
   cd S3_Final-Sprint

   ```

2. Next, install dependencies. Enter the command:

   ```
   npm install
   ```

3. Next, to run the program and start the server, enter the command:

   ```
   node index
   ```

   **OR** if you'd like to use nodemon:

   ```
   nodemon index
   ```

4. To view the webpage, visit the local server in your browser with the URL:

   ```
   http://localhost:3000/
   ```

5. To stop the server, navigate to your terminal and press `CTRL + C`.

---

### Contributers

<table>
  <tr>
    <th>Author</th>
    <th>GitHub</th>
  </tr>
  <tr>
    <td>Makenzie Roberts</td>
    <td>
      <a href="https://github.com/MakenzieRoberts"><img height="50px" src="https://avatars.githubusercontent.com/u/100213075?v=4"></a>
    </td>
  </tr> 
  <tr>
    <td>Kara Balsom</td>
    <td>
      <a href="https://github.com/kbalsom"><img height="50px" src="https://avatars.githubusercontent.com/u/100210446?v=4"></a>
    </td>
  </tr>
  <tr>
    <td>David Turner</td>
    <td>
      <a href="https://github.com/DeToxFox"><img height="50px" src="https://avatars.githubusercontent.com/u/95373983?v=4"></a>
    </td>
  </tr>

</table>
