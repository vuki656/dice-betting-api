// @ts-check

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async down(queryInterface) {
        await queryInterface.dropDatabase('main')
    },
    async up(queryInterface) {
        await queryInterface.createDatabase('main')
    },
}
