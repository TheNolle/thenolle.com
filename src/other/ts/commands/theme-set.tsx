import React from 'react'
import ThemeHandler from '../ThemeHandler'

export default {
    name: 'set-theme',
    description: 'Set theme to the specified theme',
    usage: 'set-theme <theme>',
    async execute(args: string[]): Promise<JSX.Element> {
        const themes = ThemeHandler.getThemes()
        const theme = args[0]
        if (!themes.includes(theme)) return <span>Theme <b style={{ textDecoration: 'underline' }}>{theme}</b> not found (enter <b style={{ textDecoration: 'underline' }}>list-themes</b> to see available themes)</span>
        ThemeHandler.setTheme(theme)
        return <span>Theme set to <b style={{ textDecoration: 'underline' }}>{theme}</b></span>
    }
}
