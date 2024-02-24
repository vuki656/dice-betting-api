/* eslint-disable @typescript-eslint/require-await -- Apollo plugin definition requires every step to be async */

import type { ApolloServerPlugin } from '@apollo/server'

import type { ContextType } from '../context'

export const ApolloPluginLogger: ApolloServerPlugin<ContextType> = {
    async requestDidStart(requestContext) {
        if (requestContext.request.operationName === 'IntrospectionQuery') {
            return
        }

        requestContext.contextValue.logger.info({
            message: 'GraphQL Request Started',
            operationName: requestContext.request.operationName,
            query: requestContext.request.query,
            variables: requestContext.request.variables,
        })

        return {
            async didEncounterErrors(errorContext) {
                for (const error of errorContext.errors) {
                    requestContext.contextValue.logger.error({
                        error,
                        message: 'GraphQL Error',
                    })
                }
            },
            async willSendResponse(responseContext) {
                requestContext.contextValue.logger.info({
                    message: 'GraphQL Sending Response',
                    response: responseContext.response,
                })
            },
        }
    },
}
