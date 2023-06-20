import ThemeHandler from '../ThemeHandler'

export default {
    name: 'reset-theme',
    description: 'Resets the theme to the default one',
    usage: 'reset-theme',
    async execute(): Promise<string> {
        ThemeHandler.setTheme('solarized')
        return 'Theme reset to default'
    }
}