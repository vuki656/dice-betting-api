import { UserFactory } from '../../../test/factories'
import { executeOperation } from '../../../test/utils'
import type {
    GetUserListQuery,
    GetUserListQueryVariables,
} from '../../graphql-test-types.generated'

import { GET_USER_LIST } from './user.queries.test'

describe('when `getUserList` query is called', () => {
    it('should return user list', async () => {
        const COUNT = 10

        await UserFactory.createMany(COUNT)

        const response = await executeOperation<
            GetUserListQuery,
            GetUserListQueryVariables
        >({
            query: GET_USER_LIST,
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.getUserList).toHaveLength(COUNT)
    })
})
