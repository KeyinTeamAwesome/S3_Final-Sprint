const fs = require("fs");

test("search.ejs is accessible", async () => {
  const filePath = "views/searches.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});
