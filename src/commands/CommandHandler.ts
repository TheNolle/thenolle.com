import { clearCommand, helloCommand } from './commands'

export default class CommandHandler {
    private commands: Record<string, (args: string[]) => string>
    private user: string
    private domain: string
    private path: string

    constructor() {
        this.commands = {
            hello: helloCommand,
            clear: clearCommand,
        }
        this.user = 'anonymous'
        this.domain = 'thenolle.com'
        this.path = `~${window.location.pathname}`
    }

    public handle(input: string): { prefix: string; output: string } {
        const [commandName, ...args] = input.split(' ')

        const command = this.commands[commandName]

        const prefix = `${this.user}@${this.domain}:${this.path}$`
        let output = `Command not found: ${commandName}`

        if (command) output = command(args)

        return { prefix, output }
    }
}
