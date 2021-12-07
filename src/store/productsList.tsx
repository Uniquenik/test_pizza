import {$api} from "./api";
import {Pizza} from "../components/data-types";
import {makeAutoObservable, runInAction} from "mobx";

export async function getPizzas(address: string):Promise<Pizza[]> {
    let pizzas: Pizza[] = []

    async function fetchPizzaImages() {
        const response = await $api.get("https://foodish-api.herokuapp.com/api/");
        return response.data.image;
    }

    async function fetchPizza(address: string) {
        const response = await $api.get("restaurants/1/menu?category=Pizza");
        //@ts-ignore
        pizzas = response.data.map(pizza => {
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
    return await fetchPizza(address)
}


const ProductsList = (pizzaList:Pizza[] = []) => {
    const store = {
        isFetching: true,
        pizzaList: pizzaList,
    }

    runInAction(() => {
        getPizzas("")
            .then((resp) => {
                store.pizzaList = resp
                store.isFetching = false
            })
            .catch((err) => console.log(err))
    })

    return makeAutoObservable(store)
}


export const storeProducts = ProductsList()