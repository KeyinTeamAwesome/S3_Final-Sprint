# Full_Stack_Semester3_QAP3

Semester 3 Final Sprint, build a RESTful API, Node/Express/EJS/MongoDB/PostgreSQ

- Date: Dec 7, 2022
- Assignment: Final Sprint
- Assignment Detail: Build a RESTful API, Node/Express/EJS/MongoDB/PostgreSQ
- Course Name: Full Stack JavaScript
- Written By: Makenzie Roberts, Kara Balsom and David Turner

1. Run npm init : this creates a basic package.json file
2. Run npm i --save-dev nodemon : installs nodemon to automatically refresh terminal while coding, check package.json to see the "dependency" section
3. Inside package.json after "main" create "scripts": if it does not already exist, the following can be copied and pasted into package.json
   "scripts": {
   "start": "nodemon express.js"
   },

and you should see this structure

"main": "index.js",
"scripts": {
"start": "nodemon index.js"
},
"author": "David Turner, Kara Balsom, Makenzie Roberts",

if scripts already exists do the following, NOTE a comma has to separate the 2

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon index.js"

}, 4. Then run the command npm run start

5. Added note for this you have to install, npm install method-override and npm install mongoose, separately after npm install -y

6. Install npm install uuid (Universally Unique Identifiers)

7. Install npm install date

8. Install npm install bootstrap, for css
