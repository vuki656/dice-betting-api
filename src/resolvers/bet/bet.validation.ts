import { z } from 'zod'

export const createBetValidation = z.object({
    betAmount: z.number().positive(),
    chance: z.number().min(0).max(1),
    userId: z.number().int().positive(),
})

export const getBetValidation = z.object({
    id: z.number().int().positive(),
})
