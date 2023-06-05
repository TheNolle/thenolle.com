import React, { useEffect, useRef, useState } from 'react'
import CommandHandler from '../../commands/CommandHandler'

import './Terminal.scss'

export default function Terminal(): JSX.Element {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const shadowRef = useRef<HTMLSpanElement | null>(null)
    const [commandHandler, setCommandHandler] = useState(new CommandHandler())
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        if (shadowRef.current && inputRef.current) inputRef.current.style.width = `${shadowRef.current.offsetWidth}px`
    }, [input])

    function handleEnter(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault()

            const { prefix, output: commandOutput } = commandHandler.handle(input)
            const formattedOutput = `${prefix} ${input}\n${commandOutput}`

            if (input.trim() === 'clear') setOutput('')
            else setOutput((prevOutput) => prevOutput ? `${prevOutput}\n${formattedOutput}` : formattedOutput)

            setInput('')
        }
    }

    return (
        <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
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
