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
     await queryInterface.bulkInsert("SpotImages",
     [
      {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-36203760/original/25fb1f75-27ca-4e91-81ab-0d3d5850da55.jpeg?im_w=1200',
          preview: true
        },
        {
          spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-36203760/original/0464de12-5582-4168-9f1b-f02be5403d28.jpeg?im_w=1200',
          preview: true
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/7d223ee4-c329-4508-bf53-dd82002a8878.jpg?im_w=1200',
          preview: true
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/monet/Select-45160809/original/c7cfd5ca-64b4-4ea2-b31a-5d6f7ad9d929?im_w=1200',
          preview: true
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/b4f8e3d5-91e7-4f9c-ba02-a8d46872941d.jpg?im_w=960',
          preview: true
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
     await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
