export default {
    name: 'clear-history',
    description: 'Clears the command history',
    usage: 'clear-history',
    async execute(): Promise<string> {
        const activeTerminal: string = JSON.parse(localStorage.getItem('activeTerminal') || '')
        const commandHistory: { [key: string]: string[] } = JSON.parse(localStorage.getItem('commandHistory') || '{}')
        commandHistory[activeTerminal] = []
        localStorage.setItem('commandHistory', JSON.stringify(commandHistory))
        return 'Command history cleared'
    }
}