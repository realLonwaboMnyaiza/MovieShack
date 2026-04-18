const request = require("supertest");
const { User } = require("../../models/user.model");
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
  describe("POST /", () => {
    it("should return 401 if user is not logged in.", async () => {
      // arrange.
      const genre = {
        name: "Genre 1",
      };

      // act.
      const res = await request(server).post("/api/genres").send(genre);

      // assert.
      expect(res.status).toBe(401);
    });
    it("should return 400 if genre name is less than 5 characters.", async () => {
      // arrange.
      const user = new User();
      user.name = "1234";
      const token = user.generateAuthenticationToken();

      // act.
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send(user);

      // assert.
      expect(res.status).toBe(400);
    });
    it("should return 400 if genre name is more than 50 characters.", async () => {
      // arrange.
      const user = new User();
      user.name = new Array(51).join("a");

      // act.
      const res = request(server)
        .post("api/genres")
        .set("x-auth-token")
        .send(user);

      // assert.
      expect(res.status).toBe(400);
    });
    it("should save the genre when it is valid.", async () => {
      // arrange.
      const user = new User();
      user.name = "John Smith";
      const token = user.generateAuthenticationToken();

      // act.
      const res = await request(server)
        .post("api/genres")
        .set("x-auth-token", token)
        .send(user);
      const genre = await Genre.findById(user._id);

      // assert.
      expect(res.status).toBe(201);
      expect(genre).not.toBeNull();
    });
    it("should return the genre when it is saved.", async () => {
      // arrange.
      const user = new User();
      user.name = "John Smith";
      const token = user.generateAuthenticationToken();

      // act.
      const res = await request(server)
        .post("api/genres")
        .set("x-auth-token", token)
        .send(user);

      // assert.
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name");
    });
  });
});
