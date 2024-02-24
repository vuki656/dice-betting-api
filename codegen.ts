import type { CodegenConfig } from '@graphql-codegen/cli'

export const FORMAT_PRETTIER = 'prettier --write --ignore-path=""'
export const SCHEMA_FILES_LOCATION = './src/**/*.graphql'

const config: CodegenConfig = {
    generates: {
        './src/shared/__generated__/enums.ts': {
            config: {
                namingConvention: {
                    enumValues: 'change-case-all#upperCase',
                },
                onlyEnums: true,
            },
            plugins: [
                'typescript',
            ],
        },
        './src/resolvers/': {
            config: {
                contextType: '../server/context/context.types#CodegenContextType',
                useIndexSignature: true,
            },
            plugins: [
                'typescript',
                'typescript-resolvers',
            ],
            preset: 'graphql-modules',
            presetConfig: {
                baseTypesPath: 'graphql-types.generated.ts',
                filename: 'resolver-types.generated.ts',
                useGraphQLModules: false,
            },
        },
    },
    hooks: {
        afterOneFileWrite: [FORMAT_PRETTIER],
    },
    overwrite: true,
    schema: SCHEMA_FILES_LOCATION
}

export default config
