require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user.model");

describe("when user.generateAuthenticationToken is called", () => {
  it("should return a valid JWT.", () => {
    // arrange.
    const privateKey = process.env.KEY;
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };

    // act.
    const user = new User(payload);
    const token = user.generateAuthenticationToken();
    const decodedToken = jwt.verify(token, privateKey);

    // assert.
    expect(decodedToken).toMatchObject(payload);
  });
});
