import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MantineProvider } from '@mantine/core';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                fontFamily: 'Open Sans, sans serif',
                spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                colorScheme: 'dark'
            }}>
            <App/>
        </MantineProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
