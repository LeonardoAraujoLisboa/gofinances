import React from 'react'
import { Container, Icon, Title, Button } from './styles'
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
}

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

const TransactionTypeButton = ({type, title, isActive, ...rest}: Props) => {
  return (
    
    <Container isActive={isActive} type={type}>
      <GestureHandlerRootView>
        <Button {...rest}>
            <Icon name={icons[type]} type={type}/>
            <Title>{title}</Title>
          </Button>
      </GestureHandlerRootView>
    </Container>
    
  )
}

export default TransactionTypeButton