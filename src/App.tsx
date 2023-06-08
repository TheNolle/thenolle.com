import React, { useState } from 'react'
import randomWords from 'random-words'

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Terminal from './components/Terminal/Terminal'

export default function App(): JSX.Element {
    const [terminals, setTerminals] = useState<string[]>([generateTerminalName()])
    const [activeTerminal, setActiveTerminal] = useState<string>(terminals[0])

    function addTerminal() {
        const newTerminalName = generateTerminalName()
        setTerminals((prevTerminals) => [...prevTerminals, newTerminalName])
        setActiveTerminal(newTerminalName)
    }

    function handleTerminalSelect(terminalName: string) {
        setActiveTerminal(terminalName)
    }

    function handleTerminalRemove(terminalName: string) {
        const updatedTerminals = terminals.filter((name) => name !== terminalName)
        setTerminals(updatedTerminals)
        if (activeTerminal === terminalName) setActiveTerminal(updatedTerminals.length > 0 ? updatedTerminals[0] : '')
    }

    function generateTerminalName(): string {
        return randomWords({ maxLength: 8, join: '-', exactly: 3 }).replace(/ /g, '-').trim()
    }

    return (
        <div className="app-container">
            <Sidebar onAddTerminal={addTerminal} terminals={terminals} activeTerminal={activeTerminal} onTerminalSelect={handleTerminalSelect} onTerminalRemove={handleTerminalRemove} />
            <div className="terminals-container">{terminals.map((terminalName) => (<Terminal key={terminalName} name={terminalName} isActive={terminalName === activeTerminal} />))}</div>
        </div>
    )
}
