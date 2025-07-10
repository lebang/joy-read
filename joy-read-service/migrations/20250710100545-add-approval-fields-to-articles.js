'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Articles', 'status', {
      type: Sequelize.ENUM('draft', 'pending_review', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'draft'
    });
    await queryInterface.addColumn('Articles', 'approvedBy', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Articles', 'approvedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Articles', 'rejectionReason', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Articles', 'status');
    await queryInterface.removeColumn('Articles', 'approvedBy');
    await queryInterface.removeColumn('Articles', 'approvedAt');
    await queryInterface.removeColumn('Articles', 'rejectionReason');
  }
};