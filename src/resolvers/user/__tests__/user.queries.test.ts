import { gql } from 'graphql-tag'

import { USER_FRAGMENT } from '../../../test/graphql'

export const GET_USER = gql`
    query GetUser($id: Int!) {
         getUser(id: $id) {
            ...UserPayload
         }
     }
    ${USER_FRAGMENT}
`
