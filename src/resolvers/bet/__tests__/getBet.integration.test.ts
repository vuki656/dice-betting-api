import { ErrorCodeEnum } from '../../../shared/__generated__/enums'
import {
    BetFactory,
    UserFactory,
} from '../../../test/factories'
import { executeOperation } from '../../../test/utils'
import type {
    BetPayloadFragment,
    GetBetQuery,
    GetBetQueryVariables,
} from '../../graphql-test-types.generated'

import { GET_BET } from './bet.queries.test'

describe('when `getBet` query is called', () => {
    it('should return bet', async () => {
        const user = await UserFactory.create()
        const bet = await BetFactory.create({
            userIdFk: user.id,
        })

        const response = await executeOperation<
            GetBetQuery,
            GetBetQueryVariables
        >({
            query: GET_BET,
            variables: {
                id: bet.id,
            },
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.getBet).toMatchObject<BetPayloadFragment>({
            betAmount: bet.amount,
            chance: bet.chance,
            id: bet.id,
            payout: bet.payout,
            userId: bet.userIdFk,
            win: bet.win,
        })
    })

    describe('should throw', () => {
        it(`${ErrorCodeEnum.INPUT_VALIDATION} error if input invalid`, async () => {
            const response = await executeOperation<
                GetBetQuery,
                GetBetQueryVariables
            >({
                query: GET_BET,
                variables: {
                    id: -1,
                },
            })

            expect(response.body?.singleResult.data).toBeNull()
            expect(response.body?.singleResult.errors?.[0]?.extensions?.code).toBe(ErrorCodeEnum.INPUT_VALIDATION)
        })
    })
})
