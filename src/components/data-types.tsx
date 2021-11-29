export interface Pizza {
    id: number,
    name: string,
    price: number,
    imageLink: string
}

export interface PizzaCartState {
    cart: Array<PizzaItem>,
    totalPrice: number,
}

export interface PizzaItem {
    pizza: Pizza,
    amount: number
}