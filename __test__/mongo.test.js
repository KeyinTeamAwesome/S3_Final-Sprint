const mdb = require("../services/mdb");

test("connect to MongoDB", () => {
  expect(mdb.connect()).toBeTruthy();
});
afterAll(() => {
  mdb.close();
});
