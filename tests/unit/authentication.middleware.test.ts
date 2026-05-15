import { vi, describe, it, expect } from 'vitest';
import pathModule from 'path';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import authenticate from '../../src/middleware/authentication.middleware';
import { User } from '../../src/models/user.model';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV;
const path = pathModule.join(process.cwd(), `.env.${environment}`);
dotenv.config({ path });

describe('Authentication middleware.', () => {
  it('should redeem token with and set the req payload.', () => {
    // arrange.
    const user = new User();
    user._id = new mongoose.Types.ObjectId();
    user.isAdmin = true;

    const token = user.generateAuthenticationToken();

    const req = {
      header: vi.fn().mockReturnValue(token),
    } as Partial<Request>;
    const res = {
    } as Partial<Response>;
    const next = vi.fn();

    // act.
    authenticate(req as Request, res as Response, next);

    // assert.
    expect(req.token).toBeDefined();
    expect(req.token?.isAdmin).toEqual(user.isAdmin);
    expect(req.token?._id).toEqual(user._id.toHexString());
  });
});
