import { gql } from 'graphql-tag'

export const USER_FRAGMENT = gql`
    fragment UserPayload on User {
        id
        name
        balance
    }
`

export const BET_FRAGMENT = gql`
    fragment BetPayload on Bet {
        id
        userId
        betAmount
        chance
        payout
        win
    }
`
