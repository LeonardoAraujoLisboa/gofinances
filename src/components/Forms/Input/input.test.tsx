import React from "react";
import {render} from '@testing-library/react-native'
import Input from ".";
import {ThemeProvider} from 'styled-components/native'
import theme from '../../../global/styles/theme'

const Providers = ({children}:any) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('Input Component', () => {
    it('must have specific border color when active', () => {
        const {getByTestId} = render(
            <Input testID="input-email" placeholder="E-mail" keyboardType="email-address" autoCorrect={false} active={true} />,
            {
                wrapper: Providers
            }//posso colocar essa wrapper q é um embrulho, o que vai por volta do meu input
        )//eu posso dar propriedades ai pq la no componente eu passei as propriedades
        const inputComponent = getByTestId('input-email')

        expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention)
        expect(inputComponent.props.style[0].borderWidth).toEqual('3')
    })
})

/* Quando eu rodo o teste ele dar erro pois nao existe o theme provider ele nao reconhece a font a cor e assim por diante */