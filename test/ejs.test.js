const fs = require("fs"); //Require filesystem global module.

test("search.ejs is accessible", async () => {
  //Test to check search.ejs file path is correct.
  const filePath = "views/search.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true); //Expects promise to be true if file path is accessible.
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("index.ejs is accessible", async () => {
  //Test to check index.ejs file path is correct.
  const filePath = "views/index.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true); //Expects promise to be true if file path is accessible.
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("login.ejs is accessible", async () => {
  //Test to check login.ejs file path is correct.
  const filePath = "views/login.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true); //Expects promise to be true if file path is accessible.
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("register.ejs is accessible", async () => {
  //Test to check register.ejs file path is correct.
  const filePath = "views/register.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true); //Expects promise to be true if file path is accessible.
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("results.ejs is accessible", async () => {
  //Test to check results.ejs file path is correct.
  const filePath = "views/results.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true); //Expects promise to be true if file path is accessible.
  } catch (err) {
    expect(true).toBe(false);
  }
});
