import {useContext, useState} from "react";
import {CartContext} from "./usePizzaOrder";

export const useOpenCart = () => {

    const [isOpenCart, setIsOpenCart] = useState <boolean> (false)

    const SetOpenCart = (b: boolean) => setIsOpenCart(b);

    const value = useContext(CartContext)

    const GetValues = () => console.log(value)

    return {
        isOpenCart,
        SetOpenCart,
        GetValues
    }
}