import {Pizza} from "../data-types";
import {Group, Image, Text, Button, ActionIcon} from "@mantine/core"
import {PlusIcon, MinusIcon} from "@radix-ui/react-icons";

export const CartCard = (props:{
    pizza: Pizza,
    amount: number,
    onAdd: (pizza:Pizza) => void,
    onRemove: (pizza:Pizza) => void
}) => {
  return (
      <Group spacing={"xs"} position={"apart"}>
          <Image radius={"md"} src={props.pizza.imageLink} height={50} width={50} fit={"contain"} alt={"pizza"}/>
          <Text>{props.pizza.name} </Text>
          <ActionIcon onClick={()=> {props.onRemove(props.pizza)}}>
              <MinusIcon/>
          </ActionIcon>
          <Text>{props.amount} </Text>
          <ActionIcon onClick={()=> {props.onAdd(props.pizza)}}>
              <PlusIcon/>
          </ActionIcon>
          <Text>{props.pizza.price * props.amount} </Text>
      </Group>
  )
}