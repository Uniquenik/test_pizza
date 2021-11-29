import {makeAutoObservable} from "mobx";
import {Pizza, PizzaCartState} from "../components/data-types";

const PizzaCartInitState: PizzaCartState = {
    cart: [],
    totalPrice: 0,
}

const PizzaOrder = (cartInfo:PizzaCartState = PizzaCartInitState) => {
    return makeAutoObservable({
        cartInfo,
        AddPizzaToCart(pizza:Pizza) {
            const pizzaExistInCart = cartInfo.cart.find(pizzaItem => pizzaItem.pizza.id === pizza.id);
            console.log(pizzaExistInCart)
            if (!pizzaExistInCart) {
                return {
                    cart: [
                        ...cartInfo.cart, {pizza: pizza, amount: 1}
                    ],
                    totalPrice: cartInfo.totalPrice + pizza.price,
                }
            } else {
                return {
                    cart: [
                        ...cartInfo.cart, {pizza: pizza, amount: pizzaExistInCart.amount + 1}
                    ],
                    totalPrice: cartInfo.totalPrice + pizza.price,
                };
            }
        }

    })
}