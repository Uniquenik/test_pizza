import React, {FC} from "react";
import {AppShell, Navbar, Text, Burger, Header, Button, Drawer, useMantineColorScheme} from "@mantine/core";
import {Link} from "react-router-dom";
import {useOpenCart} from "../hooks/useOpenCart";

export const MainLayout: FC = ({ children }) => {
    const {isOpenCart, SetOpenCart, GetValues} = useOpenCart()

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

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
                        // when viewport size is less than theme.breakpoints.sm navbar width is 100%
                        // viewport size > theme.breakpoints.sm – width is 300px
                        // viewport size > theme.breakpoints.lg – width is 400px
                        width={{sm: 300, lg: 400}}
                    >
                        <Text>Application navbar</Text>
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

