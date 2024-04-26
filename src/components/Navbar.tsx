import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import './Navbar.scss'

interface NavbarProps {
    logo: string
    name: string
    links: NavbarLink[]
    special?: NavbarSpecial
}

interface NavbarLink {
    disabled?: boolean
    name: string
    path: string
}

interface NavbarSpecial {
    name: string
    icon: React.ReactElement
    url: string
    tooltip?: string
    color?: `#${string}`
}

export default function Navbar({ logo, name, links, special }: NavbarProps): React.ReactElement {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav className="navbar-component">
            <div className="content">
                <img src={logo} alt={name} tabIndex={0} onClick={() => navigate('/')} title='Navigate back home' className="logo" />
                <div className="links">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={!link.disabled ? link.path : location.pathname}
                            className={`link ${link.disabled ? 'disabled' : ''} ${location.pathname === link.path ? 'active' : ''}`}
                            title={link.disabled ? 'Coming soon!' : undefined}
                            tabIndex={link.disabled ? -1 : undefined}
                            aria-disabled={link.disabled ? true : undefined}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                {special && (
                    <a
                        href={special.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={special.tooltip}
                        style={{ '--special-color': special.color }}
                        className="special"
                        aria-label={`${special.name} - ${special.tooltip}`}
                    >
                        {special.icon}
                    </a>
                )}
            </div>
        </nav>
    )
}

declare module 'react' {
    interface CSSProperties {
        '--special-color'?: string
    }
}