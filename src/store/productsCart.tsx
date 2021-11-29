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
    new Array()


const ProductsCart = (cartItems: Array<cardItemsID> = cartItemsIdInitState) => {
    //const {pizzaById} = storeProducts
    const store = {
        isFetching: true,
        //cartItemsId: cartItems,
        cartItemsProducts: cartItemsProductsInitState,
        totalPrice: 0,
        addInCart (pizza: Pizza) {
            let indexInCart = store.cartItemsProducts.findIndex(item => item.pizza.id === pizza.id);
            if (indexInCart === -1){
                store.cartItemsProducts.push({pizza:pizza, amount:1})
                //store.cartItemsId.push({id:pizza.id,amount:1})
            }
            else {
                store.cartItemsProducts[indexInCart] = {
                    pizza:pizza,
                    amount: store.cartItemsProducts[indexInCart].amount + 1
                }
                /*store.cartItemsId[indexInCart] = {
                    id: pizza.id,
                    amount: store.cartItemsId[indexInCart].amount + 1
                }*/
            }
            store.totalPrice += pizza.price
            localStorage.setItem("cart", JSON.stringify(store.cartItemsProducts))
        },
        deleteInCart (pizza: Pizza) {
            console.log(store.cartItemsProducts)
            let indexInCart = store.cartItemsProducts.findIndex(item => item.pizza.id === pizza.id);
            if (indexInCart !== -1) {
                if (store.cartItemsProducts[indexInCart].amount == 1) {
                    store.cartItemsProducts.splice(indexInCart, 1)
                }
                else {
                    store.cartItemsProducts[indexInCart].amount-=1
                }
                store.totalPrice -= pizza.price
            }
        },
        clearCart() {
            store.cartItemsProducts = []
            store.totalPrice = 0
            localStorage.setItem("cart", "")
        }
    }

    runInAction(() => {
        const itemsId = localStorage.getItem("cart")
        if (itemsId) {
            store.cartItemsProducts = JSON.parse(itemsId)
            /*store.cartItemsProducts.forEach(el => {
                const pizza = pizzaById(el.pizza.id)
                console.log(pizza)
                if (pizza) {
                    store.cartItemsProducts.push({pizza: pizza, amount: el.amount})
                }
            })*/
            store.cartItemsProducts.forEach((el) => {
                store.totalPrice += el.pizza.price * el.amount
            })
        }
        //console.log(store.cartItemsProducts)
        store.isFetching = false
    })
    return makeAutoObservable(store)
}

export const storeCart = ProductsCart()