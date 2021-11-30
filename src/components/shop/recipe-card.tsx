import {Recipe} from "../../store/recipesList";
import {Card, Image, Text} from "@mantine/core"
import React from "react";

export const RecipeCard = (props:{
    recipe:Recipe
}) => {
    return (
        <Card>
            <Card.Section>
                <Image src={ props.recipe.imageLink } height={ 150 } fit={"contain"} alt={ props.recipe.name } withPlaceholder/>
            </Card.Section>
            <Text size={"xl"}> {props.recipe.name}</Text>
        </Card>

    )


}