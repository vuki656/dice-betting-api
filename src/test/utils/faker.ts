import type { FakerOptions } from '@faker-js/faker'
import {
    en,
    Faker,
} from '@faker-js/faker'

class CustomFaker extends Faker {
    constructor(options: FakerOptions) {
        super(options)
    }

    public betAmount(): number {
        return this.number.float({ fractionDigits: 2, min: 1 })
    }

    public betChance(): number {
        return this.number.float({ fractionDigits: 1, max: 1, min: 0 })
    }

    public betPayout(): number {
        return this.number.float({ fractionDigits: 2, max: 3000, min: 1 })
    }

    public userBalance(): number {
        return this.number.float({ fractionDigits: 2, max: 1000, min: 0 })
    }
}

export const faker = new CustomFaker({ locale: [en] })
