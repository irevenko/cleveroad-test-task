const request = require('supertest');
const app = require('../src/app');

describe('POST /register', () => {
  const data = {
    "name": "RandomGuy",
    "email": "@rand.com",
    "password": "12345678q",
  }
  it('respond with 200 OK', (done) => {
    request(app)
      .post('/api/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200)
      .expect('OK')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});