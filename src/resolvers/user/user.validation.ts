import { zc } from '../../shared/utils'

export const getUserValidation = zc.object({
    id: zc.intId,
})
