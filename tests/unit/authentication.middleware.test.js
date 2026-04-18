const mongoose = require("mongoose");
const authenticate = require("../../middleware/authentication.middleware");
const { User } = require("../../models/user.model");

describe("Authentication middleware.", () => {
  it("should redeem token with and set the req payload.", () => {
    // arrange.
    const user = new User();
    user._id = mongoose.Types.ObjectId().toHexString();
    user.isAdmin = true;

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    // act.
    authenticate(req, res, next);

    // assert.
    expect(req.user).toBeDefined();
    expect(req.user).toMatchObject(user);
  });
});
