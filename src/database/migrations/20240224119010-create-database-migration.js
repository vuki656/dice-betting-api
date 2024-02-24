// @ts-check

'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async down(queryInterface) {
        queryInterface.dropDatabase('main')
    },
    async up(queryInterface) {
        queryInterface.createDatabase('main')
    },
}
