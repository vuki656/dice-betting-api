import type {
    Attributes,
    CreationOptional,
    FindOptions,
    ForeignKey,
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

import { User } from './user.model'

export class Bet extends Model<InferAttributes<Bet>, InferCreationAttributes<Bet>> {
    public static async findByPkOrThrow(
        this: ModelStatic<Bet>,
        identifier: Identifier,
        options?: Omit<FindOptions<Attributes<Bet>>, 'where'>
    ): Promise<NonAttribute<Bet>> {
        const bet = await this.findByPk(identifier, options)

        if (!bet) {
            throw new Error(`Bet by id ${identifier} not found`)
        }

        return bet
    }

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
        win: DataTypes.BOOLEAN,
    },
    {
        sequelize,
        tableName: 'bets',
        timestamps: false,
    }
)

User.hasMany(Bet, {
    as: 'bets',
    foreignKey: 'userIdFk',
    sourceKey: 'id',
})

Bet.belongsTo(User, {
    as: 'user',
    foreignKey: 'userIdFk',
})
