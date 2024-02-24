import { faker } from '@faker-js/faker'
import type { CreationAttributes } from 'sequelize'

import { Bet } from '../../database/models'

// TODO: add interface
export class BetFactory {
    public static build(bet?: Partial<CreationAttributes<Bet>>): CreationAttributes<Bet> {
        const win = faker.datatype.boolean()

        // TODO: user id
        return {
            amount: faker.number.float({ fractionDigits: 2, min: 1 }),
            chance: faker.number.float({ fractionDigits: 1, max: 1, min: 0 }),
            payout: win ? faker.number.float({ min: 1, max: 3000, fractionDigits: 2 }) : 0,
            win,
            ...bet,
        }
    }

    public static async create(bet?: Partial<CreationAttributes<Bet>>) {
        return Bet.create(this.build(bet))
    }

    public static async createMany(count: number, bet?: Partial<CreationAttributes<Bet>>) {
        return Bet.bulkCreate([...new Array(count)].map(() => {
            return this.build(bet)
        }))
    }
}
