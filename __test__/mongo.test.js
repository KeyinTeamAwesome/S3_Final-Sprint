const mdb = require("../services/mdb");
const request = require("supertest");
let server;

describe("Testing Routes", () => {
  beforeAll(async () => {
    expect(mdb.connect()).toBeTruthy();
  });
  afterAll(() => {
    mdb.close();
  });
  test("should return search", async () => {
    const res = await request(server).get("/search/");
    expect(res.status).toBe(200);
  });
});
