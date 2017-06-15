import faker from 'faker';

export default {
  'Valid signup': (client) => {
    client
      .url('http://localhost:3000/')
      .click('#signup')
      .waitForElementVisible('body')
      .assert.visible('Input[type=text]')
      .setValue('Input[type=text]', faker.name.findName())
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', faker.internet.email())
      .assert.visible('Input[name=password]')
      .setValue('Input[name=password]', '123456')
      .assert.visible('Input[name=confirmPassword]')
      .setValue('Input[name=confirmPassword]', '123456')
      .click('.btn')
      .waitForElementVisible('#logout')
      .assert.urlContains('documents')
      .end();
  },

  'Passwords do not match': (client) => {
    client
      .url('http://localhost:3000/')
      .click('#signup')
      .waitForElementVisible('body')
      .assert.visible('Input[type=text]')
      .setValue('Input[type=text]', 'Ajala')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'ajala@ode.com')
      .assert.visible('Input[name=password]')
      .setValue('Input[name=password]', '12345678')
      .assert.visible('Input[name=confirmPassword]')
      .setValue('Input[name=confirmPassword]', '123456')
      .click('.btn')
      .assert.urlContains('signup')
      .end();
  },

  'Email exists': (client) => {
    client
      .url('http://localhost:3000/')
      .click('#signup')
      .waitForElementVisible('body')
      .assert.visible('Input[type=text]')
      .setValue('Input[type=text]', 'Ajala')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'taiwo.adedotun@andela.com')
      .assert.visible('Input[name=password]')
      .setValue('Input[name=password]', 'adedotun')
      .assert.visible('Input[name=confirmPassword]')
      .setValue('Input[name=confirmPassword]', 'adedotun')
      .click('.btn')
      .assert.urlContains('signup')
      .end();
  },
};
