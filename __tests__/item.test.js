const request = require('supertest');
const app = require('../src/app');

describe('GET /items', () => {
	it('respond with json containing a list of all items', (done) => {
		request(app)
			.get('/api/items')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('GET /items/:id', () => {
	it('respond with json containing a single item', (done) => {
		request(app)
			.get('/api/items/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('GET /items/:id (invalid ID)', () => {
	it('respond with 404 item not found', (done) => {
		request(app)
			.get('/api/items/0')
			.set('Accept', 'application/json')
			.expect('Content-Type', 'text/plain; charset=utf-8')
			.expect(404) 
			.expect('Not Found')
			.end((err) => {
					if (err) return done(err);
					done();
			});
	});
});
