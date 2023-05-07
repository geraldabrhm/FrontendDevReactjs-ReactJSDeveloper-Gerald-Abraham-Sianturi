import { PRICE_RANGE } from "../constants/price-range";

export const getPriceCategory = (price: number): string => {
    try {
        for (const [key, value] of Object.entries(PRICE_RANGE)) {
            if (price >= value.min && price <= value.max) {
                return key;
            }
        }
        throw new Error("Price not found");
    } catch (error) {
        console.error(error);
        return "Price not found";
    }
}

export const getPriceSymbol = (price: number) => {
    const key: string = getPriceCategory(price);
    return PRICE_RANGE[key].symbol;
}

export const getPriceKeys = () => {
    return Object.keys(PRICE_RANGE);
}
