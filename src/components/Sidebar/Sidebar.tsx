import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import TrashCan from '../../other/svgs/trash-can.svg' assert { type: 'svg' }

import './Sidebar.scss'

interface SidebarProps {
    onAddTerminal: () => void
    terminals: number[]
    activeTerminal: number
    onTerminalSelect: (terminalId: number) => void
}

export default function Sidebar({
    onAddTerminal,
    terminals,
    activeTerminal,
    onTerminalSelect,
}: SidebarProps): JSX.Element {
    const [showRecycleBin, setShowRecycleBin] = useState(false)

    function handleRecycleBinToggle() {
        setShowRecycleBin((prevState) => !prevState)
    }

    function handleTerminalRemove(terminalId: number) {
        onTerminalSelect(terminalId)
    }

    return (
        <div className="sidebar-container">
            <h2>😸 Nolly ☕</h2>
            <div className="terminal-list">
                {terminals.map((terminalId) => (
                    <div
                        key={terminalId}
                        className={`terminal-item ${terminalId === activeTerminal ? 'active' : ''}`}
                        onClick={() => onTerminalSelect(terminalId)}
                        onMouseEnter={handleRecycleBinToggle}
                        onMouseLeave={handleRecycleBinToggle}
                    >
                        Terminal {terminalId}
                        {showRecycleBin && (
                            <TrashCan
                                className="recycle-bin"
                                onClick={(e: Event) => {
                                    e.stopPropagation()
                                    handleTerminalRemove(terminalId)
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="buttons">
                <Link to="/configuration" onClick={() => onTerminalSelect(-1)}>
                    <button className={`config-btn ${activeTerminal === -1 ? 'active' : ''}`}>Configuration</button>
                </Link>
                <button className="add-terminal-btn" onClick={onAddTerminal}>
                    Add Terminal
                </button>
            </div>
        </div>
    )
}
