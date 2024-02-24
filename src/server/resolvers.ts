import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'

const resolverFiles = loadFilesSync(
    join(
        __dirname,
        '../resolvers/**/*.{mutations,queries}.{js,ts}'
    ),
    { recursive: true }
)

if (resolverFiles.length === 0) {
    throw new Error('No resolvers detected')
}

export const resolvers = mergeResolvers(resolverFiles)
