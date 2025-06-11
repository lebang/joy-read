'use strict'

/** @type {import('sequelize-cli').Migration} */

import bcrypt from 'bcryptjs'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@lebang.cn',
          username: 'admin',
          password: bcrypt.hashSync('123456', 10),
          nickname: '管理员',
          gender: 1,
          role: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user1@lebang.cn',
          username: 'user1',
          password: bcrypt.hashSync('123456', 10),
          nickname: '普通用户1',
          gender: 0,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user2@lebang.cn',
          username: 'user2',
          password: bcrypt.hashSync('123456', 10),
          nickname: '普通用户2',
          gender: 0,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user3@lebang.cn',
          username: 'user3',
          password: bcrypt.hashSync('123456', 10),
          nickname: '普通用户3',
          gender: 1,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
