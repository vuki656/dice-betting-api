import { User } from '../../../database/models'
import { ErrorCodeEnum } from '../../../shared/__generated__/enums'
import { UserFactory } from '../../../test/factories'
import {
    executeOperation,
    faker,
} from '../../../test/utils'
import type {
    BetPayloadFragment,
    CreateBetMutation,
    CreateBetMutationVariables,
} from '../../graphql-test-types.generated'
import { BET_MULTIPLIER } from '../bet.mutations'

import { CREATE_BET } from './bet.queries.test'

describe('when `createBet` mutation is called', () => {
    it('should create bet', async () => {
        const user = await UserFactory.create({
            balance: 500,
        })

        const variables: CreateBetMutationVariables = {
            betAmount: 200,
            chance: faker.betChance(),
            userId: user.id,
        }

        const response = await executeOperation<
            CreateBetMutation,
            CreateBetMutationVariables
        >({
            query: CREATE_BET,
            variables,
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.createBet).toMatchObject<BetPayloadFragment>({
            betAmount: variables.betAmount,
            chance: variables.chance,
            id: expect.any(Number),
            payout: expect.any(Number),
            userId: user.id,
            win: expect.any(Boolean),
        })
    })

    it('should correctly update user and bet if bet is won', async () => {
        const user = await UserFactory.create({ balance: 3000 })

        const variables: CreateBetMutationVariables = {
            betAmount: 200,
            chance: 1,
            userId: user.id,
        }

        const response = await executeOperation<
            CreateBetMutation,
            CreateBetMutationVariables
        >({
            query: CREATE_BET,
            variables,
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.createBet).toMatchObject<BetPayloadFragment>({
            betAmount: variables.betAmount,
            chance: variables.chance,
            id: expect.any(Number),
            payout: expect.any(Number),
            userId: user.id,
            win: true,
        })

        const { balance } = await User.findByPkOrThrow(user.id)

        const payout = variables.betAmount * BET_MULTIPLIER
        const wonAmount = payout - (response.body?.singleResult.data?.createBet.betAmount ?? 0)

        expect(balance).toBeCloseTo(user.balance + wonAmount)
    })

    it('should correctly update user and bet if bet is lost', async () => {
        const user = await UserFactory.create({
            balance: 3000,
        })

        const variables: CreateBetMutationVariables = {
            betAmount: 200,
            chance: 0,
            userId: user.id,
        }

        const response = await executeOperation<
            CreateBetMutation,
            CreateBetMutationVariables
        >({
            query: CREATE_BET,
            variables,
        })

        expect(response.body?.singleResult.errors).toBeUndefined()
        expect(response.body?.singleResult.data?.createBet).toMatchObject<BetPayloadFragment>({
            betAmount: variables.betAmount,
            chance: variables.chance,
            id: expect.any(Number),
            payout: 0,
            userId: user.id,
            win: false,
        })

        const { balance } = await User.findByPkOrThrow(user.id)

        expect(balance).toBeCloseTo(user.balance - variables.betAmount)
    })

    describe('should throw', () => {
        it(`${ErrorCodeEnum.INPUT_VALIDATION} error if input invalid`, async () => {
            const response = await executeOperation<
                CreateBetMutation,
                CreateBetMutationVariables
            >({
                query: CREATE_BET,
                variables: {
                    betAmount: -1,
                    chance: faker.betChance(),
                    userId: 1,
                },
            })

            expect(response.body?.singleResult.data).toBeNull()
            expect(response.body?.singleResult.errors?.[0]?.extensions?.code).toBe(ErrorCodeEnum.INPUT_VALIDATION)
        })

        it(`${ErrorCodeEnum.BUSINESS_CONSTRAINT} error user has insufficient balance`, async () => {
            const user = await UserFactory.create({
                balance: 0,
            })

            const response = await executeOperation<
                CreateBetMutation,
                CreateBetMutationVariables
            >({
                query: CREATE_BET,
                variables: {
                    betAmount: 200,
                    chance: faker.betChance(),
                    userId: user.id,
                },
            })

            expect(response.body?.singleResult.data).toBeNull()
            expect(response.body?.singleResult.errors?.[0]?.extensions?.code).toBe(ErrorCodeEnum.BUSINESS_CONSTRAINT)
        })
    })
})
