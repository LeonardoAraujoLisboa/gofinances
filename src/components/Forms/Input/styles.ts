import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";

interface Props {
    active: boolean;
}

export const Container = styled(TextInput)<Props>`
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

    ${({active, theme}) => active && css`
        border-width: 3px;
        border-color: ${theme.colors.attention};
    `}
`