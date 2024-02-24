import type { CreationAttributes } from 'sequelize'

import { Bet } from '../../database/models'
import { faker } from '../utils'

export class BetFactory {
    public static build(bet?: Partial<CreationAttributes<Bet>>): CreationAttributes<Bet> {
        const win = faker.datatype.boolean()

        return {
            amount: faker.betAmount(),
            chance: faker.betChance(),
            payout: win ? faker.betPayout() : 0,
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
