'use strict';
let x = ["nuevo", "especial", "null"]

let categoria = x.map( element => {
  let type = {
  name: element,
  createdAt:new Date,
  updatedAt: new Date
}
return type;
}) 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('categories', categoria, {});
    
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('categories', null, {});
  }
};
