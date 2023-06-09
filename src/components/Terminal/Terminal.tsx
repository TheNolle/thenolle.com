import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CommandHandler from '../../other/ts/CommandHandler'
import { useHandleEnter } from '../../other/ts/utils'

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

    let savedCommandHistoryObject = localStorage.getItem('commandHistory')
    let commandHistoryObject = savedCommandHistoryObject && savedCommandHistoryObject !== '""' ? JSON.parse(savedCommandHistoryObject) : {}
    let initialCommandHistory = commandHistoryObject[name] || []

    const [commandHistory, setCommandHistory] = useState<string[]>(initialCommandHistory)
    const [historyIndex, setHistoryIndex] = useState<number>(-1)
    const [commandPrefix, setCommandPrefix] = useState<string>('')
    const location = useLocation()
    const navigate = useNavigate()
    const commandHandler = new CommandHandler()

    useEffect(() => {
        const savedOutputs = JSON.parse(localStorage.getItem('outputs') || '{}')
        if (Array.isArray(savedOutputs[name])) setOutput(savedOutputs[name].map(JSON.parse))
    }, [name])

    useEffect(() => {
        const savedOutputs = JSON.parse(localStorage.getItem('outputs') || '{}')
        savedOutputs[name] = safeStringify(output)
        localStorage.setItem('outputs', JSON.stringify(savedOutputs))
    }, [name, output])

    useEffect(() => {
        if (commandHistory[commandHistory.length - 1] === 'clear-history') setCommandHistory(['clear-history'])
        let updatedCommandHistoryObject = { ...commandHistoryObject }
        updatedCommandHistoryObject[name] = commandHistory
        localStorage.setItem('commandHistory', JSON.stringify(updatedCommandHistoryObject))
    }, [commandHistory])

    useEffect(() => {
        if (isActive) {
            handleCommandPrefix().then(setCommandPrefix)
            inputRef.current?.focus()
        }
    }, [isActive])

    useEffect(() => {
        if (!isActive && location.pathname !== '/') navigate('/')
    }, [isActive, location.pathname, navigate])

    useEffect(() => {
        const timer = setTimeout(() => scrollDivRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
        return () => clearTimeout(timer)
    }, [output])

    function safeStringify(obj: any) {
        const cache = new Set()
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.has(value)) return
                cache.add(value)
            }
            return value
        })
    }

    const handleKeyPress = useHandleEnter(input, commandHandler, setOutput, setInput, setCommandHistory, setHistoryIndex, commandHistory, historyIndex)

    const handleCommandPrefix = async () => {
        const { prefix } = await commandHandler.handle('')
        return prefix
    }

    return (
        <div ref={terminalContainerRef} className={`terminal-container ${isActive ? 'active' : ''}`} onClick={() => inputRef.current?.focus()}>
            <pre>{output}</pre>
            <div className="terminal-input-container">
                <span>{`${commandPrefix} `}</span>
                <input className="terminal-input" ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} />
            </div>
            <div ref={scrollDivRef}></div>
        </div>
    )
}
