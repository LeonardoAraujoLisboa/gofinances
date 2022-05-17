import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import {RectButton} from 'react-native-gesture-handler'

interface TypeProps {
    type: 'up' | 'down';
    isActive: boolean;
}

export const Container = styled.View`/* o RectButton é para um botão normal mesmo */
    width: 48%;
    height: ${RFValue(56)}px;
    border-radius: 5px;
    ${({isActive, type}: TypeProps) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.success_light};
        border: none;
    `}
    ${({isActive, type}: TypeProps) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light};
        border: none;
    `}
`

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1.5px solid ${({theme}) => theme.colors.text};
    height: ${RFValue(56)}px;
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    ${({type}: TypeProps) => type === 'up' ? css`
        color: ${({theme}) => theme.colors.success};
    ` : css`
        color: ${({theme}) => theme.colors.attention};
    `};
`

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    line-height: ${RFValue(21)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.title};
`