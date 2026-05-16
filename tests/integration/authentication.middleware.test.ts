import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { User } from '../../src/models/user.model';
import { Genre } from '../../src/models/genre.model';
import server from '../../src/index';

describe('Authentication middleware.', () => {
  afterEach(async () => {
    await Genre.deleteMany({});
  });

  it('should redeem token when valid token is provided.', async () => {
    // arrange.
    const user = new User();
    user.isAdmin = true;
    const genre = new Genre();
    genre.name = 'Genre 1';
    const token = user.generateAuthenticationToken();

    // act.
    const res = await request(server)
      .post('/api/genres/')
      .set('x-auth-token', token)
      .send({ name: genre.name });

    // assert.
    expect(res.status).toBe(201);
  });
  it('should return 401 when token is not provided.', async () => {
    // arrange.
    const genre = new Genre();
    genre.name = 'Genre 1';

    // act.
    const res = await request(server).post('/api/genres/').send(genre);

    // assert.
    expect(res.status).toBe(401);
  });
  it('should return 500 when invalid token is provided', async () => {
    // arrange.
    const genre = new Genre();
    genre.name = 'Genre 1';
    const token = 'broken';

    // act.
    const res = await request(server)
      .post('/api/genres/')
      .set('x-auth-token', token)
      .send(genre);

    // assert.
    expect(res.status).toBe(500);
  });
});
