export interface IngredientQuantity {
    ingrediente: Ingredient;
    quantidade: number;
}

export interface Ingredient {
    id: number;
    nome: string;
    calorias: number;
}

export interface PlateCategory {
    id: number;
    nome: string;
}

export interface Plate {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
    calorias: number;
    categorias: PlateCategory[];
    ingredientes: IngredientQuantity[];
}
