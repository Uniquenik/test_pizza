import React, {memo} from "react";
import {Badge, Button, Card, Group, Image, Text, useMantineTheme} from "@mantine/core";
import {Pizza} from "../data-types";

export const PizzaCard = memo((props: Pizza) => {

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <Card shadow="sm" padding="lg">
            <Card.Section>
                <Image src={ props.imageLink } height={ 160 } alt={ props.name } withPlaceholder/>
            </Card.Section>
            <Group position="apart" style={ { marginBottom: 5, marginTop: theme.spacing.sm } }>
                <Text weight={ 500 }>{ props.name }</Text>
                <Badge color="pink" variant="light">
                    Pizza
                </Badge>
            </Group>
            <Text size="sm" style={ { color: secondaryColor, lineHeight: 1.5 } }>
                PRICE: ${ props.price }
            </Text>
            <Button variant="light" color="blue" fullWidth style={ { marginTop: 14, width: '8em' } }>
                Add to cart
            </Button>
        </Card>
    );
});