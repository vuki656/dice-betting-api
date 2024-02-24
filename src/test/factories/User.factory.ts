import { faker } from '@faker-js/faker'
import type { CreationAttributes } from 'sequelize'

import { User } from '../../database/models'

// TODO: add interface
export class UserFactory {
    public static build(user?: Partial<CreationAttributes<User>>): CreationAttributes<User> {
        return {
            balance: faker.number.float({ fractionDigits: 2, max: 3000, min: 0 }),
            name: faker.person.fullName(),
            ...user,
        }
    }

    public static async create(user?: Partial<CreationAttributes<User>>) {
        return User.create(this.build(user))
    }

    public static async createMany(count: number, user?: Partial<CreationAttributes<User>>) {
        return User.bulkCreate([...new Array(count)].map(() => {
            return this.build(user)
        }))
    }
}
