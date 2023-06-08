import React from 'react'
import { FaTrash } from 'react-icons/fa'

import './TerminalItems.scss'

interface TerminalItemsProps {
    terminals: string[]
    activeTerminal: string
    onTerminalSelect: (terminalName: string) => void
    onTerminalRemove: (terminalName: string) => void
}

export default function TerminalItems({ terminals, activeTerminal, onTerminalSelect, onTerminalRemove }: TerminalItemsProps): JSX.Element {
    function handleTerminalRemove(terminalName: string) {
        onTerminalRemove(terminalName)
    }

    return (
        <>
            {terminals.map((terminalName) => (
                <div className={`terminal-item ${terminalName === activeTerminal ? 'active' : ''}`} key={terminalName} onClick={() => onTerminalSelect(terminalName)}>
                    {terminalName}
                    <FaTrash className="recycle-bin" title={`Remove Terminal ${terminalName}`} onClick={(e) => { e.stopPropagation(); handleTerminalRemove(terminalName) }} />
                </div>
            ))}
        </>
    )
}
