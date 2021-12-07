import {makeAutoObservable, runInAction} from "mobx";
import {$apirecipes} from "./api";

export interface Recipe {
    name: string,
    imageLink: string,
    id: number
}

async function getRecipes (param: string)  {
    let recipesList: Recipe[] = []
    const response = await $apirecipes.get(param);
    recipesList = response.data.meals.map((
        item: {
            strMeal: string;
            strMealThumb: string;
            idMeal: string; }) => {
        return{
            name: item.strMeal,
            imageLink: item.strMealThumb,
            id: Number(item.idMeal)
        }
    })
    return recipesList
}

const RecipesInitState:Recipe[] = []

const inPage = 6

const RecipesList = () => {
    const store = {
        isFetching: true,
        recipes: RecipesInitState,
        currRecipes: RecipesInitState,
        total: 0,
        currentPage: 1,
        setCurrentPage (page: number) {
            store.currRecipes = store.recipes.slice(inPage * (page - 1), inPage * page)
            store.currentPage = page
        },
        filterValue: 'american',
        filterOptions: [
                { label: 'American', value: 'american' },
                { label: 'British', value: 'british' },
                { label: 'Soviet Russian', value: 'russian' },
                { label: 'China', value: 'chinese' },
        ],
        changeFilter (value: string) {
            store.currentPage = 1
            store.isFetching = true
            getRecipes(`filter.php?a=${value}`)
                .then((resp) => {
                        store.recipes = resp
                        let totalPage =  Math.floor(store.recipes.length/inPage)
                        store.total = totalPage
                        store.currRecipes = resp.slice(0,inPage)
                        store.isFetching = false
                        store.filterValue = value
                    }
                )
                .catch((err) => console.log(err))
            console.log(store.recipes)
        }
    }

    runInAction(() => {
        store.changeFilter(store.filterValue)
    })

    return makeAutoObservable(store)
}


export const storeRecipes = RecipesList()