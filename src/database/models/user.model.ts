import type {
    Attributes,
    CreationOptional,
    FindOptions,
    Identifier,
    InferAttributes,
    InferCreationAttributes,
    ModelStatic,
    NonAttribute,
} from 'sequelize'
import {
    DataTypes,
    Model,
} from 'sequelize'

import { sequelize } from '../../shared/clients'

import type { Bet } from './bet.model'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    public static async findByPkOrThrow(
        this: ModelStatic<User>,
        identifier: Identifier,
        options?: Omit<FindOptions<Attributes<User>>, 'where'>
    ): Promise<NonAttribute<User>> {
        const user = await this.findByPk(identifier, options)

        if (!user) {
            throw new Error(`User by id ${identifier} not found`)
        }

        return user
    }

    public declare balance: number

    public declare bets: NonAttribute<Bet[]>

    public declare id: CreationOptional<number>

    public declare name: string
}

User.init(
    {
        balance: DataTypes.FLOAT,
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.TEXT,
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
)

