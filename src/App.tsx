import React, { useEffect, useState } from 'react'
import randomWords from 'random-words'

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Terminal from './components/Terminal/Terminal'

export default function App(): JSX.Element {
    let savedTerminals = localStorage.getItem('terminals')
    let initialTerminals = savedTerminals && savedTerminals !== '""' && savedTerminals !== '[]' ? JSON.parse(savedTerminals) : [generateTerminalName()]
    if (Array.isArray(initialTerminals)) initialTerminals = initialTerminals.filter(name => typeof name === 'string')
    else initialTerminals = [generateTerminalName()]
    const [terminals, setTerminals] = useState<string[]>(initialTerminals)

    let savedActiveTerminal = localStorage.getItem('activeTerminal')
    let initialActiveTerminal = savedActiveTerminal && savedActiveTerminal !== '""' ? JSON.parse(savedActiveTerminal) : terminals[0]
    if (typeof initialActiveTerminal !== 'string' || !terminals.includes(initialActiveTerminal)) initialActiveTerminal = terminals[0]
    const [activeTerminal, setActiveTerminal] = useState<string>(initialActiveTerminal)

    useEffect(() => {
        const serializedTerminals = JSON.stringify(terminals)
        localStorage.setItem('terminals', serializedTerminals)
    }, [terminals])

    useEffect(() => {
        const serializedActiveTerminal = JSON.stringify(activeTerminal)
        localStorage.setItem('activeTerminal', serializedActiveTerminal)
    }, [activeTerminal])

    useEffect(() => {
        const savedOutputs = JSON.parse(localStorage.getItem('outputs') || '{}')
        for (let terminalName of terminals) {
            if (!savedOutputs[terminalName]) {
                savedOutputs[terminalName] = []
            }
        }
        localStorage.setItem('outputs', JSON.stringify(savedOutputs))
    }, [terminals])

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
        if (activeTerminal === terminalName) {
            const newActiveTerminal = updatedTerminals.length > 0 ? updatedTerminals[0] : generateTerminalName()
            setActiveTerminal(newActiveTerminal)
            if (updatedTerminals.length === 0) setTerminals([newActiveTerminal])
        }
        const savedCommandHistoryObject = localStorage.getItem('commandHistory')
        if (savedCommandHistoryObject && savedCommandHistoryObject !== '""') {
            let commandHistoryObject = JSON.parse(savedCommandHistoryObject)
            delete commandHistoryObject[terminalName]
            localStorage.setItem('commandHistory', JSON.stringify(commandHistoryObject))
        }

        const savedOutputs = JSON.parse(localStorage.getItem('outputs') || '{}')
        delete savedOutputs[terminalName]
        localStorage.setItem('outputs', JSON.stringify(savedOutputs))
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
