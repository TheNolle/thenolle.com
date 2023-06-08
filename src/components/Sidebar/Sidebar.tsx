import React from 'react'

import './Sidebar.scss'

import TerminalItems from '../Terminal/TerminalItems/TerminalItems'

interface SidebarProps {
    onAddTerminal: () => void
    terminals: string[]
    activeTerminal: string
    onTerminalSelect: (terminalName: string) => void
    onTerminalRemove: (terminalName: string) => void
}

export default function Sidebar({ onAddTerminal, terminals, activeTerminal, onTerminalSelect, onTerminalRemove }: SidebarProps): JSX.Element {
    return (
        <div className="sidebar-container">
            <h2>😸 Nolly 😸</h2>
            <div className="terminal-list">
                <TerminalItems terminals={terminals} activeTerminal={activeTerminal} onTerminalSelect={onTerminalSelect} onTerminalRemove={onTerminalRemove} />
            </div>
            <button className="add-terminal-btn" onClick={onAddTerminal}>Add Terminal</button>
        </div>
    )
}
