# Dice Betting GraphQL API

## Running the server

1. Make a copy of `.env.example` in `.env`
2. Run `yarn` to install deps
3. Run `database:setup` to create a postgres in docker
4. Run `database:migrate:up` to migrate the database
5. Run `generate:types:graphql:dev` to generate TS types based on GraphQL types
6. Run `yarn dev` to start the server in dev mode

## Running tests

(Do all steps for running the server except starting the server)

1. Run `generate:types:graphql:test` to generate TS types based on GraphQL test operations
2. Run `yarn test` to run tests

## Potential Improvements

-   Share `findByPkOrThrow` between models
