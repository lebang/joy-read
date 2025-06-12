'use strict'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Courses',
      [
        {
          categoryId: 1,
          userId: 1,
          name: 'CSS 入门',
          recommended: true,
          introductory: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 2,
          userId: 1,
          name: 'Node.js 项目实践',
          recommended: true,
          introductory: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: 3,
          userId: 1,
          name: 'html',
          recommended: true,
          introductory: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
  },
}
