import { gql } from 'graphql-tag'

import { BET_FRAGMENT } from '../../../test/graphql'

export const GET_BET = gql`
    query GetBet($id: Int!) {
         getBet(id: $id) {
            ...BetPayload
         }
     }
    ${BET_FRAGMENT}
`

export const GET_BET_LIST = gql`
    query GetBetList {
         getBetList {
            ...BetPayload
         }
     }
    ${BET_FRAGMENT}
`

export const CREATE_BET = gql`
    mutation CreateBet($userId: Int!, $betAmount: Float!, $chance: Float!) {
         createBet(userId: $userId, betAmount: $betAmount, chance: $chance) {
            ...BetPayload
         }
     }
    ${BET_FRAGMENT}
`
