import type { CodegenConfig } from '@graphql-codegen/cli'

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
                defaultMapper: 'DeepPartial<{T}>',
                useIndexSignature: true,
            },
            plugins: [
                'typescript',
                'typescript-resolvers',
                {
                    add: {
                        content: 'type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;',
                    },
                },
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
        afterOneFileWrite: ['prettier --write --ignore-path=""'],
    },
    overwrite: true,
    schema: './src/**/*.graphql'
}

export default config
