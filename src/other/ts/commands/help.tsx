import React from 'react'
import CommandHandler from '../CommandHandler'

export default {
    name: 'help',
    description: 'Provides all the commands',
    usage: 'help',
    async execute(): Promise<JSX.Element> {
        const commands: { name: string; description: string; usage: string }[] = new CommandHandler().getCommands()
        return <ol>
            <li><b style={{ textDecoration: 'underline' }}>clear</b> - Clears the screen (usage: <b style={{ textDecoration: 'underline' }}>clear</b>)</li>
            {commands.map(command => <li key={command.name}><b style={{ textDecoration: 'underline' }}>{command.name}</b> - {command.description} (usage: <b style={{ textDecoration: 'underline' }}>{command.usage}</b>)</li>)}
        </ol>
    }
}