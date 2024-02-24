import { Bet } from '../../database/models';
import { getBetValidation } from './bet.validation';
import { BetModule } from './resolver-types.generated';

const BetQueriesResolver: BetModule.Resolvers = {
    Query: {
        getBet: async (_, args, context) => {
            const { id } = context.validateInput(getBetValidation, args)

            const bet = await Bet.findByPkOrThrow(id)

            return {
                chance: bet.chance,
                win: bet.win,
                payout: bet.payout,
                betAmount: bet.amount,
                id: bet.id,
                userId: bet.userIdFk
            }
        },
        getBetList: async () => {
            const bets = await Bet.findAll()

            return bets.map((bet) => {
                return {
                    chance: bet.chance,
                    win: bet.win,
                    payout: bet.payout,
                    betAmount: bet.amount,
                    id: bet.id,
                    userId: bet.userIdFk
                }
            })
        }
    }
}

export default BetQueriesResolver
