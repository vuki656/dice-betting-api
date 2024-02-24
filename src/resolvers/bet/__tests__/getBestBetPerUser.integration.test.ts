import { ErrorCodeEnum } from '../../../shared/__generated__/enums'
import { BetFactory, UserFactory } from '../../../test/factories'
import { executeOperation } from '../../../test/utils'
import type {
    GetBestBetPerUserQuery,
    GetBestBetPerUserQueryVariables,
} from '../../graphql-test-types.generated'

import { GET_BEST_BET_PER_USER } from './bet.queries.test'

describe('when `getBestBetPerUser` query is called', () => {
    it('should return best bet for each user', async () => {
        const user1 = await UserFactory.create({ balance: 3000 })
        const user1Bet = await BetFactory.create({ userIdFk: user1.id, payout: 500, win: true })
        await BetFactory.create({ userIdFk: user1.id, payout: 300 })
        await BetFactory.create({ userIdFk: user1.id, payout: 200 })

        const user2 = await UserFactory.create({ balance: 3000 })
        const user2Bet = await BetFactory.create({ userIdFk: user2.id, payout: 700, win: true })
        await BetFactory.create({ userIdFk: user2.id, payout: 100 })
        await BetFactory.create({ userIdFk: user2.id, payout: 20 })

        const user3 = await UserFactory.create({ balance: 3000 })
        await BetFactory.create({ userIdFk: user3.id, payout: 300, win: true })
        await BetFactory.create({ userIdFk: user3.id, payout: 200 })
        await BetFactory.create({ userIdFk: user3.id, payout: 50 })

        const response = await executeOperation<
            GetBestBetPerUserQuery,
            GetBestBetPerUserQueryVariables
        >({
            query: GET_BEST_BET_PER_USER,
            variables: {
                limit: 2
            }
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

    it('should limit results if `limit` param passed', async () => {
        // const response = await executeOperation<
        //     GetBestBetPerUserQuery,
        //     GetBestBetPerUserQueryVariables
        // >({
        //     query: GET_BEST_BET_PER_USER,
        //     variables: {
        //         limit: 3
        //     }
        // })
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
