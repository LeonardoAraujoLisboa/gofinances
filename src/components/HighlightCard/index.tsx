import React from 'react'
import { Container, Header, Icon, Title, Footer, Amount, LastTransaction } from './style'

export interface PropsHighlight {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

function HighlightCard({title, amount, lastTransaction, type}: PropsHighlight) {
  return (
    <Container type={type}>
        <Header>
            <Title type={type}>{title}</Title>
            <Icon name={icon[type]} type={type}/>
        </Header>
        <Footer>
            <Amount type={type}>{amount}</Amount>
            <LastTransaction type={type}>{lastTransaction}</LastTransaction>
        </Footer>
    </Container>
  )
}

export default HighlightCard