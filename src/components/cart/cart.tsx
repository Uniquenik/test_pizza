import {observer} from "mobx-react-lite";
import {storeCart} from "../../store/productsCart";
import {Card, Text, LoadingOverlay, Center, ActionIcon, Title} from "@mantine/core";
import React from "react";
import {CartCard} from "./cart-card";
import {TrashIcon} from "@radix-ui/react-icons";

export const Cart = observer(() => {
    const {isFetching, cartItemsProducts, totalPrice, addInCart, deleteInCart, clearCart} = storeCart
    console.log(cartItemsProducts)
    return (
        <div>
            <LoadingOverlay visible={isFetching}/>
            <Center> <Title order={2}> Cart</Title></Center>
            <Card shadow={"xs"} padding={"sm"}>
            {cartItemsProducts &&
            cartItemsProducts.map((item) =>
                <CartCard pizza={item.pizza}
                          amount={item.amount}
                          onAdd={addInCart}
                          onRemove={deleteInCart}
                />
            )
            }
            </Card>
            <Card padding="xs">
                <ActionIcon onClick={clearCart}>
                    <TrashIcon/>
                </ActionIcon>
                <div>{totalPrice}</div>
            </Card>
        </div>

    )
})