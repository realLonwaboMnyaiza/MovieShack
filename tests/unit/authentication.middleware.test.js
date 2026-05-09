const pathModule = require('path');
const environment = process.env.NODE_ENV;
const path = pathModule.join(process.cwd(), '.env.' + environment);
require('dotenv').config({ path });
const mongoose = require('mongoose');
const authenticate = require('../../middleware/authentication.middleware');
const { User } = require('../../models/user.model');

describe('Authentication middleware.', () => {
  it('should redeem token with and set the req payload.', () => {
    // arrange.
    const user = new User();
    user._id = new mongoose.Types.ObjectId();
    user.isAdmin = true;

    const token = user.generateAuthenticationToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    // act.
    authenticate(req, res, next);

    // assert.
    expect(req.user).toBeDefined();
    expect(req.user.isAdmin).toEqual(user.isAdmin);
    expect(req.user._id).toEqual(user._id.toHexString());
  });
});
