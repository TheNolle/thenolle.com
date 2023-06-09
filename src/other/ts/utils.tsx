import React, { useEffect, useCallback } from 'react'
import CommandHandler from './CommandHandler'

export function useFocusInput(isActive: boolean, inputRef: React.RefObject<HTMLInputElement | null>): void {
    useEffect(() => {
        if (isActive) {
            inputRef.current?.focus()
        }
    }, [isActive, inputRef])
}

export function useInputWidth(input: string, inputRef: React.RefObject<HTMLInputElement | null>, shadowRef: React.RefObject<HTMLSpanElement | null>): void {
    useEffect(() => {
        if (shadowRef.current && inputRef.current) {
            inputRef.current.style.width = `${shadowRef.current.offsetWidth}px`
        }
    }, [input, inputRef, shadowRef])
}

export function useNavigation(isActive: boolean, location: any, navigate: any): void {
    useEffect(() => {
        if (!isActive && location.pathname !== '/') {
            navigate('/')
        }
    }, [isActive, location.pathname, navigate])
}

export function useHandleEnter(input: string, commandHandler: CommandHandler, setOutput: React.Dispatch<React.SetStateAction<React.ReactNode>>, setInput: React.Dispatch<React.SetStateAction<string>>, setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>, setHistoryIndex: React.Dispatch<React.SetStateAction<number>>, commandHistory: string[], historyIndex: number): (event: React.KeyboardEvent) => void {
    return useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault()

            commandHandler.handle(input).then(({ prefix, output: commandOutput }) => {
                if (input.trim() === 'clear') setOutput('')
                else {
                    setOutput((prevOutput) => <>
                        {prevOutput}
                        <div>{`${prefix} ${input}`}</div>
                        <div className="command-output">{commandOutput}</div>
                    </>)
                }

                setInput('')
                setCommandHistory((prevHistory) => [...prevHistory, input])
                setHistoryIndex(-1)
            })
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            navigateCommandHistory('up', setHistoryIndex, commandHistory, setInput, historyIndex)
        } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            navigateCommandHistory('down', setHistoryIndex, commandHistory, setInput, historyIndex)
        }
    }, [input, commandHandler, setOutput, setInput, setCommandHistory, setHistoryIndex, commandHistory, historyIndex])
}

export function navigateCommandHistory(direction: 'up' | 'down', setHistoryIndex: React.Dispatch<React.SetStateAction<number>>, commandHistory: string[], setInput: React.Dispatch<React.SetStateAction<string>>, historyIndex: number): void {
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
