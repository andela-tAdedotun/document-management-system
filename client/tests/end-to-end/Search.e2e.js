/* eslint-disable func-names */
import expect from 'expect';

export default {
  'Search Documents': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'test@tester.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .elements('css selector', '.card', (collection) => {
        expect(collection.value.length).toBeGreaterThan(1);
      })
      .getText('.card-title', function (docTitle) {
        this.waitForElementVisible('#searchbar');
        this.setValue('#searchbar', docTitle.value);
      })
      .waitForElementVisible('.card')
      .elements('css selector', '.card', (collection) => {
        expect(collection.value.length).toEqual(1);
      })
      .end();
  },

  'Search Users': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'test@tester.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('#logout', 4000)
      .click('a[href=dashboard]')
      .waitForElementVisible('body', 3000)
      .assert.urlContains('dashboard')
      .waitForElementVisible('.btn-floating')
      .waitForElementVisible('.users')
      .click('.users')
      .elements('css selector', '.user-rows', (collection) => {
        expect(collection.value.length).toBeGreaterThan(1);
      })
      .getText('#user-email', function (email) {
        this.waitForElementVisible('#searchbar');
        this.setValue('#searchbar', email.value);
      })
      .waitForElementVisible('.user-rows')
      .elements('css selector', '.user-rows', (collection) => {
        expect(collection.value.length).toEqual(1);
      })
      .end();
  }
};
