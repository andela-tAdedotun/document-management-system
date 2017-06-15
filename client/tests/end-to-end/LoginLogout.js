export default {
  'Valid Login and Logout': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo.adedotun@andela.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('.card')
      .assert.urlContains('documents')
      .click('#logout')
      .assert.urlContains('')
      .end();
  },

  'Invalid Login': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'monkey@andela.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .assert.urlContains('')
      .end();
  }
};
