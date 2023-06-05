import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CommandHandler from '../../commands/CommandHandler'

import './Terminal.scss'

interface TerminalProps {
    id: number
    isActive: boolean
}

export default function Terminal({ id, isActive }: TerminalProps): JSX.Element {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const shadowRef = useRef<HTMLSpanElement | null>(null)
    const [commandHandler, setCommandHandler] = useState(new CommandHandler())
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)
    const location = useLocation()
    const navigate = useNavigate()

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

    function handleEnter(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault()

            const { prefix, output: commandOutput } = commandHandler.handle(input)
            const formattedOutput = `${prefix} ${input}\n${commandOutput}`

            if (input.trim() === 'clear') setOutput('')
            else setOutput((prevOutput) => (prevOutput ? `${prevOutput}\n${formattedOutput}` : formattedOutput))

            setInput('')

            setCommandHistory((prevHistory) => [...prevHistory, input])
            setHistoryIndex(-1)
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            navigateCommandHistory('up')
        } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            navigateCommandHistory('down')
        }
    }

    function navigateCommandHistory(direction: 'up' | 'down') {
        if (commandHistory.length === 0) return

        let newIndex
        if (direction === 'up') {
            if (historyIndex === -1) newIndex = commandHistory.length - 1
            else if (historyIndex > 0) newIndex = historyIndex - 1
            else newIndex = historyIndex
        } else {
            if (historyIndex === -1 || historyIndex === commandHistory.length - 1) newIndex = -1
            else newIndex = historyIndex + 1
        }

        if (newIndex !== -1) setInput(commandHistory[newIndex])
        else setInput('')

        setHistoryIndex(newIndex)
    }

    return (
        <div className={`terminal-container ${isActive ? 'active' : ''}`} onClick={() => inputRef.current?.focus()}>
            <pre>{output}</pre>
            <div className="terminal-input-container">
                <span>{`${commandHandler.handle('').prefix} `}</span>
                <input className="terminal-input" ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleEnter} />
                <span className="caret">_</span>
                <span className="shadow" ref={shadowRef}>{input}</span>
            </div>
        </div>
    )
}
