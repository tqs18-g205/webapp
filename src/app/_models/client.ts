import { Delivery, Plate, Restaurant, Address } from './';

export class Reservation {
    id: number;
    restaurant: Restaurant;
    data: string;
    time: string;
}

export class ReservationModel {
    cliente: number;
    restaurante: number;
    data: string;
    hora: string;
}

export interface PlateQuantity {
    id: number;
    prato: Plate;
    quantidade: number;
}

export class Order {
    id: number;
    pratos: PlateQuantity;
    tipoEntrega: Delivery;
}

export class Client {
    id: number;
    nome: string;
    passwd: string;
    nif: string;
    email: string;
    morada: Address;
}
