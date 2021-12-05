import React from "react";
import {
    Container,
    Grid,
    LoadingOverlay,
    Col,
    Pagination,
    Center,
    Title,
    Space,
    SegmentedControl,
    Skeleton
} from "@mantine/core";
import {PizzaCard} from "./pizza-card";
import {observer} from "mobx-react-lite";
import {Pizza} from "../data-types";
import {storeProducts} from "../../store/productsList";
import {storeCart} from "../../store/productsCart";
import {Recipe, storeRecipes} from "../../store/recipesList";
import {RecipeCard} from "./recipe-card";
import {usePagination} from "@mantine/hooks";

export const Shop = observer(() => {
    const {isFetching, pizzaList} = storeProducts
    const {addInCart} = storeCart
    const {currRecipes, total, setCurrentPage, currentPage, filterOptions, filterValue, changeFilter} = storeRecipes
    /*const pagination = usePagination({
        total: total,
        siblings: 1,
        initialPage:1,
        onChange: setCurrentPage
    });*/

    return (
        <Container>
            {/*<LoadingOverlay visible={isFetching || storeRecipes.isFetching}/>*/}
            <Space h="md" />
            <Center>
                <Title order={2}> Menu </Title>
            </Center>
            <Space h="md" />
            {!isFetching &&
                <Grid gutter="sm">
                    {pizzaList && (
                        pizzaList.map((pizza: Pizza) =>
                            <Col key={pizza.id} span={12} xs={6} md={4} lg={4} xl={3}>
                                <PizzaCard pizza={pizza} onAddCart={addInCart}/>
                            </Col>
                        ))
                    }
                </Grid> || <Skeleton height={200} mt={6} radius="xl" />

            }
            <Space h="xl" />
            <Center>
                <Title order={2}> Recipes for active people </Title>
            </Center>
            <Space h="xs" />
            <SegmentedControl
                fullWidth
                value={filterValue}
                onChange={changeFilter}
                data={filterOptions}
            />
            <Space h="md" />
            {!storeRecipes.isFetching &&
                <div>
                    <Grid gutter={"sm"}>
                        {currRecipes && (
                            currRecipes.map((recipe: Recipe) =>
                                <Col key={recipe.id} span={12} xs={6} md={4} lg={4} xl={3}>
                                    <RecipeCard recipe={recipe}/>
                                </Col>
                            ))
                        }
                    </Grid>
                    <Space h="md" />
                    <Center>
                    <Pagination page={currentPage}
                    onChange={setCurrentPage}
                    total={total}
                    radius={"xl"}
                    siblings={1}/>
                    </Center>
                </div>
                || <Skeleton height={200} mt={6} radius="xl" />
            }
        </Container>
    );
});