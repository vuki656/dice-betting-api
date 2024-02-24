import { Sequelize } from 'sequelize'

import { Bet } from '../../database/models'

import {
    getBestBetPerUserValidation,
    getBetValidation,
} from './bet.validation'
import type { BetModule } from './resolver-types.generated'

const BetQueriesResolver: BetModule.Resolvers = {
    Query: {
        getBestBetPerUser: async (_, args, context) => {
            const { limit } = context.validateInput(getBestBetPerUserValidation, args)

            const bets = await Bet.findAll({
                attributes: [
                    'userId',
                    [Sequelize.fn('MAX', Sequelize.col('amount')), 'maxBetAmount'],
                ],
                group: [
                    'userId',
                ],
                limit,
                order: [
                    [Sequelize.literal('maxBetAmount'), 'DESC'],
                ],
            })

            return bets.map((bet) => {
                return {
                    betAmount: bet.amount,
                    chance: bet.chance,
                    id: bet.id,
                    payout: bet.payout,
                    userId: bet.userIdFk,
                    win: bet.win,
                }
            })
        },
        getBet: async (_, args, context) => {
            const { id } = context.validateInput(getBetValidation, args)

            const bet = await Bet.findByPkOrThrow(id)

            return {
                betAmount: bet.amount,
                chance: bet.chance,
                id: bet.id,
                payout: bet.payout,
                userId: bet.userIdFk,
                win: bet.win,
            }
        },
        getBetList: async () => {
            const bets = await Bet.findAll()

            return bets.map((bet) => {
                return {
                    betAmount: bet.amount,
                    chance: bet.chance,
                    id: bet.id,
                    payout: bet.payout,
                    userId: bet.userIdFk,
                    win: bet.win,
                }
            })
        },
    },
}

export default BetQueriesResolver
