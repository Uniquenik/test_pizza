import React, {useEffect, useState} from "react";
import {Container, LoadingOverlay, SimpleGrid} from "@mantine/core";
import axios from "axios";
import {PizzaCard} from "./pizza-card";
import {usePizzaOrders} from "../../hooks/usePizzaOrder";

export const Shop = () => {
    // const [ fetching, setFetching ] = useState<boolean>(false);
    // const [ pizza, setPizza ] = useState<Pizza[]>([]);

    const {fetching,
        pizza} = usePizzaOrders()

    const API_URL = "https://private-anon-ed37853152-pizzaapp.apiary-mock.com/";

    const baseConfig = {
        baseURL: API_URL,
    };

    const $api = axios.create(baseConfig);

    // useEffect(() => {
    //
    //     async function fetchPizzaImages () {
    //         const response = await $api.get("https://foodish-api.herokuapp.com/api/");
    //         return response.data.image;
    //     }
    //
    //     async function fetchPizza () {
    //         const response = await $api.get("restaurants/1/menu?category=Pizza");
    //
    //         // @ts-ignore
    //         let pizzas = response.data.map(pizza => {
    //             return {
    //                 id: pizza.id,
    //                 name: pizza.name,
    //                 price: pizza.price,
    //             }
    //         });
    //
    //         for (let i = 0; i < pizzas.length; i++) {
    //             pizzas[i] = {
    //                 ...pizzas[i],
    //                 imageLink: await fetchPizzaImages()
    //             }
    //         }
    //
    //         return pizzas;
    //     }
    //
    //     setFetching(true);
    //     fetchPizza()
    //         .then(pizza => setPizza(pizza))
    //         .finally(() => setFetching(false));
    //
    // }, []);


    return (
        <Container>
            <LoadingOverlay visible={ fetching }/>
            <SimpleGrid cols={ 3 } spacing="xl">
                {
                    pizza.map(pizza => <PizzaCard name={ pizza.name } id={ pizza.id } price={ pizza.price }
                                                  imageLink={ pizza.imageLink } key={ pizza.id }/>)
                }
            </SimpleGrid>
        </Container>
    );
};