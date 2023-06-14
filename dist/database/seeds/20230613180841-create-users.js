"use strict";'use strict';
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'john1@gmail.com',
          passwordHash: await bcryptjs.hash('123456', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Doe',
          email: 'doe@gmail.com',
          passwordHash: await bcryptjs.hash('123456', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'John Deer',
          email: 'johndeer@gmail.com',
          passwordHash: await bcryptjs.hash('123456', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  async down () {}
};
