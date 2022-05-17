import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: 'up' | 'down' | 'total';
}/* posso criar esse dai ou importar o la do index */

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    margin-right: ${RFValue(16)}px /* ${RFValue(24)}px posso deixar ai ou colocar la no dashboard em highlightscards*/;
    padding: ${RFValue(18)}px ${RFValue(22)}px ${RFValue(42)}px ${RFValue(22)}px;
    ${({type}: TypeProps) => type === 'total' ? css`
        background-color: ${({theme}) => theme.colors.secundary};
    ` : css`
        background-color: ${({theme}) => theme.colors.shape};
    `}
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    line-height: ${RFValue(21)}px;
    ${({type}: TypeProps) => type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `}
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(40)}px;
    ${({type}: TypeProps) => type === 'up' && css`
        color: ${({theme}) => theme.colors.success};
    `};
    ${({type}: TypeProps) => type === 'down' && css`
        color: ${({theme}) => theme.colors.attention};
    `};
    ${({type}: TypeProps) => type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};
`

export const Footer = styled.View`

`

export const Amount = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    line-height: ${RFValue(48)}px;
    ${(props: TypeProps) => props.type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `}
`

export const LastTransaction = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    line-height: ${RFValue(18)}px;
    ${(props: TypeProps) => props.type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `}
`