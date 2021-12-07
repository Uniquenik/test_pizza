import React, {FC, useState} from "react";
import {
    AppShell,
    Navbar,
    Burger,
    Header,
    MediaQuery,
    ActionIcon,
    useMantineColorScheme,
    Group,
    Divider,
    Text,
    Drawer, UnstyledButton
} from "@mantine/core";
import {Link} from "react-router-dom";
import {useOpenCart} from "../hooks/useOpenCart";
import {Cart} from "../components/cart/cart";
import {ArchiveIcon, SunIcon, MoonIcon} from "@radix-ui/react-icons";

export const MainLayout: FC = ({ children }) => {
    const {isOpenCart, SetOpenCart, GetValues} = useOpenCart()
    const [isOpenLeftMenu, setIsOpenLeftMenu] = useState(false)

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
            <AppShell
                padding="xs"
                fixed = {isOpenCart}
                zIndex={10}
                // navbarOffsetBreakpoint = "xs"
                // fixed prop on AppShell will be automatically added to Header and Navbar
                navbar={
                    <Navbar
                        zIndex = {50}
                        padding= "md"
                        fixed = {true}
                        // Breakpoint at which navbar will be hidden if hidden prop is true
                        hiddenBreakpoint={"xl"}
                        // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
                        hidden={!isOpenCart}
                        width={{lg: 450}}
                    >
                        <Navbar.Section>
                            <Cart/>
                        </Navbar.Section>
                    </Navbar>
                }
                header={
                        <Header height={ 60 } zIndex = {1000} padding="xs">
                            <Group spacing={"xs"}>
                                <Burger
                                opened={isOpenCart}
                                onClick={() => SetOpenCart(!isOpenCart)}
                                size="sm"
                                color={"gray"}
                                mr="xs"
                                />
                                <ActionIcon
                                    size={"lg"}
                                    variant="outline"
                                    onClick={() => toggleColorScheme()}
                                    title="Toggle color scheme"
                                >
                                    {dark ? (
                                        <SunIcon/>
                                    ): (
                                        <MoonIcon/>
                                    )}
                                </ActionIcon>
                                <Divider orientation="vertical" mx="xs" />
                                <MediaQuery largerThan={"xs"} styles={{display:"none"}}>
                                    <Group>
                                        <Link to={"/"}>
                                            <UnstyledButton>
                                                <Text>Home</Text>
                                            </UnstyledButton>
                                        </Link>
                                        <Link to={"/shop"}>
                                            <UnstyledButton>
                                                    <Text>Shop</Text>
                                            </UnstyledButton>
                                        </Link>
                                        <Link to={"/"}>
                                            <UnstyledButton>
                                                <Text>Random</Text>
                                            </UnstyledButton>
                                        </Link>
                                    </Group>
                                </MediaQuery>
                                <MediaQuery smallerThan={"xs"} styles={{display:"none"}}>
                                    <UnstyledButton onClick={() => setIsOpenLeftMenu(true)}>
                                        <Text>All links</Text>
                                    </UnstyledButton>
                                </MediaQuery>
                                <Drawer
                                    opened={isOpenLeftMenu}
                                    onClose={() => setIsOpenLeftMenu(false)}
                                    title="Menu"
                                    padding="md"
                                    size="xs"
                                >
                                    <Group direction={"column"}>
                                        <Link to={"/"}>
                                            <UnstyledButton>
                                                <Text>Home</Text>
                                            </UnstyledButton>
                                        </Link>
                                        <Link to={"/shop"}>
                                            <UnstyledButton>
                                                <Text>Shop</Text>
                                            </UnstyledButton>
                                        </Link>
                                        <Link to={"/"}>
                                            <UnstyledButton>
                                                <Text>Random</Text>
                                            </UnstyledButton>
                                        </Link>
                                    </Group>
                                </Drawer>
                            </Group>
                        </Header>
                }
                styles={ (theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                }) }
            >
                { children }
            </AppShell>
    );
}

