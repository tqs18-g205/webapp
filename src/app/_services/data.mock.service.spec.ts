import { Plate, PlateCategory, Ingredient, IngredientQuantity,
    Restaurant, Delivery, Cooking, Address, Client, Reservation,
    Order, Forbidden, Cart} from './../_models';
import { Observable, of, throwError } from 'rxjs';
import { stringify } from 'querystring';

export class DataServiceMock {

    getPlates(): Observable<Plate[]> {
        return of(DUMMY_PLATES);
    }

    getPlate(plate_id: number): Observable<Plate> {
        return of(DUMMY_PLATES[plate_id]);
    }

    getPlateCategories(plate_id: number): Observable<PlateCategory[]> {
        return of(DUMMY_PLATE_CATEGORIES);
    }

    getRestaurants(): Observable<Restaurant[]> {
        return of(DUMMY_RESTAURANTS);
    }

    getRestaurant(id: number): Observable<Restaurant> {
        return of(DUMMY_RESTAURANTS[id]);
    }

    getRestaurantCategories(): Observable<Cooking[]> {
        return of(DUMMY_RESTAURANT_CATEGORIES);
    }

    getRestaurantDeliveries(): Observable<Delivery[]> {
        return of(DUMMY_DELIVERIES);
    }

    addClient(client: Client): Observable<Client> {
        if (client.nome === '') {
            return throwError('Forbidden');
        }
        const createdClient = Object.assign({}, client);
        createdClient.id = 999;
        return of(createdClient);
    }

    getClient(id: number): Observable<any> {
        if (this.loggedIn()) {
            return of(DUMMY_CLIENTS[0]);
        }
        return throwError('Forbidden');
    }

    getReservations(id: number): Observable<any> {
        if (this.loggedIn()) {
            return of(DUMMY_RESERVATIONS);
        }
        return throwError('Forbidden');
    }

    getOrders(id: number): Observable<any> {
        if (this.loggedIn()) {
            return of(DUMMY_ORDERS);
        }
        return throwError('Forbidden');
    }

    addOrder(): Observable<any> {
        if (this.loggedIn()) {
            return of(DUMMY_ORDERS[0]);
        }
        return throwError('Forbidden');
    }

    // Internal Login Management
    login(user: { username: string, passwd: string }): Observable<any> {
        if (user.username === 'username' && user.passwd === 'password') {
            localStorage.setItem('currentToken', 'Bearer XXX');
            localStorage.setItem('currentUser', '0');
            return of('');
        }
        return throwError('Forbidden');
    }

    loggedIn(): boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    logout(): void {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('currentUser');
    }

    getCurrentClient(): Observable<Client> {
        if (this.loggedIn()) {
            return this.getClient(+localStorage.getItem('currentUser'));
        }
        return null;
    }

    setCurrentCart(cart: Cart) {
        localStorage.setItem('currentCart', JSON.stringify(cart));
    }

    getCurrentCart(): Cart {
        if ( localStorage.getItem('currentCart') === null ) {
            this.setCurrentCart({plates: []});
        }
        return <Cart>JSON.parse(localStorage.getItem('currentCart'));
    }

}

export const DUMMY_CART = <Cart>{ plates: [
                                    { id: 0, quantity: 2 },
                                    { id: 0, quantity: 2 }] };

export const DUMMY_PLATES = [
    <Plate>{
        id: 0,
        nome: 'TOFU KATSU CURRY',
        preco: 5.99,
        imagem: 'https://eatfirst.imgix.net/b7451490-9964-43cd-90be-751349dd7b7f.jpeg',
        calorias: 764,
        categorias: [
            <PlateCategory>{
                id: 0,
                nome: 'Prato'
            },
            <PlateCategory>{
                id: 1,
                nome: 'Japonês'
            }]
    },
    <Plate>{
        id: 1,
        nome: 'ASIAN BBQ RIBS',
        preco: 7.99,
        imagem: 'https://eatfirst.imgix.net/ce916f40-7ff7-4f27-add0-73160194028c.jpeg',
        calorias: 647,
        categorias: [
            <PlateCategory>{
                id: 0,
                nome: 'Prato'
            },
            <PlateCategory>{
                id: 2,
                nome: 'Asiático'
            },
            <PlateCategory>{
                id: 3,
                nome: 'Carne'
            }]
    }
];

export const DUMMY_PLATE_CATEGORIES = [
    <PlateCategory>{
        id: 0,
        nome: 'Prato'
    },
    <PlateCategory>{
        id: 1,
        nome: 'Japonês'
    },
    <PlateCategory>{
        id: 2,
        nome: 'Asiático'
    },
    <PlateCategory>{
        id: 3,
        nome: 'Carne'
    },
    <PlateCategory>{
        id: 4,
        nome: 'Entrada'
    },
    <PlateCategory>{
        id: 5,
        nome: 'Sobremesa'
    }
];

export const DUMMY_DELIVERIES = [
    <Delivery>{
        id: 1,
        descricao: 'Take away'
    },
    <Delivery> {
        id: 2,
        descricao: 'Home Delivery'
    }
];

export const DUMMY_RESTAURANT_CATEGORIES = [
    <Cooking>{
        id: 1,
        nome: 'Portuguesa'
    },
    <Cooking>{
        id: 2,
        nome: 'Japonesa'
    },
    <Cooking>{
        id: 3,
        nome: 'Chinesa'
    }
];

export const DUMMY_RESTAURANTS = [
    <Restaurant>{
        id: 1,
        nome: 'O Moliceiro',
        tipoCozinha:
            <Cooking>{
                id: 1,
                nome: 'Portuguesa'
            },
        tiposEntrega: [
            <Delivery>{
                id: 1,
                descricao: 'Take away'
            }
        ],
        morada:
            <Address>{
                rua: 'Rua da Gloria',
                localidade: 'Gloria',
                codigoPostal: '3810-611',
                distrito: 'Aveiro'
            },
        imagem: 'sd',
        pratos: DUMMY_PLATES
    }
];

export const DUMMY_CLIENTS = [
    <Client>{
        id: 1,
        nome: 'string',
        passwd: 'string',
        nif: 'string',
        email: 'string',
        morada: <Address>{
            id: 1,
            rua: 'string',
            localidade: 'string',
            codigoPostal: 'string',
            distrito: 'string'
        }
    }
];

export const DUMMY_FORBIDDEN = {
    'status': 403,
    'error': 'Forbidden',
    'message': 'Access Denied'
};

export const DUMMY_RESERVATIONS = [];

export const DUMMY_ORDERS = [
        {
            id: 1,
            total: 15.5,
            pratos: [
                {
                    prato: {
                        id: 1,
                        nome: 'Arroz de pato',
                        preco: 6.5,
                        calorias: 1100,
                        imagem: 'https://www.pingodoce.pt/wp-content/uploads/2016/12/arroz-de-pato-617x370.jpg',
                        categorias: [
                            {
                                id: 1,
                                nome: 'Carne'
                            }
                        ],
                    },
                    quantity: 1
                },
                {
                    prato: {
                        id: 7,
                        nome: 'Bacalhau tradicional',
                        preco: 9,
                        calorias: 1946.4,
                        imagem: 'http://www.foodfromportugal.com/content/uploads/2015/05/bacalhau-tradicional-575x375.jpg',
                        categorias: [
                            {
                                id: 2,
                                nome: 'Peixe'
                            }
                        ],
                    },
                    quantity: 1
                }
            ],
            tipoEntrega: {
                id: 1,
                descricao: 'Home Delivery'
            },
            estados: [
                {
                    estadoEncomenda: {
                        id: 1,
                        descricao: 'Em processamento'
                    },
                    data: '2018-06-07',
                    hora: '10:45:07'
                }
            ],
        },
        {
            id: 2,
            total: 18,
            pratos: [
                {
                    prato: {
                        id: 2,
                        nome: 'Carapaus fritos com arroz de tomate',
                        preco: 7,
                        calorias: 2333.5,
                        imagem: 'http://www.foodfromportugal.com/content/uploads/' +
                        '2018/03/carapaus-fritos-com-arroz-de-tomatexx1-575x375.jpg',
                        categorias: [
                            {
                                id: 2,
                                nome: 'Peixe'
                            }
                        ],
                    },
                    quantity: 1
                },
                {
                    prato: {
                        id: 4,
                        nome: 'Polvo à jardineira',
                        preco: 11,
                        calorias: 4442,
                        imagem: 'http://www.foodfromportugal.com/content/uploads/2016/06/polvo-a-jardineiraxx-575x375.jpg',
                        categorias: [
                            {
                                id: 2,
                                nome: 'Peixe'
                            }
                        ],
                    },
                    quantity: 1
                }
            ],
            tipoEntrega: {
                id: 1,
                descricao: 'Home Delivery'
            },
            estados: [
                {
                    estadoEncomenda: {
                        id: 1,
                        descricao: 'Em processamento'
                    },
                    data: '2018-06-07',
                    hora: '10:45:08'
                }
            ],
        },
        {
            id: 3,
            total: 7,
            pratos: [
                {
                    prato: {
                        id: 3,
                        nome: 'Migas com entrecosto',
                        preco: 7,
                        calorias: 3191,
                        imagem: 'http://www.foodfromportugal.com/content/uploads/2016/12/migas-com-entrecosto-1-575x375.jpg',
                        categorias: [
                            {
                                id: 1,
                                nome: 'Carne'
                            }
                        ],
                    },
                    quantity: 1
                }
            ],
            tipoEntrega: {
                id: 1,
                descricao: 'Home Delivery'
            },
            estados: [
                {
                    estadoEncomenda: {
                        id: 1,
                        descricao: 'Em processamento'
                    },
                    data: '2018-06-07',
                    hora: '10:45:08'
                }
            ],
        }
    ];

