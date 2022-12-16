const request = require("supertest");
let server;

describe("/movies/mongo", () => {
  beforeEach(() => {
    server = require("./index");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return all movies", async () => {
      const res = await request(server).get("/movies/mongo");
      expect(res.status).toBe(200);
      expect(
        res.body.some((m) => m.title === "Nanook of the North")
      ).toBeTruthy();
    });
  });
});
