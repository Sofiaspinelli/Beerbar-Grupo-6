const {sequalize, sequelize} = require("../database/models");

const dbConnectionTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('exito');
    } catch (error) {
        console.log('nope', error);
    }
};

module.exports = dbConnectionTest;