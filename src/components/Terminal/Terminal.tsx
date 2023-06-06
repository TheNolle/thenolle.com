import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CommandHandler from '../../commands/CommandHandler'
import { handleEnter } from '../../other/utils'

import './Terminal.scss'

interface TerminalProps {
    name: string
    isActive: boolean
}

export default function Terminal({ name, isActive }: TerminalProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const shadowRef = useRef<HTMLSpanElement | null>(null)
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)
    const location = useLocation()
    const navigate = useNavigate()
    const commandHandler = new CommandHandler()

    useEffect(() => {
        if (isActive) {
            inputRef.current?.focus()
        }
    }, [isActive])

    useEffect(() => {
        if (shadowRef.current && inputRef.current) {
            inputRef.current.style.width = `${shadowRef.current.offsetWidth}px`
        }
    }, [input])

    useEffect(() => {
        if (!isActive && location.pathname !== '/') {
            navigate('/')
        }
    }, [isActive, location.pathname, navigate])

    function handleKeyPress(event: React.KeyboardEvent) {
        handleEnter(event, input, commandHandler, setOutput, setInput, setCommandHistory, setHistoryIndex, commandHistory, historyIndex)
    }

    return (
        <div className={`terminal-container ${isActive ? 'active' : ''}`} onClick={() => inputRef.current?.focus()}>
            <pre>{output}</pre>
            <div className="terminal-input-container">
                <span>{`${commandHandler.handle('').prefix} `}</span>
                <input className="terminal-input" ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} />
                <span className="caret">_</span>
                <span className="shadow" ref={shadowRef}>{input}</span>
            </div>
        </div>
    )
}
