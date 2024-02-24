import type { UserModule } from './resolver-types.generated'

const UserResolver: UserModule.Resolvers = {
    Query: {
        getUser: () => {
            return {
                balance: 0.1,
                id: 1,
                name: 'hi',
            }
        },
    },
}

export default UserResolver
