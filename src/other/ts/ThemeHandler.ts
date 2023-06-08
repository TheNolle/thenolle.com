declare const require: {
    context(directory: string, useSubdirectories: boolean, regExp: RegExp): {
        keys(): string[]
        <T>(id: string): T
    }
}

export default class ThemeHandler {
    private static currentTheme: string = 'solarized'

    public static getCurrentTheme(): string {
        return ThemeHandler.currentTheme
    }

    public static getThemes(): string[] {
        const themesContext = require.context('../scss/themes', false, /\.scss$/)
        const themeFiles = themesContext.keys()

        const themes = themeFiles.map((filePath: string) => {
            const themeName = filePath.replace('./', '').replace('.scss', '')
            return themeName
        })

        return themes
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
