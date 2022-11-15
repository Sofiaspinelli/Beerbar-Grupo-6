'use strict';
let x = ["Comida", "Bedidas", "Aperitivos"]

let tipos = x.map( element => {
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
  
    await queryInterface.bulkInsert('types', tipos, {});
    
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('types', null, {});
  }
};
