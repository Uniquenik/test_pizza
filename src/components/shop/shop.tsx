import React from "react";
import {Container, Grid, LoadingOverlay, Col} from "@mantine/core";
import {PizzaCard} from "./pizza-card";
import {observer} from "mobx-react-lite";
import {Pizza} from "../data-types";
import {storeProducts} from "../../store/productsList";
import {storeCart} from "../../store/productsCart";

export const Shop = observer(() => {
    const {isFetching, pizzaList} = storeProducts
    const {addInCart} = storeCart

    return (
        <Container>
            <LoadingOverlay visible={isFetching}/>
            <Grid gutter="sm">
                {pizzaList && (
                    pizzaList.map((pizza: Pizza) =>
                        <Col key={pizza.id} span={12} md={6} lg={3}>
                            <PizzaCard pizza={pizza} onAddCart={addInCart}/>
                        </Col>
                    ))
                }
            </Grid>
        </Container>
    );
    /*})*/
});