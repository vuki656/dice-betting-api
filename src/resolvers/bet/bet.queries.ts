import { Bet } from '../../database/models'
import { sequelize } from '../../shared/clients'

import {
    getBestBetPerUserValidation,
    getBetValidation,
} from './bet.validation'
import type { BetModule } from './resolver-types.generated'

const BetQueriesResolver: BetModule.Resolvers = {
    Query: {
        getBestBetPerUser: async (_, args, context) => {
            const { limit } = context.validateInput(getBestBetPerUserValidation, args)

            const [bets] = await sequelize.query(`
                SELECT bet.*
                    FROM public.bets bet
                    WHERE payout = (
                        SELECT MAX(payout)
                        FROM bets
                        WHERE "userIdFk" = bet."userIdFk"
                    )
                    ORDER BY payout DESC
                    LIMIT ${limit};
            `) as [Bet[], unknown]

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
