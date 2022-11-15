'use strict';
let x = require('../../src/data/productos.json')

let img = x.map( element => {
  let type = {
  name: element.imagen,
  products_id: element.id,
  createdAt:new Date,
  updatedAt: new Date
}
return type;
}) 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('images', img, {});
    
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('images', null, {});
  }
};