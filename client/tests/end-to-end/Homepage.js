import faker from 'faker';

export default {
  'Add document': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo@xyz.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .pause(2000)
      .assert.urlContains('documents')
      .click('#addDocument')
      .assert.visible('Input[name=title]')
      .setValue('Input[name=title]', faker.lorem.word())
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button#submit', 2000)
      .click('button#submit')
      .pause(2000)
      .end();
  },

  'View document': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo@xyz.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('body', 2000)
      .assert.urlContains('documents')
      .waitForElementVisible('a.read-more', 2000)
      .click('a.read-more')
      .pause(2000)
      .end();
  },

  'Edit document': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo@xyz.com')
      .assert.visible('Input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .pause(2000)
      .assert.urlContains('documents')
      .waitForElementVisible('a.edit', 2000)
      .click('a.edit')
      .pause(2000)
      .assert.visible('.edit-title')
      .clearValue('.edit-title')
      .setValue('.edit-title', faker.lorem.word())
      .pause(2000)
      .waitForElementVisible('.edit-submit', 2000)
      .click('.edit-submit')
      .end();
  },

  'Delete document': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo@xyz.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .pause(2000)
      .assert.urlContains('documents')
      .waitForElementVisible('.delete-button', 2000)
      .click('.delete-button')
      .click('.no-delete')
      .pause(2000)
      .click('.delete-button')
      .click('.yes-delete')
      .pause(2000)
      .end();
  }
};
