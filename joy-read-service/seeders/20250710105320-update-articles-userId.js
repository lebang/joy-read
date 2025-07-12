'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Update all articles to belong to user with ID 1.
     */
    await queryInterface.bulkUpdate(
      'Articles',
      {
        userId: 1,
      },
      {},
    ) // An empty where clause applies the update to all rows.
  },

  async down(queryInterface, Sequelize) {
    /**
     * Revert the seed.
     * This example sets the userId back to NULL.
     * This will only work if the userId column is nullable.
     */
    await queryInterface.bulkUpdate(
      'Articles',
      {
        userId: null,
      },
      {},
    )
  },
}
