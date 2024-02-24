import { ErrorCodeEnum } from '../../../shared/__generated__/enums'
import {
    BetFactory,
    UserFactory,
} from '../../../test/factories'
import { executeOperation } from '../../../test/utils'
import type {
    GetBestBetPerUserQuery,
    GetBestBetPerUserQueryVariables,
} from '../../graphql-test-types.generated'

import { GET_BEST_BET_PER_USER } from './bet.queries.test'

describe('when `getBestBetPerUser` query is called', () => {
    it('should return best bet for each user', async () => {
        const user1 = await UserFactory.create({ balance: 3000 })
        const user1Bet = await BetFactory.create({ payout: 500, userIdFk: user1.id, win: true })
        await BetFactory.create({ payout: 300, userIdFk: user1.id })
        await BetFactory.create({ payout: 200, userIdFk: user1.id })

        const user2 = await UserFactory.create({ balance: 3000 })
        const user2Bet = await BetFactory.create({ payout: 700, userIdFk: user2.id, win: true })
        await BetFactory.create({ payout: 100, userIdFk: user2.id })
        await BetFactory.create({ payout: 20, userIdFk: user2.id })

        const user3 = await UserFactory.create({ balance: 3000 })
        await BetFactory.create({ payout: 300, userIdFk: user3.id, win: true })
        await BetFactory.create({ payout: 200, userIdFk: user3.id })
        await BetFactory.create({ payout: 50, userIdFk: user3.id })

        const response = await executeOperation<
            GetBestBetPerUserQuery,
            GetBestBetPerUserQueryVariables
        >({
            query: GET_BEST_BET_PER_USER,
            variables: {
                limit: 2,
            },
        })

        const ids = response.body?.singleResult.data?.getBestBetPerUser.map((bet) => {
            return bet.id
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.getBestBetPerUser).toHaveLength(2)
        expect(ids).toEqual(expect.arrayContaining([
            user1Bet.id,
            user2Bet.id,
        ]))
    })

    describe('should throw', () => {
        it(`${ErrorCodeEnum.INPUT_VALIDATION} error if input invalid`, async () => {
            const response = await executeOperation<
                GetBestBetPerUserQuery,
                GetBestBetPerUserQueryVariables
            >({
                query: GET_BEST_BET_PER_USER,
                variables: {
                    limit: -1,
                },
            })

            expect(response.body?.singleResult.data).toBeNull()
            expect(response.body?.singleResult.errors?.[0]?.extensions?.code).toBe(ErrorCodeEnum.INPUT_VALIDATION)
        })
    })
})
