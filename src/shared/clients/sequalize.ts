import { Sequelize } from 'sequelize'

import {
    env,
    logger,
} from '../utils'

export const sequelize = new Sequelize(
    env.POSTGRES_DATABASE_NAME,
    env.POSTGRES_USERNAME,
    env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: env.POSTGRES_HOST,
        logging: (operation, timing) => {
            logger.debug('Sequelize', {
                operation,
                timing,
            })
        },
    }
)
