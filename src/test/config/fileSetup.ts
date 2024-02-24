import { sequelize } from '../../shared/clients'

beforeAll(async () => {
    await sequelize.authenticate()
})

beforeEach(async () => {
    await sequelize.truncate({
        cascade: true,
    })
})

afterAll(async () => {
    await sequelize.close()
})
