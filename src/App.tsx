import React, { FC, memo, useEffect, useReducer, useState } from 'react';
import {
    ColorScheme, ColorSchemeProvider, MantineProvider
} from "@mantine/core";
import { Navbar } from '@mantine/core';
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {Shop} from "./components/shop/shop";
import {MainLayout} from "./mainLayout/main-layout";


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

    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = (value?: ColorScheme) => {
        console.log(colorScheme)
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    }

    return (
        // @ts-ignore
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    fontFamily: 'Open Sans, sans serif',
                    spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                    breakpoints: {
                        xs: 500,
                        sm: 800,
                        md: 1000,
                        lg: 1200,
                        xl: 1950,
                    },
                }}>
                <Router>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={ <Home/> }/>
                            <Route path="shop" element={ <Shop/> }/>
                            <Route path="cart" element={ <Cart/> }/>
                          </Routes>
                    </MainLayout>
                </Router>
            </MantineProvider>
        </ColorSchemeProvider>
  );

}

export default App;
