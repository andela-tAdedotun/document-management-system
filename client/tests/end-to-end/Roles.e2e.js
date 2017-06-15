/* eslint-disable func-names */
import faker from 'faker';

export default {
  'Admin Add Role': (client) => {
    const newRole = faker.lorem.word();
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
      .waitForElementVisible('.roles')
      .click('.roles')
      .waitForElementVisible('.add-role')
      .click('.add-role')
      .waitForElementVisible('.role-input')
      .setValue('#userRole', newRole)
      .click('.role-submit')
      .waitForElementVisible('body')
      .assert.containsText('body', newRole)
      .end();
  },

  'Admin Delete Role': (client) => {
    let roleToDelete;
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
      .waitForElementVisible('.roles')
      .click('.roles')
      .getText('.role-name', function (role) {
        roleToDelete = role.value;
        this.assert.containsText('body', roleToDelete);
      })
      .waitForElementVisible('.role-delete-button')
      .click('.role-delete-button')
      .waitForElementVisible('.role-delete')
      .click('.role-delete')
      .waitForElementVisible('body')
      .getText('.role-name', function (role) {
        this.expect(role.value).to.not.equal(roleToDelete);
      })
      .end();
  }
};
