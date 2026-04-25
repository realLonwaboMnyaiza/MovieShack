const { Rental } = require("../../models/rental.model");
const mongoose = require("mongoose");
const request = require("supertest");

describe("POST /api/rentals/checkout", () => {
  let server;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    server = require("../../src/index");

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "John",
        surname: "Smith",
      },
      movie: {
        _id: movieId,
        title: "The Terminator",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await server.close();
  });

  it("should return 401 if user is not logged in.", async () => {
    // arrange.
    // act.
    const res = await request(server)
      .post("/api/rentals/return/")
      .send({ customerId, movieId });
    // assert.
    expect(res.status).toBe(401);
  });
  it("should return 400 when customerId is not provided.", async () => {
    // arrange.
    // act.
    const res = await request(server)
      .post("/api/rentals/return/")
      .send({ movieId });

    // assert.
    expect(res.status).toBe(400);
  });
  // todo: build out feature usign TDD...
  it.skip("should return 400 when movieId is not provided.", () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should return 400 when no rental is found for this customer/movie.", async () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should return 400 when rental is already processed.", async () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should return 200 when valid request is made.", async () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should set the return date.", async () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should calculate the rental fee.", async () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should increase the number in stock when movie is returned.", async () => {
    // arrange.
    // act.
    // assert.
  });
  it.skip("should return the rental when input is valid.", async () => {
    // arrange.
    // act.
    // assert.
  });
});
