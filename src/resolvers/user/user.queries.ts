import { User } from '../../database/models'
import type { UserModule } from './resolver-types.generated'
import { getUserValidation } from './user.validation'

const UserQueriesResolver: UserModule.Resolvers = {
    Query: {
        getUser: async (_, args, context) => {
            const { id } = context.validateInput(getUserValidation, args)

            const user = await User.findByPkOrThrow(id)
            
            return {
                balance: user.balance,
                id: user.id,
                name: user.name,
            }
        },
    },
}

export default UserQueriesResolver
