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

    describe('/graphql', () => {
        describe('GET', () => {
          it('responds with content-type appplication/json and status 200', async () => {
            const response = await request(server)
              .get('/graphql');
            expect(response.type).toBe('appplication/json');
            expect(response.statusCode).toBe(200);
          });
        });
      });