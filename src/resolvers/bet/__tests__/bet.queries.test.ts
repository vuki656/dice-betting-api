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
