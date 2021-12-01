import React, {FC, useState} from "react";
import {
    AppShell,
    Navbar,
    Burger,
    Header,
    SegmentedControl,
    ActionIcon,
    useMantineColorScheme,
    Group,
    Divider,
    Text,
    Tabs, UnstyledButton
} from "@mantine/core";
import {Link} from "react-router-dom";
import {useOpenCart} from "../hooks/useOpenCart";
import {Cart} from "../components/cart/cart";
import {ArchiveIcon, SunIcon, MoonIcon} from "@radix-ui/react-icons";

export const MainLayout: FC = ({ children }) => {
    const {isOpenCart, SetOpenCart, GetValues} = useOpenCart()

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const [typeOrder, setTypeOrder] = useState("delivery")

    return (
            <AppShell
                padding="xs"
                fixed = {isOpenCart}
                zIndex={10}
                //navbarOffsetBreakpoint = "xs"
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
                            <SegmentedControl
                                fullWidth
                                size={"md"}
                                value={typeOrder}
                                onChange={setTypeOrder}
                                data={[
                                    { label: 'Delivery', value: 'delivery' },
                                    { label: 'In restaurant', value: 'restaurant' },
                                    { label: 'Pre-order in restaurant', value: 'pre-order' },
                                ]}
                            />
                        </Navbar.Section>
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

