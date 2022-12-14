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
          spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-36203760/original/25fb1f75-27ca-4e91-81ab-0d3d5850da55.jpeg?im_w=1200',
          preview: true
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/21b7a3dd-557d-459a-8dce-62fd6e509b6b.jpg?im_w=1200',
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
          url: 'https://a0.muscache.com/im/pictures/b4f8e3d5-91e7-4f9c-ba02-a8d46872941d.jpg?im_w=1200',
          preview: true
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/0554bb5c-dc7f-4846-9362-c6000f27dcfc.jpg?im_w=1200'
        },
        {
          spotId: 7,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-549955297779670220/original/a6f2f57d-a568-4b81-af41-e2502733eb49.jpeg?im_w=1200',
          preview: true
        },
        {
          spotId: 8,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-621261043483514840/original/0a4e07ed-f247-478c-9d66-0ddc578a3aa1.jpeg?im_w=1200',
          preview: true
        },
        {
          spotId: 9,
          url: 'https://a0.muscache.com/im/pictures/d0befc93-b08b-4d68-93a4-ee4d75fd3785.jpg?im_w=1200',
          preview: true
        },
        {
          spotId: 10,
          url: 'https://a0.muscache.com/im/pictures/efbbe684-2e93-4510-9cb2-951e8a210d59.jpg?im_w=1200',
          preview: true
        },
        {
          spotId: 11,
          url: 'https://a0.muscache.com/im/pictures/9c62c8c4-0317-435d-b520-7487a0bf5209.jpg?im_w=1200',
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
