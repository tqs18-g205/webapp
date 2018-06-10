export * from './plate';
export * from './restaurant';
export * from './client';

export interface Forbidden {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface Cart {
    plates: CartPlate[];
}

export interface CartPlate {
    id: number;
    quantity: number;
}
