import {PizzaCartState} from "../hooks/usePizzaOrder";
import {makeAutoObservable} from "mobx";
import {Pizza} from "../components/data-types";
import {useEffect} from "react";

const PizzaCartInitState: PizzaCartState = {
    cart: [],
    totalPrice: 0,
}

const PizzaOrder = (cartInfo:PizzaCartState = PizzaCartInitState) => {
    useEffect(() => {


    },[])
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