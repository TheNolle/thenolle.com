import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'

import App from './App'

if (document.getElementById('root') as HTMLElement | null)
    ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(<App />)

void React