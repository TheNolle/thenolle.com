import React from 'react'

export default {
    name: 'img',
    description: 'Display a random image',
    usage: 'img',
    async execute(): Promise<JSX.Element> {
        return <img src={`https://picsum.photos/600?random=${Math.random()}`} />
    },
}
