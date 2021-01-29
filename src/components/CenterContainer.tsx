import React from 'react'
import { Container } from 'react-bootstrap'

interface Props{
    children:React.ReactNode
}

const CenterContainer:React.FC<Props> = ({children}) => {
    console.log(children)
    return (
        <Container className="d-flex align-items-center justify-content-center appContainer">
        <div className="w-100 maxWidth-400">
            {children}
        </div>
    </Container>
    )
}

export default CenterContainer
