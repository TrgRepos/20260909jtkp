import request from 'supertest';
import app from '../../../src/server';

describe('GET /api/profiles', () => {
  it('returns 200 and a non-empty list of profiles', async () => {
    const res = await request(app).get('/api/profiles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/profiles/:id', () => {
  it('returns 200 and the matching profile for a valid, existing id', async () => {
    const res = await request(app).get('/api/profiles/p1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('p1');
  });

  it('returns 404 for a well-formed but non-existent id', async () => {
    const res = await request(app).get('/api/profiles/p999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /api/profiles', () => {
  it('creates a profile for a US user with a valid 5-digit ZIP', async () => {
    const res = await request(app).post('/api/profiles').send({
      userId: 'u5',
      displayName: 'Test User',
      country: 'US',
      postalCode: '30301',
      bio: 'Sample bio.',
    });
    expect(res.status).toBe(201);
    expect(res.body.postalCode).toBe('30301');
  });

  it('rejects an obviously malformed postal code', async () => {
    const res = await request(app).post('/api/profiles').send({
      userId: 'u5',
      displayName: 'Test User',
      country: 'US',
      postalCode: '!!!',
      bio: 'Sample bio.',
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  // Staging issue under investigation in Lab 3.1 - "EU users cannot save
  // profiles". Left in as `.skip` on purpose: this is the failing case
  // participants activate and then fix. Do not remove `.skip` outside
  // the lab flow.
  it.skip('creates a profile for a GB user with a valid UK postcode', async () => {
    const res = await request(app).post('/api/profiles').send({
      userId: 'u2',
      displayName: 'Liam O.',
      country: 'GB',
      postalCode: 'SW1A 1AA',
      bio: 'Sample bio.',
    });
    expect(res.status).toBe(201);
    expect(res.body.postalCode).toBe('SW1A 1AA');
  });
});
