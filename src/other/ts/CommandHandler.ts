declare const require: any

const allCommands: { name: string; description: string; usage: string }[] = []

export default class CommandHandler {
    private commands: { [key: string]: { name: string; description: string; execute: (args: string[]) => Promise<string | JSX.Element> } }
    private user: string
    private domain: string
    private path: string

    constructor() {
        this.commands = {}
        this.user = 'anonymous'
        this.domain = 'thenolle.com'
        this.path = `~${window.location.pathname}`

        this.loadCommands()
    }

    private async loadCommands() {
        const context = require.context('./commands', true, /\.(ts|tsx)$/)
        const commandFiles = context.keys()

        for (const key of commandFiles) {
            const commandModule = await import(`./commands/${key.slice(2)}`)
            const { default: command } = commandModule
            const { name, description, usage, execute } = command
            this.commands[name] = { name, description, execute }
            if (!allCommands.find((c) => c.name === name)) allCommands.push({ name, description, usage })
        }
    }

    public getCommands(): { name: string; description: string; usage: string }[] {
        return allCommands
    }

    public async handle(input: string): Promise<{ prefix: string; output: string | JSX.Element }> {
        const [commandName, ...args] = input.split(' ')

        const command = this.commands[commandName]

        const prefix = `${this.user}@${this.domain}:${this.path}$`
        let output: string | JSX.Element = `Command not found: ${commandName}`

        if (command) output = await command.execute(args)

        return { prefix, output }
    }
}
