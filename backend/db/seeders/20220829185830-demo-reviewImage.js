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
     await queryInterface.bulkInsert("ReviewImages",
     [
        {
          reviewId: 1,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46437081/original/ae8b8858-7777-4003-8bc3-593e38d0b8e8.jpeg?im_w=960',
        },
        {
          reviewId: 2,
          url: 'https://a0.muscache.com/im/pictures/9a912f52-3303-41a6-a080-069fe36dddf1.jpg?im_w=1200',
        },
        {
          reviewId: 3,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46437081/original/a5f6d70e-436b-4c4b-b5b5-c3e001bcc999.jpeg?im_w=1200',
        },
        {
          reviewId: 4,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578239400261352288/original/98834cf3-98fb-453b-8e4f-6f839aa7dbbc.jpeg?im_w=960',
        },
        {
          reviewId: 5,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-578239400261352288/original/22b9e259-ac82-4728-8450-b8983e7da711.jpeg?im_w=1200',
        },

      ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ReviewImages', null, {})
  }
};
