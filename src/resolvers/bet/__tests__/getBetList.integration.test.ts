import {
    BetFactory,
    UserFactory,
} from '../../../test/factories'
import { executeOperation } from '../../../test/utils'
import type {
    GetBetListQuery,
    GetBetListQueryVariables,
} from '../../graphql-test-types.generated'

import { GET_BET_LIST } from './bet.queries.test'

describe('when `getBetList` query is called', () => {
    it('should return bet list', async () => {
        const COUNT = 10

        const user = await UserFactory.create()

        await BetFactory.createMany(COUNT, {
            userIdFk: user.id,
        })

        const response = await executeOperation<
            GetBetListQuery,
            GetBetListQueryVariables
        >({
            query: GET_BET_LIST,
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.getBetList).toHaveLength(COUNT)
    })
})
