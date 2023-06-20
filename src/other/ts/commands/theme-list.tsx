import React from 'react'
import ThemeHandler from '../ThemeHandler'

export default {
    name: 'list-themes',
    description: 'List available themes',
    usage: 'list-themes',
    async execute(): Promise<JSX.Element> {
        const themes = ThemeHandler.getThemes()
        return <ol>{themes.map(theme => <li key={theme}>{theme}</li>)}</ol>
    }
}