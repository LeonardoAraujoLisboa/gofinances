import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import {Feather} from '@expo/vector-icons'
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler'

interface CategoryProps {
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`/* essa lib é pq o botão de fechar o modal nao estava funcionando no android e ai ela faz com q ele funcione em todas as plataformas. Ai eu coloco no container para envolver todo o componente mesmo */
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    line-height: ${RFValue(27)}px;
    color: ${({theme}) => theme.colors.shape};
`

export const Categorys = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    padding: 15px;
    background-color: ${({isActive}: CategoryProps) => isActive ? css`
        ${({theme}) => theme.colors.secundary_light}
    ` : css`
        ${({theme}) => theme.colors.background}
    `};
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.text_dark};
`

export const Footer = styled.View`
    padding: 24px;
`