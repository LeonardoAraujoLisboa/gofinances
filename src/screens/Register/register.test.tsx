import React from 'react'
import Register from '.'
import {render, fireEvent, waitFor} from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/styles/theme'

const Providers = ({children}:any) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

jest.mock('expo-apple-authentication', () => {})

describe('Register Screen', () => {
    it('should be open category modal when user click on button', async () => {
        const {getByTestId} = render(
            <Register />,
            {
                wrapper: Providers
            }
        )

        const categoryModal = getByTestId('modal-category')
        const buttonCategory = getByTestId('button-category')
        fireEvent.press(buttonCategory)//esse é um teste clicando no botao

        await waitFor(() => {//isso é pra rodar testes asyncronos, uma api e talls, tem que colocar esse waitfor
            expect(categoryModal.props.visible).toBeTruthy()//o teste passa assim, pois o modal começa como falso. 
        })
    })
})