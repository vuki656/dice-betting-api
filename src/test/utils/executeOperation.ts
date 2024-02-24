import assert from 'node:assert'

import type { HTTPGraphQLHead } from '@apollo/server'
import type {
    ExecuteOperationOptions,
    GraphQLResponseBody,
    VariableValues,
} from '@apollo/server/dist/esm/externalTypes/graphql'

import { server } from '../../server'
import type { ContextType } from '../../server/context'
import { initializeContext } from '../../server/context'

export type TestContextType = Partial<ExecuteOperationOptions<ContextType>['contextValue']>

export type ResponseDataType = Record<string, unknown>

export type RequestType<TData extends ResponseDataType, TVariables extends VariableValues> =
    Parameters<typeof server.executeOperation<TData, TVariables>>[0] &
    { context?: TestContextType }

export type ExecuteOperationValueType<TData extends ResponseDataType> = {
    body?: Extract<GraphQLResponseBody<TData>, { kind: 'single' }>
    http: HTTPGraphQLHead
}

export const executeOperation = async <
    TData extends ResponseDataType,
    TVariables extends VariableValues
>(request: RequestType<TData, TVariables>): Promise<ExecuteOperationValueType<TData>> => {
    const response = await server.executeOperation<TData, TVariables>(request, {
        contextValue: await initializeContext({} as any),
    })

    assert(response.body.kind === 'single')

    return {
        body: {
            kind: response.body.kind,
            singleResult: response.body.singleResult,
        },
        http: response.http,
    }
}
