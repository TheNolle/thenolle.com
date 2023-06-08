import { clearCommand, currentThemeCommand, helloCommand, listThemesCommand, resetThemeCommand, sampleImageCommand, setThemeCommand } from './commands'

export default class CommandHandler {
    private commands: { [key: string]: (args: string[]) => string | JSX.Element }
    private user: string
    private domain: string
    private path: string

    constructor() {
        this.commands = {
            hello: helloCommand,
            clear: clearCommand,
            'current-theme': currentThemeCommand,
            'list-themes': listThemesCommand,
            'set-theme': setThemeCommand,
            'reset-theme': resetThemeCommand,
            'img': sampleImageCommand,
        }
        this.user = 'anonymous'
        this.domain = 'thenolle.com'
        this.path = `~${window.location.pathname}`
    }

    public handle(input: string): { prefix: string; output: string | JSX.Element } {
        const [commandName, ...args] = input.split(' ')

        const command = this.commands[commandName]

        const prefix = `${this.user}@${this.domain}:${this.path}$`
        let output: string | JSX.Element = `Command not found: ${commandName}`

        if (command) output = command(args)

        return { prefix, output }
    }
}
