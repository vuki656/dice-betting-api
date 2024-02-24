import { zc } from '../../shared/utils'

export const createBetValidation = zc.object({
    betAmount: zc
        .number()
        .positive(),
    chance: zc
        .number()
        .min(0)
        .max(1),
    userId: zc.intId,
})

export const getBetValidation = zc.object({
    id: zc.intId,
})

export const getBestBetPerUserValidation = zc.object({
    limit: zc
        .number()
        .int()
        .positive()
        .optional(),
})
