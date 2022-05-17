import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: 'positive' | 'negative';
}

export const Container = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    padding: ${RFValue(17)}px ${RFValue(24)}px ${RFValue(18)}px ${RFValue(24)}px;
    margin-bottom: ${RFValue(16)}px;
`

export const Header = styled.View`
    padding-bottom: ${RFValue(19)}px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    line-height: 21px;
    color: ${({theme}) => theme.colors.title};
`

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    line-height: 30px;
    ${({type}: TypeProps) => type === 'positive' ? css`
        color: ${({theme}) => theme.colors.success};
    ` : css`
        color: ${({theme}) => theme.colors.attention};
    `}
`

export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.text};
`

export const CategoryName = styled.Text`
    margin-left: ${RFValue(17)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    line-height: ${RFValue(21)}px;
`

export const TransactionDate = styled.Text`
    margin-left: ${RFValue(17)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    line-height: ${RFValue(21)}px;
`