export default class ThemeHandler {
    private static currentTheme: string = 'solarized'

    public static getTheme(): string {
        return ThemeHandler.currentTheme
    }

    public static setTheme(theme: string) {
        const html = document.getElementsByTagName('html')[0]
        if (html) {
            html.classList.remove(`theme-${ThemeHandler.currentTheme}`)
            html.classList.add(`theme-${theme}`)
            ThemeHandler.currentTheme = theme
        }
    }
}
