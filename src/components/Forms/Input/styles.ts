import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TextInput.attrs({
    placeholderTextColor: `#969CD2`
})`
    background-color: ${({theme}) => theme.colors.shape};
    margin-bottom: 8px;
    width: 100%;
    height: ${RFValue(56)}px;
    border-radius: 5px;
    padding-left: ${RFValue(16)}px;
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text_dark};
    font-family: ${({theme}) => theme.fonts.regular};
    line-height: ${RFValue(21)}px;
`