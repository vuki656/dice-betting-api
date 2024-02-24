import { User } from '../../database/models'
import type { UserModule } from './resolver-types.generated'
import { getUserValidation } from './user.validation'

const UserQueriesResolver: UserModule.Resolvers = {
    Query: {
        getUserList: async () => {
            return User.findAll()
        },
        getUser: async (_, args, context) => {
            const { id } = context.validateInput(getUserValidation, args)

            return User.findByPkOrThrow(id)
        },
    },
}

export default UserQueriesResolver
