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
      .setValue('Input[name=title]', 'The Man Who Owns the Moon')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button#submit', 2000)
      .pause(2000)
      .end();
  },

  'Edit document': (client) => {
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
      .click('button.btn-floating.btn-large.cyan')
      .assert.visible('Input[name=title]')
      .setValue('Input[name=title]', 'The Richest Man in Babylon')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button#submit', 2000)
      .pause(2000)
      .end();
  }
};
