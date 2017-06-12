export default {
  'Valid login': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo.adedotun@andela.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .pause(2000)
      .assert.urlContains('documents')
      .click('#logout')
      .assert.urlContains('')
      .pause(2000)
      .end();
  },

  'Invalid login': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'monkey@andela.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .pause(2000)
      .assert.urlContains('')
      .pause(2000)
      .end();
  }
};
