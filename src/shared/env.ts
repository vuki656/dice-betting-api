import {
    cleanEnv,
    port,
    str,
} from 'envalid'
import type { Level } from 'pino'

export const env = cleanEnv(process.env, {
    APP_LOG_LEVEL: str<Level>({ choices: ['info', 'debug', 'warn', 'error'] }),
    APP_PORT: port(),
})
