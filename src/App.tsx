import React from 'react'
import Navbar from './components/Navbar'
import { FaPatreon } from 'react-icons/fa6'

export default function App(): React.ReactElement {
    const links = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact', disabled: true }
    ]

    return (
        <>
            <Navbar
                name='React App'
                logo='/favicon.ico'
                links={links}
                special={{ name: 'Patreon', tooltip: 'Sponsor me on Patreon!', url: 'https://patreon.com/_nolly', icon: <FaPatreon />, color: '#ffd1dc' }}
            />
        </>
    )
}