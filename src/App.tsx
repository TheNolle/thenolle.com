import React from 'react'

import Button from './components/Button'

export default function App(): React.ReactElement {
    return (
        <table>
            <caption>Button Component</caption>
            <thead>
                <tr>
                    <th>Designs</th>
                    <th>Sizes</th>
                    <th>Shapes</th>
                    <th>Variants</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Button design='primary'>primary button</Button>
                    </td>
                    <td>
                        <Button size='tiny'>tiny button</Button>
                    </td>
                    <td>
                        <Button shape='squared'>squared button</Button>
                    </td>
                    <td>
                        <Button variant='normal'>normal button</Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button design='secondary'>secondary button</Button>
                    </td>
                    <td>
                        <Button size='small'>small button</Button>
                    </td>
                    <td>
                        <Button shape='rounded'>rounded button</Button>
                    </td>
                    <td>
                        <Button variant='outline'>outline button</Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button design='tertiary'>tertiary button</Button>
                    </td>
                    <td>
                        <Button size='medium'>medium button</Button>
                    </td>
                    <td>
                        <Button shape='pill'>pill button</Button>
                    </td>
                    <td>
                        <Button variant='ghost'>ghost button</Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button design='success'>success button</Button>
                    </td>
                    <td>
                        <Button size='large'>large button</Button>
                    </td>
                    <td>
                        <Button shape='default'>default button</Button>
                    </td>
                    <td>
                        <Button variant='text'>text button</Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button design='danger'>danger button</Button>
                    </td>
                    <td>
                        <Button size='huge'>huge button</Button>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <Button design='warning'>warning button</Button>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <Button design='info'>info button</Button>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <Button design='disabled'>disabled button</Button>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}