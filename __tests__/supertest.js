const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
    describe('/', () => {
        it('responds with 200 status and texts/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
        });
      });
    });