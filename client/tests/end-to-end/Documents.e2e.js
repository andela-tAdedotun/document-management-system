/* eslint-disable func-names */
import faker from 'faker';

export default {
  'Add Document': (client) => {
    const title = faker.lorem.word();
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
      .click('#addDocument')
      .waitForElementVisible('Input[name=title]')
      .setValue('Input[name=title]', title)
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraph())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button#submit')
      .click('button#submit')
      .waitForElementVisible('.modal-close')
      .click('.modal-close')
      .waitForElementVisible('body')
      .assert.containsText('body', title)
      .end();
  },

  'View Document': (client) => {
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
      .waitForElementVisible('a.read-more')
      .click('a.read-more')
      .waitForElementVisible('.open')
      .end();
  },

  'Edit Document': (client) => {
    const title = faker.lorem.word();
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'test@tester.com')
      .assert.visible('Input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .waitForElementVisible('a.edit')
      .click('a.edit')
      .assert.visible('.edit-title')
      .clearValue('.edit-title')
      .setValue('.edit-title', title)
      .waitForElementVisible('.edit-submit')
      .click('.edit-submit')
      .assert.containsText('body', title)
      .end();
  },

  'Delete Document': (client) => {
    let title;
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
      .getText('.card-title', function (docTitle) {
        title = docTitle;
        this.assert.containsText('body', title.value);
      })
      .waitForElementVisible('.delete-button')
      .click('.delete-button')
      .click('.no-delete')
      .pause(1000)
      .click('.delete-button')
      .click('.yes-delete')
      .pause(1000)
      .getText('.card-title', function (docTitle) {
        this.expect(docTitle.value).to.not.equal(title.value);
      })
      .end();
  }
};
