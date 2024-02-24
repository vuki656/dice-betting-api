import { Sequelize } from 'sequelize'

import {
    env,
    logger,
} from '../utils'

export const sequelize = new Sequelize({
    database: env.POSTGRES_DATABASE_NAME,
    dialect: 'postgres',
    host: env.POSTGRES_HOST,
    logging: (operation, timing) => {
        logger.debug('Sequelize', {
            operation,
            timing,
        })
    },
    password: env.POSTGRES_PASSWORD,
    username: env.POSTGRES_USERNAME,
})
