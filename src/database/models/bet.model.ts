import type {
    CreationOptional,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    NonAttribute,
} from 'sequelize'
import {
    DataTypes,
    Model,
} from 'sequelize'

import { sequelize } from '../../shared/clients'

import type { User } from './user.model'

export class Bet extends Model<InferAttributes<Bet>, InferCreationAttributes<Bet>> {
    public declare amount: number

    public declare chance: number

    public declare id: CreationOptional<number>

    public declare payout: number

    public declare user?: NonAttribute<User>

    public declare userIdFk: ForeignKey<User['id']>

    public declare win: boolean
}

Bet.init(
    {
        amount: DataTypes.FLOAT,
        chance: DataTypes.FLOAT,
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        payout: DataTypes.FLOAT,
        userIdFk: DataTypes.INTEGER,
        win: DataTypes.BOOLEAN,
    },
    {
        sequelize,
        tableName: 'bets',
        timestamps: false,
    }
)
