// @ts-check

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async down(queryInterface) {
        await queryInterface.dropTable('bets')
    },
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bets', {
            amount: {
                allowNull: false,
                type: Sequelize.DataTypes.FLOAT,
            },
            chance: {
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
            payout: {
                allowNull: false,
                type: Sequelize.DataTypes.FLOAT,
            },
            userIdFk: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'users',
                },
                type: Sequelize.DataTypes.INTEGER,
            },
            win: {
                allowNull: false,
                type: Sequelize.DataTypes.BOOLEAN,
            },
        })
    },
}
