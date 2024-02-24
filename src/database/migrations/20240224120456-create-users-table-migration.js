// @ts-check

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async down(queryInterface) {
        await queryInterface.dropTable('users')
    },
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            balance: {
                allowNull: false,
                type: Sequelize.DataTypes.FLOAT,
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                unique: true,
            },
            name: {
                allowNull: false,
                type: Sequelize.DataTypes.TEXT,
            },
        })
    },
}
