import {
    Bet,
    User,
} from '../../database/models'
import { sequelize } from '../../shared/clients'
import { BusinessConstraintError } from '../../shared/errors'

import { createBetValidation } from './bet.validation'
import type { BetModule } from './resolver-types.generated'

export const BET_MULTIPLIER = 1.25

const BetMutationsResolver: BetModule.Resolvers = {
    Mutation: {
        createBet: async (_, args, context) => {
            const {
                betAmount,
                chance,
                userId,
            } = context.validateInput(createBetValidation, args)

            const user = await User.findByPkOrThrow(userId)

            if (user.balance < betAmount) {
                throw new BusinessConstraintError('User has insufficient balance', {
                    extensions: {
                        betAmount,
                        userBalance: user.balance,
                    },
                })
            }

            const bet = await sequelize.transaction(async (transaction) => {
                const win = Math.random() < chance

                const payout = betAmount * BET_MULTIPLIER

                const createdBet = await Bet.create({
                    amount: betAmount,
                    chance,
                    payout: win ? payout : 0,
                    userIdFk: userId,
                    win,
                }, { transaction })

                if (win) {
                    await User.update({ balance: user.balance + (payout - betAmount) }, {
                        transaction,
                        where: {
                            id: user.id,
                        },
                    })
                } else {
                    await User.update({ balance: user.balance - betAmount }, {
                        transaction,
                        where: {
                            id: user.id,
                        },
                    })
                }

                return createdBet
            })

            return {
                betAmount: bet.amount,
                chance: bet.chance,
                id: bet.id,
                payout: bet.payout,
                userId,
                win: bet.win,
            }
        },
    },
}

export default BetMutationsResolver
