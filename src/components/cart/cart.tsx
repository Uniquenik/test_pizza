import {observer} from "mobx-react-lite";
import {storeCart} from "../../store/productsCart";
import {
    Card,
    Text,
    LoadingOverlay,
    Center,
    ActionIcon,
    Title,
    Table,
    Group,
    Space,
    SegmentedControl
} from "@mantine/core";
import React, {useState} from "react";
import {CartCard} from "./cart-card";
import {TrashIcon} from "@radix-ui/react-icons";
import {useMediaQuery} from "@mantine/hooks";

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
    const largeScreen = useMediaQuery('(min-width: 720px)');
    const [typeOrder, setTypeOrder] = useState("delivery")

    return (
        <div>
            <LoadingOverlay visible={isFetching}/>
            <Space h="md" />
            <Center>
                <Title order={2}> Cart </Title>
            </Center>
            <Space h="md" />
            <SegmentedControl
                fullWidth
                size={ largeScreen ? "md" : "xs"}
                value={typeOrder}
                onChange={setTypeOrder}
                data={[
                    { label: 'Delivery', value: 'delivery' },
                    { label: 'In restaurant', value: 'restaurant' },
                    { label: 'Pre-order in restaurant', value: 'pre-order' },
                ]}
            />
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