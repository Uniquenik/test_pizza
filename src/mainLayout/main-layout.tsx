import React, {FC} from "react";
import {AppShell, Navbar, Burger, Header, Button, Drawer, useMantineColorScheme} from "@mantine/core";
import {Link} from "react-router-dom";
import {useOpenCart} from "../hooks/useOpenCart";
import {Cart} from "../components/cart/cart";

export const MainLayout: FC = ({ children }) => {
    const {isOpenCart, SetOpenCart, GetValues} = useOpenCart()

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    //const dark = colorScheme === 'dark';

    return (
            <AppShell
                padding="xs"
                // fixed prop on AppShell will be automatically added to Header and Navbar
                navbar={
                    <Navbar
                        padding="md"
                        // Breakpoint at which navbar will be hidden if hidden prop is true
                        hiddenBreakpoint={"xl"}
                        // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
                        hidden={!isOpenCart}
                        width={{sm: 300, lg: 400}}
                    >
                        <Cart/>
                    </Navbar>
                }
                header={
                    <div>
                        <Header height={ 60 } padding="xs">
                            <Burger
                            opened={isOpenCart}
                            onClick={() => SetOpenCart(!isOpenCart)}
                            size="sm"
                            color={"gray"}
                            mr="xl"
                            />
                            <Link to="/shop">
                                <Button variant="gradient" gradient={ { from: 'indigo', to: 'gray' } }>Товары</Button>
                            </Link>
                            <Button onClick = {GetValues}>sas</Button>
                            <Button
                                variant="outline"
                                onClick={() => toggleColorScheme()}
                                title="Toggle color scheme"
                            >
                                Change theme
                            </Button>
                        </Header>
                    </div>
                }
                styles={ (theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                }) }
            >
                { children }
            </AppShell>
    );
}

