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
        review:'Amazing location. Space is Compact.',
        stars: 4,
        userId: 5,
        spotId: 1,
      },
      {
        review:'This was the perfect little spot for a few nights stay in Manhattan.',
        stars: 4,
        userId: 1,
        spotId: 2,
      },
      {
        review:'They were greate hosts, very responsive. I would definitely stay there again.',
        stars: 1,
        userId: 1,
        spotId: 3,
      },
      {
        review:'Amazing apartment and great view.',
        stars: 4,
        userId: 3,
        spotId: 4,
      },
      {
        review:'Excellent place to stay.',
        stars: 5,
        userId: 2,
        spotId: 5,
      },
      {
        review:'We had a great stay here. The house is adorable.',
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
        review:'Location is fantastic.',
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
        review:'Very clean and nicely updated.',
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
