'use strict';
const productos = require('../../src/data/productos.json')

let producto = productos.map( element => {
  let type = {
  nombre: element.marca,
  marca: "nada",
  type_id: element.producto === "Comida" ? 1 : element.producto === "Birra" ? 2 : 3 ,
  detalle: element.detalle,
  categoria_id: element.categoria === "nuevo" ? 1 : element.categoria === "especial" ? 2 : 3,
  precio: element.precio,
  descuento: element.descuento,
  stock: element.stock,
  vendidos: element.vendidos,
  createdAt: new Date,
  updatedAt: new Date
}
return type;
}) 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('products', producto, {});
    
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('products', null, {});
  }
};

