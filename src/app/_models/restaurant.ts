import { Plate } from './';

export interface Cooking {
    id: number;
    nome: string;
}

export interface Delivery {
    id: number;
    descricao: string;
}

export interface Address {
    id: number;
    rua: string;
    localidade: string;
    codigoPostal: string;
    distrito: string;
}

export interface Restaurant {
    id: number;
    nome: string;
    imagem: string;
    pratos: Plate[];
    tipoCozinha: Cooking;
    tiposEntrega: Delivery[];
    morada: Address;
}
