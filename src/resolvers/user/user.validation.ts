import { z } from 'zod';

export const getUserValidation = z.object({
    id: z.number().int().positive()
})
