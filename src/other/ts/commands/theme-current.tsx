import React from 'react'
import ThemeHandler from '../ThemeHandler'

export default {
    name: 'current-theme',
    description: 'Get the current theme',
    usage: 'current-theme',
    async execute(): Promise<JSX.Element> {
        const theme = ThemeHandler.getCurrentTheme()
        return <span>Current theme is <b style={{textDecoration: 'underline'}}>{theme}</b></span>
    }
}