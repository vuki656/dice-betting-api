import type { GraphQLErrorOptions } from 'graphql'
import { GraphQLError } from 'graphql'

import { ErrorCodeEnum } from '../__generated__/enums'

export class BusinessConstraintError extends GraphQLError {
    constructor(
        message: string,
        options?: GraphQLErrorOptions
    ) {
        super(message, {
            ...options,
            extensions: {
                ...options?.extensions,
                code: ErrorCodeEnum.BUSINESS_CONSTRAINT,
            },
        })
    }
}
