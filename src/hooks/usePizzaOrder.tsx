import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {Pizza} from "../components/data-types";

interface PizzaCartState {
    cart: Array<PizzaItem>,
    totalPrice: number
}

interface PizzaItem {
    pizza: Pizza,
    amount: number
}

export const PizzaCartActionTypes = {
    ADD_PIZZA_TO_CART: 'ADD_PIZZA_TO_CART',
    REMOVE_PIZZA_FROM_CART: 'REMOVE_PIZZA_FROM_CART',
    CLEAR_PIZZA_CART: 'CLEAR_PIZZA_CART',
}


// Pizza Service
export const usePizzaOrders = () => {

    // type PizzaAction =
    //     | { type: 'ADD_PIZZA_TO_CART'; payload: Pizza }
    //     | { type: 'REMOVE_PIZZA_FROM_CART'; payload: number }
    //     | { type: 'CLEAR_ALL_PIZZAS_FROM_CART' };

    interface Action {
        type:string,
        payload: any
    }

    /*  function createAction<P>(type: string, payload: P): Action<P> {
        return { type, payload };
      }*/

    const AddPizzaToCart = (pizza: Pizza) => {
        return {
            type: PizzaCartActionTypes.ADD_PIZZA_TO_CART,
            payload: pizza
        }
    }

    const RemovePizzaFromCart = (id: number) => {
        return {
            type: PizzaCartActionTypes.REMOVE_PIZZA_FROM_CART,
            payload: id
        }
    }

    const ClearPizzaCart = () => {
        return {
            type: PizzaCartActionTypes.CLEAR_PIZZA_CART,
            payload: null
        }
    }

    const PizzaCartInitState: PizzaCartState = {
        cart: [],
        totalPrice: 0
    }

    const cartReducer = (state: PizzaCartState, action: Action):PizzaCartState => {
        switch (action.type) {
            case PizzaCartActionTypes.ADD_PIZZA_TO_CART:
                const pizzaExistInCart = state.cart
                    .some(pizzaItem => pizzaItem.pizza.id === action.payload.id);
                if (pizzaExistInCart) {
                    return {
                        cart: [
                            ...state.cart, { pizza: action.payload, amount:1}
                        ],
                        totalPrice: state.totalPrice + action.payload.price
                    }
                }
                else {
                    return {
                        cart: {
                            ...state.cart
                        },
                        totalPrice: state.totalPrice + action.payload.price
                    };
                }

            case PizzaCartActionTypes.REMOVE_PIZZA_FROM_CART:
                return state;
            case PizzaCartActionTypes.CLEAR_PIZZA_CART:
                return state;
            default:
                return state;
        }
    }


    const [ cartState, cartDispatch ] = useReducer(cartReducer, PizzaCartInitState);

    const [ fetching, setFetching ] = useState<boolean>(false);
    const [ pizza, setPizza ] = useState<Pizza[]>([]);


    const API_URL = "https://private-anon-ed37853152-pizzaapp.apiary-mock.com/";

    const baseConfig = {
        baseURL: API_URL,
    };

    const $api = axios.create(baseConfig);

    useEffect(() => {

        async function fetchPizzaImages () {
            const response = await $api.get("https://foodish-api.herokuapp.com/api/");
            return response.data.image;
        }

        async function fetchPizza () {
            const response = await $api.get("restaurants/1/menu?category=Pizza");

            // @ts-ignore
            let pizzas = response.data.map(pizza => {
                return {
                    id: pizza.id,
                    name: pizza.name,
                    price: pizza.price,
                }
            });

            for (let i = 0; i < pizzas.length; i++) {
                pizzas[i] = {
                    ...pizzas[i],
                    imageLink: await fetchPizzaImages()
                }
            }

            return pizzas;
        }

        setFetching(true);
        fetchPizza()
            .then(pizza => setPizza(pizza))
            .finally(() => setFetching(false));

    }, []);

    const addPizzaToCart = (pizza: Pizza) => {
        cartDispatch(AddPizzaToCart(pizza));
    }

    const removePizzaFromCart = (id: number) => {
        cartDispatch(RemovePizzaFromCart(id));
    }

    const clearCart = () => {
        cartDispatch(ClearPizzaCart());
    }

    return {
        fetching,
        pizza,
        addPizzaToCart,
        removePizzaFromCart,
        clearCart,
        cart: cartState
    }

}