import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'

import { Context } from './context'
import type { ContextType } from './context.types'

// eslint-disable-next-line @typescript-eslint/require-await -- Apollo context has to be async
export async function initializeContext({ req, res }: StandaloneServerContextFunctionArgument): Promise<ContextType> {
    return new Context({
        request: req,
        response: res,
    })
}

