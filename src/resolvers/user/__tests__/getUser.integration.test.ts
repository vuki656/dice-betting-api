import { ErrorCodeEnum } from '../../../shared/__generated__/enums'
import { UserFactory } from '../../../test/factories'
import { executeOperation } from '../../../test/utils'
import type {
    GetUserQuery,
    GetUserQueryVariables,
    UserPayloadFragment,
} from '../../graphql-test-types.generated'

import { GET_USER } from './user.queries.test'

describe('when `getUser` query is called', () => {
    it('should return user', async () => {
        const user = await UserFactory.create()

        const response = await executeOperation<
            GetUserQuery,
            GetUserQueryVariables
        >({
            query: GET_USER,
            variables: {
                id: user.id,
            },
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.getUser).toMatchObject<UserPayloadFragment>({
            balance: user.balance,
            id: user.id,
            name: user.name,
        })
    })

    describe('should throw', () => {
        it(`${ErrorCodeEnum.INPUT_VALIDATION} error if input invalid`, async () => {
            const response = await executeOperation<
                GetUserQuery,
                GetUserQueryVariables
            >({
                query: GET_USER,
                variables: {
                    id: -1,
                },
            })

            expect(response.body?.singleResult.data).toBeNull()
            expect(response.body?.singleResult.errors?.[0]?.extensions?.code).toBe(ErrorCodeEnum.INPUT_VALIDATION)
        })
    })
})
