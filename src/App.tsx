import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Terminal from './components/Terminal/Terminal'
import Configuration from './components/Configuration/Configuration'

export default function App(): JSX.Element {
    const [terminals, setTerminals] = useState<number[]>([1])
    const [activeTerminal, setActiveTerminal] = useState<number>(1)

    function addTerminal() {
        const newTerminals = [...terminals]
        const newTerminalId = terminals.length + 1
        newTerminals.push(newTerminalId)
        setTerminals(newTerminals)
        setActiveTerminal(newTerminalId)
    }

    function handleTerminalSelect(terminalId: number) {
        setActiveTerminal(terminalId)
    }

    return (
        <div className="app-container">
            <Sidebar onAddTerminal={addTerminal} terminals={terminals} activeTerminal={activeTerminal} onTerminalSelect={handleTerminalSelect} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            {terminals.map((terminalId) => (
                                <Terminal key={terminalId} id={terminalId} isActive={terminalId === activeTerminal} />
                            ))}
                        </div>
                    }
                />
                <Route path="/configuration" element={<Configuration />} />
            </Routes>
        </div>
    )
}
