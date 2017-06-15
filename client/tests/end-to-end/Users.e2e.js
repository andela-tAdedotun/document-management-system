/* eslint-disable func-names */
import faker from 'faker';

export default {
  'User Update Their Name': (client) => {
    let userName;
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', 'test@tester.com')
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('#logout')
      .click('a[href=dashboard]')
      .waitForElementVisible('body', 3000)
      .assert.urlContains('dashboard')
      .waitForElementVisible('.btn-floating')
      .getText('.username', function (name) {
        userName = name.value;
        this.expect.element('.username').text.to.equal(userName);
      })
      .click('.btn-floating')
      .waitForElementVisible('input[name=name]')
      .clearValue('input[name=name]')
      .setValue('input[name=name]', faker.name.firstName())
      .click('button[type=submit]')
      .waitForElementVisible('.username')
      .getText('.username', function () {
        this.expect.element('.username').text.to.not.equal(userName);
      })
      .end();
  },

  'User Update Their Email': (client) => {
    let userEmail;
    const newEmail = faker.internet.email();
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
      .getText('.user-email', function (email) {
        userEmail = email.value;
        this.expect.element('.user-email').text.to.equal(userEmail);
      })
      .click('.email-edit')
      .waitForElementVisible('input[name=email]')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', newEmail)
      .click('.email-submit')
      .waitForElementVisible('body')
      .assert.urlContains('')
      // log user back in and change email to former one
      .waitForElementVisible('body')
      .assert.visible('Input[type=email]')
      .setValue('Input[type=email]', newEmail)
      .assert.visible('input[type=password]')
      .setValue('Input[type=password]', '123456')
      .click('.btn')
      .waitForElementVisible('#logout')
      .click('a[href=dashboard]')
      .waitForElementVisible('body', 3000)
      .assert.urlContains('dashboard')
      .waitForElementVisible('.btn-floating')
      .click('.email-edit')
      .waitForElementVisible('input[name=email]')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'test@tester.com')
      .click('.email-submit')
      .assert.urlContains('')
      .end();
  },

  'Admin Delete User': (client) => {
    let userName;
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
      .waitForElementVisible('.delete-button')
      .getText('.user-name', function (name) {
        userName = name.value;
        this.assert.containsText('body', userName);
      })
      .click('.delete-button')
      .click('.user-delete')
      .waitForElementVisible('.delete-button')
      .getText('.user-name', function (name) {
        this.expect(userName).to.not.equal(name.value);
      })
      .end();
  },

  'Admin Change User Role': (client) => {
    let userRole;
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
      .waitForElementVisible('.admin-edit-user')
      .getText('.user-role', function (role) {
        userRole = role.value;
        this.expect(userRole).to.equal('Regular');
      })
      .click('.admin-edit-user')
      .waitForElementVisible('.role-list', 4000)
      .click('.role-list')
      .click('.role-list li:nth-child(3)')
      .click('.role-update')
      .waitForElementVisible('.user-role')
      .getText('.user-role', function (role) {
        this.expect(role.value).to.equal('Admin');
      })
      .end();
  },
};
