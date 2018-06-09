import { Delivery, Plate, Restaurant, Address } from './';

export interface Reservation {
    id: number;
    restaurant: Restaurant;
    data: string;
    time: string;
}

export interface PlateQuantity {
    id: number;
    prato: Plate;
    quantidade: number;
}

export interface Order {
    id: number;
    pratos: PlateQuantity;
    tipoEntrega: Delivery;
}

export interface Client {
    id: number;
    nome: string;
    passwd: string;
    nif: string;
    email: string;
    morada: Address;
}
