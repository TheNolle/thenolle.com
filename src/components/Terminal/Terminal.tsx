import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CommandHandler from '../../other/ts/CommandHandler'
import { handleEnter } from '../../other/ts/utils'

import './Terminal.scss'

interface TerminalProps {
    name: string
    isActive: boolean
}

export default function Terminal({ name, isActive }: TerminalProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const terminalContainerRef = useRef<HTMLDivElement | null>(null)
    const scrollDivRef = useRef<HTMLDivElement | null>(null)
    const [input, setInput] = useState('')
    const [output, setOutput] = useState<React.ReactNode>('')
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
        if (!isActive && location.pathname !== '/') {
            navigate('/')
        }
    }, [isActive, location.pathname, navigate])

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollDivRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
        return () => clearTimeout(timer)
    }, [output])

    function handleKeyPress(event: React.KeyboardEvent) {
        handleEnter(event, input, commandHandler, setOutput, setInput, setCommandHistory, setHistoryIndex, commandHistory, historyIndex)
    }

    return (
        <div ref={terminalContainerRef} className={`terminal-container ${isActive ? 'active' : ''}`} onClick={() => inputRef.current?.focus()}>
            <pre>{output}</pre>
            <div className="terminal-input-container">
                <span>{`${commandHandler.handle('').prefix} `}</span>
                <input className="terminal-input" ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} />
            </div>
            <div ref={scrollDivRef}></div>
        </div>
    )
}
