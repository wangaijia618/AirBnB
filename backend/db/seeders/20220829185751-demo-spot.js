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
   await queryInterface.bulkInsert('Spots',
   [
    { ownerId: 1,
      address: "111 First",
      city: "firstcity",
      state: "firststate",
      country: "USA",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Cozy Lakefront Home",
      description: "Place where web developers are created",
      price: 101,
    },
    { ownerId: 2,
      address: "222 Second",
      city: "secondcity",
      state: "secondstate",
      country: "USA",
      lat: 22.3423533,
      lng: 122.4450327,
      name: "Beachfront Cozy House",
      description: "Large Open Window and Great Views",
      price: 202,
    },
    { ownerId: 3,
      address: "333 Third",
      city: "thirdcity",
      state: "thirdstate",
      country: "USA",
      lat: 33.1234567,
      lng: 79.1234567,
      name: "Bay Front Water View",
      description: "Privated Heated Pool",
      price: 303,
    },
    { ownerId: 4,
      address: "444 Fourth",
      city: "fourthcity",
      state: "fourthstate",
      country: "USA",
      lat: 66.7622258,
      lng: -102.4777727,
      name: "Cozy Lakefront Home",
      description: "Place where web developers are created",
      price: 404,
    },
    { ownerId: 5,
      address: "555 Fifth",
      city: "fifthcity",
      state: "fifthstate",
      country: "USA",
      lat: 21.1235358,
      lng: 70.4730327,
      name: "Elegant Flat",
      description: "Lower Garden District",
      price: 505,
    },
    { ownerId: 1,
      address: "666 sixth",
      city: "sixthcity",
      state: "sixthstate",
      country: "USA",
      lat: 37.7808088,
      lng: 87.4733327,
      name: "Cozy Lakefront Home",
      description: "Place where web developers are created",
      price: 606,
    },
    { ownerId: 2,
      address: "777 seventh",
      city: "city1",
      state: "state1",
      country: "USA",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Luxury Home",
      description: "Beautiful view",
      price: 707,
    },
    { ownerId: 3,
      address: "888 eighth",
      city: "eighthcity",
      state: "eighthstate",
      country: "USA",
      lat: 66.7666658,
      lng: -132.4343327,
      name: "Modern Lodge",
      description: "Brand New Cabin",
      price: 808
    },
    { ownerId: 4,
      address: "999 nineth",
      city: "ninethcity",
      state: "ninethstate",
      country: "USA",
      lat: 17.2245358,
      lng: -55.4730327,
      name: "Iconic Home",
      description: "close to downtown",
      price: 909,
    },
    { ownerId: 5,
      address: "1010 tenth",
      city: "tenthcity",
      state: "tenthstate",
      country: "USA",
      lat: 57.7645358,
      lng: -12.4734527,
      name: "Last House",
      description: "this is a description",
      price: 1010,
    },

], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots', null, {})
  }
};
