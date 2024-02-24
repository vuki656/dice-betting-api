// @ts-check

const { config } = require("dotenv")

config()

module.exports = {
    development: {
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        dialect: "postgres",
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DATABASE_NAME
    },
}
