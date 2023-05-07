export interface PriceRange {
    [key: string]: {
        min: number;
        max: number;
        symbol: string;
    }
}