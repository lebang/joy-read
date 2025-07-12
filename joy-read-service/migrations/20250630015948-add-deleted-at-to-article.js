'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Articles', 'deletedAt', {
      type: Sequelize.DATE,
    })
    await queryInterface.addIndex('Articles', {
      // 添加索引，便于查询
      fields: ['deletedAt'],
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Articles', 'deletedAt')
  },
}
