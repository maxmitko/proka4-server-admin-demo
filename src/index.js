import './style/index'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import theme from 'theme/theme'

import LocalesProvider from './LocalesProvider'
import StoreProvider from './StoreProvider'
import App from './layout/App/index'


ReactDOM.render(
    <StoreProvider>
        <LocalesProvider>
            <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
            </BrowserRouter>
        </LocalesProvider>
    </StoreProvider>
    , document.querySelector('#root'));