export default {
  'Super admin login': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo.adedotun@andela.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .pause(5000)
      .assert.urlContains('documents')
      .click('#logout')
      .assert.urlContains('')
      .pause(5000)
      // .pause(1000)
      .end();
  },

  'Add document': (client) => {
    client
      .waitForElementVisible('div > button#addDocument', 5000)
      // .assert.visible('div#documents > button#addDocument')
      .pause(5000)
      .click('#add-document')
      .pause(5000)
      .acceptAlert()
      // .assert.urlContains('documents')
      .end();
  }
};
