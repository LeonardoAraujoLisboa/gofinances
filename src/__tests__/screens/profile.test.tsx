import React from "react";
import {render} from '@testing-library/react-native'
import Profile from "../../screens/Profile";

describe('Grupo de Teste: Profile Screen', () => {
    it('should have placeholder correctly in user name input', () => {//esse "it" é so uma questao de semantica msm dos testes, poderia ter deixado test mesmo
        const {/* debug */ getByPlaceholderText} = render(<Profile />)//alem do debug, pode desetruturar ai dentro tbm 
        /* debug() */
    
        const inputName = getByPlaceholderText('Nome')//ai eu to querendo pegar o input q tem o placeholder='Nome'
        expect(inputName.props.placeholder).toBeTruthy()//esse expect é o q voce espera. Em cima eu peguei esse input e ai eu boto dentro desse expect pq eu espero q exista esse placeholder pra ver se ele passa no teste, pra ver se é verdadeiro (toBeTruthy)
        expect(inputName).toBeTruthy()//pode ser somente assim
    })//primeiro parametro é o nome do teste e o segundo é a função q ela deve rodar
    
    it('sould be loaded user data', () => {
        const {getByTestId} = render(<Profile />)
    
        const inputName = getByTestId('input-name')
        const inputSurname = getByTestId('input-surname')
    
        expect(inputName.props.value).toEqual('Leonardo')
        expect(inputSurname.props.value).toEqual('Lisboa')
    })
    
    it('should exist title correctly', () => {
        const {getByTestId} = render(<Profile />)
    
        const textTitle = getByTestId('text-title')
    
        expect(textTitle.props.children).toContain('Perfil')//to contain é o conteúdo q tem no text
    })
})