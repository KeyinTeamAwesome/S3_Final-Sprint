// const express = require("express");
// const app = express();
// app.search("view engine", ejs);
// app.set("views", __dirname + "/views");

// app.get("/", function (req, res) {
//   res.render("index", { title: "Team Awesome Test App" });
// });
// const port = 3000;
// app.listen(3000, function () {
//   console.log(`Server is listening on port ${port}`);
// });

// const request = require("supertest");
// const server = require("../index.js");
// const app = server.setup_server();

// describe("Testing Trees Routes", () => {
//   beforeAll(async () => {
//     try {
//       await app.locals.dal.connect();
//       global.collection = app.locals.dal.db("sprint2").collection("movies");
//       global.DEBUG = true;
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   afterAll(async () => {
//     app.locals.dal.close();
//   });

//   test("Responds to /search/", async () => {
//     const res = await request(app).get("/search/");
//     expect(res.header["content-type"]).toMatch(/html/);
//     expect(res.statusCode).toEqual(200);
//   });
// });
