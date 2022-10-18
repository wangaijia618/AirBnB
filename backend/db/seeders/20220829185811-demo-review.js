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
        userId: 5,
        spotId: 1,
      },
      {
        review:'Clean',
        stars: 4,
        userId: 1,
        spotId: 2,
      },
      {
        review:'Smell',
        stars: 1,
        userId: 1,
        spotId: 3,
      },
      {
        review:'Amazing',
        stars: 4,
        userId: 3,
        spotId: 4,
      },
      {
        review:'Cozy',
        stars: 5,
        userId: 2,
        spotId: 5,
      },
      {
        review:'This is a review',
        stars: 4,
        userId: 2,
        spotId: 1,
      },
      {
        review:'This is a review',
        stars: 4,
        userId: 3,
        spotId: 2,
      },
      {
        review:'This is a review',
        stars: 1,
        userId: 5,
        spotId: 3,
      },
      {
        review:'This is a review',
        stars: 4,
        userId: 1,
        spotId: 4,
      },
      {
        review:'This is a review',
        stars: 5,
        userId: 4,
        spotId: 5,
      },
      {
        review:'This is a review',
        stars: 5,
        userId: 2,
        spotId: 6,
      },
      {
        review:'This is a review',
        stars: 5,
        userId: 5,
        spotId: 7,
      },
      {
        review:'This is a review',
        stars: 5,
        userId: 4,
        spotId: 8,
      },
      {
        review:'This is a review',
        stars: 5,
        userId: 1,
        spotId: 9,
      },
      {
        review:'This is a review',
        stars: 3,
        userId: 4,
        spotId: 10,
      },
      {
        review:'This is a review',
        stars: 4,
        userId: 4,
        spotId: 11,
      },

    ],{})
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
