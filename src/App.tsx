import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import randomWords from 'random-words'

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Terminal from './components/Terminal/Terminal'
import Configuration from './components/Configuration/Configuration'

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
        let name = ''
        while (name.length < 20) {
            const word = randomWords({ exactly: 1, maxLength: 25 - name.length})
            if (name.length + word.length + 1 <= 20) name += word + '-'
            else break
        }
        return name.trim().replace(/-$/, '')
    }

    return (
        <div className="app-container">
            <Sidebar onAddTerminal={addTerminal} terminals={terminals} activeTerminal={activeTerminal} onTerminalSelect={handleTerminalSelect} onTerminalRemove={handleTerminalRemove} />
            <Routes>
                <Route path="/" element={<div className="terminals-container">{terminals.map((terminalName) => (<Terminal key={terminalName} name={terminalName} isActive={terminalName === activeTerminal} />))}</div>} />
                <Route path="/configuration" element={<Configuration />} />
            </Routes>
        </div>
    )
}
