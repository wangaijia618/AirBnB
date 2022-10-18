'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { firstName: 'Emily',
        lastName: 'Prentiss',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      { firstName: 'Penelope',
        lastName: 'Garcia',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      { firstName: 'David',
        lastName: 'Rossi',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Spencer',
        lastName: 'Reid',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Jennifer',
        lastName: 'Jareau',
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5'] }
    }, {});
  }
};
