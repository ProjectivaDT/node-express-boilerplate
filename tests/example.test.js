const request = require("supertest");
const databaseLoader = require('../loaders/databaseLoader');

let app;

beforeAll(async() => {
  await databaseLoader();
  app = require("../app");
})

// Test
describe("GET /api/v1/example", () => {
  it("should return all examples", async () => {
    const res = await request(app).get("/api/v1/example");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
