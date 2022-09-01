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
     await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2025-01-08",
          endDate: "2025-02-08",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2025-03-08",
          endDate: "2025-04-08",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2025-05-08",
          endDate: "2025-06-08",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2025-07-08",
          endDate: "2025-08-08",
        },
        {
          spotId: 5,
          userId: 5,
          startDate: "2025-08-10",
          endDate: "2025-08-18",
        },
      ],
      {}
    );
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', null, {})
  }
};
