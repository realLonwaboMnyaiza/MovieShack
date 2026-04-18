const request = require("supertest");
const { Genre } = require("../../models/genre.model");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../src/index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres.", async () => {
      // arrange.
      await Genre.collection.insertMany([
        { name: "Genre 1" },
        { name: "Genre 2" },
      ]);

      // act.
      const res = await request(server).get("api/genres");

      // assert.
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "Genre 1")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return a genre if ID is provided.", async () => {
      // arrange.
      const genre = new Genre({ name: "Genre 1" });
      await genre.save();

      // act.
      const res = await request(server).get("/api/genres/" + genre._id);

      // assert.
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
    it("should return 404 if invalid ID is provided.", async () => {
      // arrange.
      // act.
      const res = await request(server).get("/api/genres/1");

      // assert.
      expect(res.status).toBe(404);
    });
  });
});
