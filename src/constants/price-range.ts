import { PriceRange } from "../interfaces/PriceRange";

const DOLLAR_SYMBOL = "$";
export const ALL = "ALL";

export const PRICE_RANGE: PriceRange = {
    "Very Cheap": {
        min: 0,
        max: 10,
        symbol: DOLLAR_SYMBOL.repeat(1),
    },
    "Cheap": {
        min: 10,
        max: 20,
        symbol: DOLLAR_SYMBOL.repeat(2),
    },
    "Medium": {
        min: 20,
        max: 40,
        symbol: DOLLAR_SYMBOL.repeat(3),
    },
    "Expensive": {
        min: 40,
        max: 60,
        symbol: DOLLAR_SYMBOL.repeat(4),
    },
    "Very Expensive": {
        min: 60,
        max: Infinity,
        symbol: DOLLAR_SYMBOL.repeat(5),
    }
};