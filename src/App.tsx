import React, { FC, memo, useEffect, useReducer, useState } from 'react';
import {
  AppShell as MantineAppShell,
  Button,
  Header,
} from "@mantine/core";
import { Navbar } from '@mantine/core';
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {Shop} from "./components/shop/shop";


const AppShell: FC = ({ children }) => {
  return (
      <MantineAppShell
          padding="md"
          navbar={
            <Navbar padding="xs" width={ { base: 300 } }>
              <Navbar.Section grow mt="lg">
                {/*<Scrollbars>*/ }

                {/*</Scrollbars>*/ }
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={ 60 } padding="xs">
              <Link to="/cart">
                <Button variant="gradient" gradient={ { from: 'gray', to: 'blue' } }>Корзина</Button>
              </Link>
              <Link to="/shop">
                <Button variant="gradient" gradient={ { from: 'indigo', to: 'gray' } }>Товары</Button>
              </Link>
            </Header>
          }
          styles={ (theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          }) }
      >
        { children }
      </MantineAppShell>
  );
};


export const Home = () => {

  return (
      <>

      </>
  );
};


export const Cart = () => {

  return (
      <>

      </>
  );
};


const App = () => {

  return (
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="shop" element={ <Shop/> }/>
            <Route path="cart" element={ <Cart/> }/>
          </Routes>
        </AppShell>
      </Router>
  );

}

export default App;
