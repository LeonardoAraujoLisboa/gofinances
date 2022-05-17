import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
    height: ${RFValue(113)}px;
    padding-bottom: ${RFValue(19)}px;
`

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    line-height: ${RFValue(27)}px;
`

export const Form = styled.View`
    flex: 1;
    padding: ${RFValue(24)}px;
    justify-content: space-between;
`

export const Fields = styled.View`

`

export const TransactionTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
`