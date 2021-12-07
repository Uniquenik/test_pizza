import React, {memo} from "react";
import {Badge, Button, Card, Group, Image, Text, useMantineTheme} from "@mantine/core";
import {Pizza} from "../data-types";

export const PizzaCard = memo((props: {
    pizza:Pizza,
    onAddCart: (Pizza:Pizza) => void
}) => {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <Card shadow="sm" padding="lg" style={{height: "100%", marginBottom:theme.spacing.sm}}>
            <Card.Section style={{marginBottom:theme.spacing.sm}}>
                <Image src={ props.pizza.imageLink } height={ 150 } width={"100%"} fit={"contain"} alt={ props.pizza.name }
                       withPlaceholder
                       placeholder={<Text align="center">Pls, wait...</Text>}
                />
            </Card.Section>
            <Group position="apart">
                <Text weight={ 500 }>{ props.pizza.name }</Text>
            </Group>
            <Group>
                <Badge color="red" variant="light">
                    Pizza
                </Badge>
            </Group>
            <Text size="sm" style={ { marginTop:theme.spacing.sm, color: secondaryColor, lineHeight: 1.5 } }>
                PRICE: ${  props.pizza.price }
            </Text>
            <Button variant="filled" color="red" fullWidth onClick={() => props.onAddCart(props.pizza)}>
                Add to cart
            </Button>
        </Card>
    );
});