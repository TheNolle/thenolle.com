import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

import './Sidebar.scss'

interface SidebarProps {
    onAddTerminal: () => void
    terminals: string[]
    activeTerminal: string
    onTerminalSelect: (terminalName: string) => void
    onTerminalRemove: (terminalName: string) => void
}

export default function Sidebar({ onAddTerminal, terminals, activeTerminal, onTerminalSelect, onTerminalRemove }: SidebarProps): JSX.Element {
    function handleTerminalRemove(terminalName: string) {
        onTerminalRemove(terminalName)
    }

    return (
        <div className="sidebar-container">
            <h2>😸 Nolly 😸</h2>
            <div className="terminal-list">
                {terminals.map((terminalName) => (
                    <Link to="/" key={terminalName} onClick={() => onTerminalSelect(terminalName)}>
                        <div className={`terminal-item ${terminalName === activeTerminal ? 'active' : ''}`}>
                            {terminalName}
                            <FaTrash className="recycle-bin" title={`Remove Terminal ${terminalName}`} onClick={(e) => { e.stopPropagation(); handleTerminalRemove(terminalName) }} />
                        </div>
                    </Link>
                ))}
            </div>
            <div className="buttons">
                <Link to="/configuration" onClick={() => onTerminalSelect('')}>
                    <button className={`config-btn ${activeTerminal === '' ? 'active' : ''}`}>Configuration</button>
                </Link>
                <button className="add-terminal-btn" onClick={onAddTerminal}>
                    Add Terminal
                </button>
            </div>
        </div>
    )
}
