import React from 'react'
import Register from '.'
import {render, fireEvent} from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/styles/theme'

const Providers = ({children}:any) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Register Screen', () => {
    it('should be open category modal when user click on button', () => {
        const {getByTestId} = render(
            <Register />,
            {
                wrapper: Providers
            }
        )

        const categoryModal = getByTestId('modal-category')
        const buttonCategory = getByTestId('button-category')
        fireEvent.press(buttonCategory)

        expect(categoryModal.props.visible).toBeTruthy()//o teste passa assim, pois o modal começa como falso. Agora vou fazer um teste clicando no botao
    })
})