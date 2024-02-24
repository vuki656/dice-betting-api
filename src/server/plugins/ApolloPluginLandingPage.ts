import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/dist/esm/plugin/landingPage/default'

import { env } from '../../shared/utils'

export const ApolloPluginLandingPage = env.isProduction
    ? ApolloServerPluginLandingPageProductionDefault()
    : ApolloServerPluginLandingPageLocalDefault()
