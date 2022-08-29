'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert("Reviews", [
      {
        review:'Fancy',
        stars: 4,
        userId: 3,
        spotId: 2,
      },
      {
        review:'Clean',
        stars: 4,
        userId: 2,
        spotId: 3,
      },
      {
        review:'Smell',
        stars: 1,
        userId: 4,
        spotId: 1,
      },
      {
        review:'Amazing',
        stars: 4,
        userId: 3,
        spotId: 5,
      },
      {
        review:'Cozy',
        stars: 5,
        userId: 4,
        spotId: 3,
      }
    ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {})
  }
};
