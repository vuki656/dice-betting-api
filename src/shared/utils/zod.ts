import { z } from 'zod'

export * from 'zod'

export const zc = {
    ...z,
    intId: z.number().int()
        .positive(),
}
