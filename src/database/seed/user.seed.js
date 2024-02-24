// @ts-check

'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async down(queryInterface) {
        await queryInterface.bulkDelete('users', {}, {})
    },
    async up(queryInterface) {
        queryInterface.bulkInsert(
            'users',
            [...new Array(10)].map(() => {
                return {
                    balance: faker.number.float({
                        fractionDigits: 2,
                        max: 3000,
                        min: 0,
                    }),
                    name: faker.person.fullName(),
                }
            })
        )
    },
}
