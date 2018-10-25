process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest')(app);
// start from here
const seedDB = require('../seed/seed');
const {
  articleData,
  topicData,
  commentData,
  userData
} = require('../seed/testData');

describe('/api', function() {
  this.timeout(5000);
  let articleDocs, topicDocs, commentDocs, userDocs;
  beforeEach(() => {
    return seedDB({ articleData, topicData, commentData, userData }).then(
      docs => {
        [articleDocs, topicDocs, commentDocs, userDocs] = docs;
      }
    );
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe('/articles', () => {
    it('GET returns 200 and and array of articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).to.equal(articleDocs.length);
          // object Id here
          expect(articles[0]._id).to.equal(`${articleDocs[0]._id}`);
          expect(articles[0].title).to.equal(articleDocs[0].title);
        });
    });
  });
  describe('/articles/:articleId', () => {
    it('GET returns 200 and an individual article', () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(({ body: { article } }) => {
          const { _id, title, body, belongs_to, votes, commentCount } = article;
          expect(_id).to.equal(`${articleDocs[0]._id}`);
          expect(title).to.equal(articleDocs[0].title);
          expect(body).to.equal(articleDocs[0].body);
          expect(belongs_to).to.equal(articleDocs[0].belongs_to);
          expect(votes).to.equal(articleDocs[0].votes);
          expect(commentCount).to.equal(2);
        });
    });
    it('GET returns 404 for an non-existent articleId', () => {
      return request
        .get(`/api/articles/5babed7d5d951478a9722079`)
        .expect(404)
        .then(({ body, body: { msg } }) => {
          expect(msg).to.equal('article not found');
        });
    });
    it('GET returns 400 for an invalid id', () => {
      return request
        .get(`/api/articles/a`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('bad request');
        });
    });
  });
});
