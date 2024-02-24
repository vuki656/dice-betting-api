import { join } from 'path'

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const typeDefinitionFiles = loadFilesSync(
    join(
        __dirname,
        '../../**/*.graphql'
    ),
    { recursive: true }
)

if (typeDefinitionFiles.length === 0) {
    throw new Error('No type definitions detected')
}

export const typeDefs = mergeTypeDefs(typeDefinitionFiles)
