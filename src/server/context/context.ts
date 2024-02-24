import { randomUUID } from 'node:crypto'

import type { z } from 'zod'

import { InputValidationError } from '../../shared/errors'
import type { LoggerType } from '../../shared/utils'
import { logger } from '../../shared/utils'

import type { ContextInputType } from './context.types'

export class Context {
    public readonly logger: LoggerType

    public request

    public response

    constructor(input: ContextInputType) {
        this.request = input.request
        this.response = input.response

        this.logger = logger.child({ requestId: randomUUID() })
    }

    public validateInput<TSchema extends z.ZodTypeAny>(schema: TSchema, input: Record<string, unknown>) {
        const result = schema.safeParse(input)

        if (!result.success) {
            throw new InputValidationError('Invalid input', {
                extensions: {
                    errors: result.error.format(),
                },
            })
        }

        return result.data as z.infer<TSchema>
    }
}
