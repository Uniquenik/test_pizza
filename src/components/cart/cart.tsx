import {observer} from "mobx-react-lite";
import {storeCart} from "../../store/productsCart";
import {Card, Text, LoadingOverlay, Center, ActionIcon, Title, Table, Group, Space} from "@mantine/core";
import React from "react";
import {CartCard} from "./cart-card";
import {TrashIcon} from "@radix-ui/react-icons";

const ths = (
    <tr>
        <th></th>
        <th>Name</th>
        <th>Amount</th>
        <th>Price</th>
    </tr>
);


export const Cart = observer(() => {
    const {isFetching, cartItemsProducts, totalPrice, addInCart, deleteInCart, clearCart} = storeCart
    console.log(cartItemsProducts)
    return (
        <div>
            <LoadingOverlay visible={isFetching}/>
            <Space h="md" />
            <Center>
                <Title order={2}> Cart </Title>
            </Center>
            <Space h="md" />
            <Table striped>
                <thead>{ths}</thead>
                <tbody>
                {cartItemsProducts &&
                cartItemsProducts.map((item) =>
                    <CartCard key = {item.pizza.id}
                              pizza={item.pizza}
                              amount={item.amount}
                              onAdd={addInCart}
                              onRemove={deleteInCart}
                    />
                )
                }
                </tbody>
            </Table>
            <Group position={"apart"}>
                <ActionIcon size={"xl"} onClick={clearCart}>
                    <TrashIcon/>
                </ActionIcon>
                <Text size={"xl"}>Price:{totalPrice}</Text>
            </Group>
        </div>

    )
})