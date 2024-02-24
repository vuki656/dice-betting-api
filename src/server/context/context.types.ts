import {
    type IncomingMessage,
    type ServerResponse,
} from 'http'

import type { Context } from './context'

export type ContextType = InstanceType<typeof Context>
/*
 * Reexporting with a different name since in generated types
 * their default context name is `ContextType` and our `ContextType`
 * clashes regarding naming
 */
export type CodegenContextType = ContextType

export type ContextInputType = {
    request: IncomingMessage
    response: ServerResponse
}
