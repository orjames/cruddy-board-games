'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  return queryInterface.bulkInsert('games', [{
      name: "battleship",
      description: "Awesome naval combat game of strategy and guessing and humility",
      players: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "chess",
      description: "modern new innovative game of capturing pieces to ensure world domination",
      players: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "twister",
      description: "sedentary game that requires flexible minds to do easy menial tasks",
      players: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('games', null, {});
  }
};
