const fs = require("fs");

test("search.ejs is accessible", async () => {
  const filePath = "views/search.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("index.ejs is accessible", async () => {
  const filePath = "views/index.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("login.ejs is accessible", async () => {
  const filePath = "views/login.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("register.ejs is accessible", async () => {
  const filePath = "views/register.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("results.ejs is accessible", async () => {
  const filePath = "views/results.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});
