import { Sequelize } from 'sequelize';
import { Bet, User } from '../../database/models';
import { getBestBetPerUserValidation, getBetValidation } from './bet.validation';
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
        },
        getBestBetPerUser: async (_, args, context) => {
            const { limit } = context.validateInput(getBestBetPerUserValidation, args)


            const bets = await Bet.findAll({
                attributes: [
                    'userId',
                    [Sequelize.fn('MAX', Sequelize.col('amount')), 'maxBetAmount']
                ],
                group: [
                    'userId'
                ],
                limit,
                order: [
                    [ Sequelize.literal('maxBetAmount'), 'DESC' ]
                ]
            })

            console.log(bets)

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
