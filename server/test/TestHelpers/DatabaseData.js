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
    RoleId: 1
  },

  adminUser: {
    name: 'Kehinde Adedotun',
    email: 'kehinde.adedotun@xyz.com',
    password: '123456',
    RoleId: 2
  },

  regularUser: {
    name: 'Taiwo XYZ',
    email: 'taiwo@xyz.com',
    password: '123456',
    RoleId: 3
  },

  adminUser2: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    RoleId: 2
  },

  regularUser2: {
    name: 'Alao Akala',
    email: 'alao@akala.com',
    password: 'alaoakala',
    RoleId: 3
  },

  superAdminUser2: {
    name: 'Sola Adigun',
    email: 'sola@adigun.com',
    password: 'adigun',
    RoleId: 1
  },

  regularUser3: {
    name: 'Adeshola Barbie',
    email: 'adeshola@test.com',
    password: 'adeshola',
    RoleId: 3
  },

  adminUser3: {
    name: 'Cindy Barbie',
    email: 'cindy@test.com',
    password: 'cindy',
    RoleId: 2
  },

  regularUser4: {
    name: 'Sophiat Ayomide',
    email: 'sophiat@test.com',
    password: 'sophiat',
    RoleId: 3
  },

  validUser: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
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

  testDocument: {
    title: 'Daddy Yo',
    content: 'Wizzy boy, make me dance...',
    access: 'private',
    documentOwnerId: 1,
    isProtected: true
  },

  testDocument2: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    access: 'public',
    documentOwnerId: 3
  },

  testDocument3: {
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
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
    title: faker.lorem.word(),
    content: faker.lorem.paragraph(),
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
    content: `Mobile has been much more of a challenge: while Android remains a
     brilliant strategic move, its dominance is rooted more in its business
     model than in its quality (that’s not to denigrate its quality in the
     slightest, particularly the fact that Android runs on so many different
     kinds of devices at so many different price points).`,
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
    content: faker.lorem.paragraph(),
    access: 'public',
    documentOwnerId: 3
  },

  testDocument9: {
    title: 'Wizzy Baby',
    content: faker.lorem.paragraph(),
    access: 'role',
    documentOwnerId: 7
  },
};

export default SpecHelper;
