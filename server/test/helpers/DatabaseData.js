import faker from 'faker';

const SpecHelper = {
  superAdmin: {
    userRole: 'Super Admin'
  },

  regular: {
    userRole: 'Regular'
  },

  admin: {
    userRole: 'Admin'
  },

  testRole: {
    userRole: 'Content Creator'
  },

  superAdminUser: {
    name: 'Taiwo Adedotun',
    email: 'taiwo.adedotun@andela.com',
    password: '123456',
    roleId: 1
  },

  adminUser: {
    name: 'Kehinde Adedotun',
    email: 'kehinde.adedotun@xyz.com',
    password: '123456',
    roleId: 2
  },

  regularUser: {
    name: 'Taiwo XYZ',
    email: 'taiwo@xyz.com',
    password: '123456',
    roleId: 3
  },

  adminUser2: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },

  regularUser2: {
    name: 'Alao Akala',
    email: 'alao@akala.com',
    password: 'alaoakala',
    roleId: 3
  },

  superAdminUser2: {
    name: 'Sola Adigun',
    email: 'sola@adigun.com',
    password: 'adigun',
    roleId: 1
  },

  regularUser3: {
    name: 'Adeshola Barbie',
    email: 'adeshola@test.com',
    password: 'adeshola',
    roleId: 3
  },

  adminUser3: {
    name: 'Cindy Barbie',
    email: 'cindy@test.com',
    password: 'cindy',
    roleId: 2
  },

  regularUser4: {
    name: 'Sophiat Ayomide',
    email: 'sophiat@test.com',
    password: 'sophiat',
    roleId: 3
  },

  validUser: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  userHasUpperCaseEmail: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toUpperCase(),
    password: faker.internet.password()
  },

  tooShortPasswordUser: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toUpperCase(),
    password: 12345
  },

  tooLongPasswordUser: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toUpperCase(),
    password: 12345678910111213
  },

  invalidEmailUser: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: 'hello@test',
    password: 123456
  },

  validUser2: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  invalidUser: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    emil: faker.internet.email(),
    password: faker.internet.password()
  },

  invalidUser2: {
    emil: 'idowu@xyz.com',
    password: 'test'
  },

  invalidUser3: {
    email: 'ajagbe@xyz.com'
  },

  noNameUser: {
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  noPasswordUser: {
    email: faker.internet.email(),
    name: faker.name.firstName()
  },

  testDocument: {
    title: 'Daddy Yo',
    content: 'Wizzy boy, make me dance...',
    access: 'private',
    documentOwnerId: 1,
    isProtected: true
  },

  testDocument2: {
    title: 'Soweto Baby',
    content: 'Yeah, when you no dey',
    access: 'public',
    documentOwnerId: 3
  },

  testDocument3: {
    title: 'Dance',
    content: 'I will show you the money o...',
    documentOwnerId: 6,
    access: 'private'
  },

  testDocument4: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'role',
    documentOwnerId: 4,
    isProtected: false
  },

  testDocument5: {
    title: 'Mercy',
    content: 'Are you serious? Are you for real?',
    access: 'role',
    isProtected: false,
    documentOwnerId: 6
  },

  invalidDocument: {
    newTitle: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    myAccess: 'private',
    documentOwnerId: 3
  },

  testDocument6: {
    title: 'Mobile Computing',
    content: 'Mobile has been much more of a challenge: while Android remains' +
     ' a brilliant strategic move, its dominance is rooted more in its ' +
     'business model than in its quality (that’s not to denigrate its ' +
     'quality in the slightest, particularly the fact that Android runs on ' +
     'so many different kinds of devices at so many different price points).',
    access: 'role',
    documentOwnerId: 1
  },

  testDocument7: {
    title: 'Computing',
    content: `But computing is evolving again. We spoke last year about this
    important shift in computing, from a mobile-first, to an AI-first approach.
    Mobile made us re-imagine every product we were working on.
    We had to take into account that the user interaction model had
    fundamentally changed, with multitouch, location, identity, payments, and
    so on.`,
    access: 'private',
    documentOwnerId: 2
  },

  testDocument8: {
    title: 'Daddy',
    content: 'I am gonna search for rhythm while she pulls up...',
    access: 'public',
    documentOwnerId: 3
  },

  testDocument9: {
    title: 'Wizzy Baby',
    content: faker.lorem.paragraph(),
    access: 'role',
    documentOwnerId: 7
  },

  noTitleDocument: {
    content: 'We are the world',
    access: 'public',
    documentOwnerId: 1
  },

  noContentDocument: {
    title: 'Hello world!',
    access: 'private',
    documentOwnerId: 2
  },

  noAccessDocument: {
    title: 'Hello world!',
    content: 'We are the world',
    documentOwnerId: 2
  },

  noOwnerDocument: {
    title: 'Hello world!',
    content: 'We are the world',
    access: 'role',
    documentOwnerId: 100
  },

  validDocument: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
    documentOwnerId: 5
  }
};

export default SpecHelper;
