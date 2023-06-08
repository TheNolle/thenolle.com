import React from 'react'
import ThemeHandler from './ThemeHandler'

export function helloCommand(args: string[]): string {
    return 'Hello, World!'
}

export function clearCommand(args: string[]): string {
    return ''
}

export function currentThemeCommand(): string {
    const theme = ThemeHandler.getCurrentTheme()
    return `Current theme is "${theme}"`
}

export function listThemesCommand(): string {
    const themes = ThemeHandler.getThemes()
    return themes.join(', ')
}

export function setThemeCommand(args: string[]): string {
    const themes = ThemeHandler.getThemes()
    const theme = args[0]
    if (!themes.includes(theme)) return `Theme "${theme}" not found (type "list-themes" to see available themes)`
    ThemeHandler.setTheme(theme)
    return `Theme set to "${theme}"`
}

export function resetThemeCommand(): string {
    ThemeHandler.setTheme('solarized')
    return 'Theme reset to default'
}

export function sampleImageCommand(args: string[]): JSX.Element {
    return (<img src={`https://picsum.photos/600?random=${Math.random()}`} />)
}