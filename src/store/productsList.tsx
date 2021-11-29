import {$api} from "./api";
import {Pizza} from "../components/data-types";
import {makeAutoObservable, runInAction} from "mobx";


export async function getPizzas():Promise<Pizza[]> {
    let pizzas: Pizza[] = []

    async function fetchPizzaImages() {
        const response = await $api.get("https://foodish-api.herokuapp.com/api/");
        return response.data.image;
    }

    async function fetchPizza() {
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
        console.log(pizzas)
        return pizzas;
    }
    return await fetchPizza()
}

const ProductsList = (pizzaList:Pizza[] = []) => {

    const store = {
        isFetching: true,
        pizzaList: pizzaList,
        pizzaById (id:number) {
            let pizzaExistInList = store.pizzaList.findIndex(pizzaItem => pizzaItem.id === id);
            if (pizzaExistInList !== -1) {
                return pizzaList[pizzaExistInList]
            }
            else return null
        }
    }

    runInAction(() => {
        getPizzas()
            .then((resp) => {
                store.pizzaList = resp
                console.log(store.pizzaList)
                store.isFetching = false
            })
            .catch((err) => console.log(err))
    })

    return makeAutoObservable(store)
}


export const storeProducts = ProductsList()