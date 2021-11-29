import {makeAutoObservable, runInAction} from "mobx";
import {Pizza} from "../components/data-types";
import {storeProducts} from "./productsList";

interface cardItemsID {
    id: number,
    amount: number
}

const cartItemsIdInitState: cardItemsID[] = new Array({
    id: 1,
    amount: 0
})

interface productItems {
    pizza: Pizza,
    amount: number
}

const cartItemsProductsInitState:productItems[] =
    new Array({
        pizza: {id:0, name: "null", price: 0, imageLink: ""},
        amount: 0
    })


const ProductsCart = (cartItems: Array<cardItemsID> = cartItemsIdInitState) => {
    const {pizzaById} = storeProducts
    const store = {
        isFetching: true,
        cartItemsId: cartItems,
        cartItemsProducts: cartItemsProductsInitState,
        totalPrice: 0,
        addInCart (pizza: Pizza) {
            let indexInCart = store.cartItemsId.findIndex(item => item.id === pizza.id);
            if (indexInCart === -1){
                store.cartItemsProducts.push({pizza:pizza, amount:1})
                store.cartItemsId.push({id:pizza.id,amount:1})
            }
            else {
                store.cartItemsProducts[indexInCart] = {
                    pizza:pizza,
                    amount: store.cartItemsId[indexInCart].amount + 1
                }
                store.cartItemsId[indexInCart] = {
                    id: pizza.id,
                    amount: store.cartItemsId[indexInCart].amount + 1
                }
            }
            localStorage.setItem("cart", JSON.stringify(store.cartItemsId))
        },
        deleteInCart (pizza: Pizza) {

        },
        clearCart() {

        }
    }

    runInAction(() => {
        const itemsId = localStorage.getItem("cart")
        console.log(store.cartItemsId)
        if (itemsId) {
            store.cartItemsId = JSON.parse(itemsId)
            console.log(store.cartItemsId)
            store.cartItemsId.forEach(el => {
                const pizza = pizzaById(el.id)
                console.log(pizza)
                if (pizza) {
                    store.cartItemsProducts.push({pizza: pizza, amount: el.amount})
                }
            })
            store.cartItemsProducts.forEach((el) => {
                store.totalPrice+= el.pizza.price * el.amount
            })
        }
        console.log(store.cartItemsProducts)
        store.isFetching = false
    })
    return makeAutoObservable(store)
}

export const storeCart = ProductsCart()