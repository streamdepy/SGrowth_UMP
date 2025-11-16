const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Users', [{
        email: 'agif@student.unand.ac.id',
        username: 'agif',
        type: 'c',
        password: await bcrypt.hash('agif',10),
        active: "1",
        role:'2',
        created_at: new Date(),
        updated_at: new Date(),
      }  
   ],{});
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
