import { Sequelize } from 'sequelize'
import { env } from '../utils'

export const sequelize = new Sequelize(
    env.POSTGRES_DATABASE_NAME,
    env.POSTGRES_USERNAME,
    env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: env.POSTGRES_HOST,
    }
)
