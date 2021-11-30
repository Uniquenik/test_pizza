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
      <tr>
          <td><Image radius={"md"} src={props.pizza.imageLink} height={50} width={50} fit={"contain"} alt={"pizza"}/></td>
          <td><Text>{props.pizza.name} </Text></td>
          <td>
              <Group spacing={"xs"}>
                  <ActionIcon size={"xs"} variant="filled" radius={"md"} onClick={()=> {props.onRemove(props.pizza)}}>
                  <MinusIcon/>
                  </ActionIcon>
                  <Text>{props.amount} </Text>
                  <ActionIcon size={"xs"} variant="filled" radius={"md"} onClick={()=> {props.onAdd(props.pizza)}}>
                      <PlusIcon/>
                  </ActionIcon>
              </Group>
          </td>
          <td><Text>{props.pizza.price * props.amount} </Text></td>
      </tr>
  )
}