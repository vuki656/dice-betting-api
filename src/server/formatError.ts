import type { GraphQLFormattedError } from 'graphql'

import { ErrorCodeEnum } from '../shared/__generated__/enums'
import { UnexpectedError } from '../shared/errors'
import {
    env,
    logger,
} from '../shared/utils'

export function formatError(formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError {
    if (typeof formattedError.extensions?.code !== 'string') {
        logger.error(error, 'Error missing an error code')

        return new UnexpectedError('Error missing an error code')
    }

    if (Object.values<string>(ErrorCodeEnum).includes(formattedError.extensions.code)) {
        return formattedError
    }

    if (env.isTest) {
        console.error(
            JSON.stringify(
                formattedError,
                undefined,
                4
            ),
        )
    }

    return new UnexpectedError('Error code missing or not expected', {
        extensions: {
            error,
        },
    })
}
