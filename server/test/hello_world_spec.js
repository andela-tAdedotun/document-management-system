const request = require('request');

const baseUrl = 'http://localhost:3000/';

process.env.NODE_ENV = 'test';

describe('Hello World Server', () => {
  describe('GET /', () => {
    it('returns status code 200', (done) => {
      request.get(baseUrl, (error, response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});

describe('hi', () => {
  it('should', () => {
    expect(false).toBeTruthy();
  });
});
