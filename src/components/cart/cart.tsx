import {observer} from "mobx-react-lite";
import {storeCart} from "../../store/productsCart";
import {LoadingOverlay} from "@mantine/core";
import React from "react";

export const Cart = observer(() => {
    const {isFetching, cartItemsProducts, totalPrice} = storeCart
    console.log(cartItemsProducts)
    return (
        <div>
            <LoadingOverlay visible={isFetching}/>
            {cartItemsProducts &&
                cartItemsProducts.map((item) =>
                    <div> {item.pizza.name}, {item.amount} </div>
                )
            }
            <div>{totalPrice}</div>
        </div>

    )
})