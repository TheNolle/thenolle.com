import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'

import App from './App'
import ThemeHandler from './other/ts/ThemeHandler'

for (const theme of ThemeHandler.getThemes()) import(`./other/scss/themes/${theme}.scss`)


const root = document.getElementById('root')

if (root) {
    ReactDOM
        .createRoot(root)
        .render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        )
}
