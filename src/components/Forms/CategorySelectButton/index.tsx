import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Container, Category, Icon } from './styles'
import {RectButtonProps} from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
    title: string
    onPress: () => void
}

const CategorySelectButton = ({title, onPress, testID}: Props) => {
  return (
    <GestureHandlerRootView testID={testID}>
      <Container onPress={onPress}>
          <Category>{title}</Category>
          <Icon name="chevron-down"/>
      </Container>
    </GestureHandlerRootView>
  )
}

export default CategorySelectButton