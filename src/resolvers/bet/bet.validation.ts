import { z } from 'zod'

// userId: Int!, betAmount: Float!, chance: Float!

export const createBetValidation = z.object({
    betAmount: z.number().positive(),
    chance: z.number().positive(),
    userId: z.number().int(),
})
