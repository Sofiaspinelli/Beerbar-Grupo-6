'use strict';
let x = ["Usuario", "Administrador", "superAdmin"]

let rol = x.map( element => {
  let type = {
  title: element,
  createdAt:new Date,
  updatedAt: new Date
}
return type;
}) 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('roles', rol, {});
    
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('roles', null, {});
  }
};

