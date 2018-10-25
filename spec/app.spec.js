process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe('/api', function() {
  describe('/articles', () => {
    it('GET returns 200 and and array of articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          console.log(res.body);
        });
    });
  });
});
