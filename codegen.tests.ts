import type { CodegenConfig } from '@graphql-codegen/cli'

import {
    SCHEMA_FILES_LOCATION,
    FORMAT_PRETTIER
} from './codegen'

const config: CodegenConfig = {
    documents: [
        './src/**/__tests__/**/*.queries.test.ts',
        './src/test/graphql/*.ts',
    ],
    generates: {
        './src/resolvers/graphql-test-types.generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
            ],
        },
    },
    hooks: {
        afterOneFileWrite: [FORMAT_PRETTIER],
    },
    overwrite: true,
    schema: SCHEMA_FILES_LOCATION,
    verbose: true,
}

export default config
