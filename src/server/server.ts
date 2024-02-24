import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { sequelize } from '../shared/clients'
import {
    env,
    logger,
} from '../shared/utils'

import type { ContextType } from './context'
import { initializeContext } from './context'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const server = new ApolloServer<ContextType>({
    plugins: [
        // TODO:
    ],
    resolvers,
    typeDefs,
    // TODO: other stuff??
})

export async function startServer() {
    await sequelize.authenticate()

    await startStandaloneServer(server, {
        context: initializeContext,
        listen: {
            port: env.APP_PORT,
        },
    })
        .then(({ url }) => {
            logger.info(`Server started on ${url}`)
        })
        .catch((error: unknown) => {
            logger.error('Failed to start server', error)
        })
}

