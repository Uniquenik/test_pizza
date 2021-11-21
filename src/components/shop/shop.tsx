import React, {useEffect, useState} from "react";
import {Container, Grid, LoadingOverlay, Col} from "@mantine/core";
import axios from "axios";
import {PizzaCard} from "./pizza-card";
import {usePizzaOrders} from "../../hooks/usePizzaOrder";

export const Shop = () => {
    // const [ fetching, setFetching ] = useState<boolean>(false);
    // const [ pizza, setPizza ] = useState<Pizza[]>([]);

    const {fetching,
        pizza, addPizzaToCart} = usePizzaOrders()

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
            <Grid gutter="sm">
                {
                    pizza.map(pizza =>
                        <Col key={pizza.id} span={12} md={6} lg={3}>
                            <PizzaCard onAddCart={addPizzaToCart} pizza={pizza}/>
                        </Col>
                            )
                }
            </Grid>
        </Container>
    );
};