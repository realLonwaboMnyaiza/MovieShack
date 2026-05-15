import { describe, it, expect } from 'vitest';
import pathModule from 'path';
import mongoose from 'mongoose';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../../src/models/user.model';

const environment = process.env.NODE_ENV;
const path = pathModule.join(process.cwd(), `.env.${environment}`);
dotenv.config({ path });

describe('when user.generateAuthenticationToken is called', () => {
  it('should return a valid JWT.', () => {
    // arrange.
    const privateKey = process.env.KEY || '';
    const payload: JwtPayload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };

    // act.
    const user = new User(payload);
    const token = user.generateAuthenticationToken();
    const decodedToken: JwtPayload | string = jwt.verify(token, privateKey);

    // assert.
    expect(decodedToken as JwtPayload).toMatchObject(payload);
  });
});
