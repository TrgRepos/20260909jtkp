import request from 'supertest';
import app from '../../../src/server';

describe('GET /api/users', () => {
  it('returns 200 and a non-empty list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/users/:id', () => {
  it('returns 200 and the matching user for a valid, existing id', async () => {
    const res = await request(app).get('/api/users/u1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('u1');
  });

  it('returns 404 for a well-formed but non-existent id', async () => {
    const res = await request(app).get('/api/users/u999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 for an invalid id format', async () => {
    const res = await request(app).get('/api/users/abc');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
