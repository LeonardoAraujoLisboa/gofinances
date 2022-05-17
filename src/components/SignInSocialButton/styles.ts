import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.shape};
    margin-bottom: 16px;
    border-radius: 5px;
    height: ${RFValue(56)}px;
`

export const ImageContainer = styled.View`
    padding-left: ${RFValue(16)}px;
`

export const Title = styled.Text`
    margin: 0 auto;
    /* flex: 1;
    text-align: center; ou pode ser assim para centralizar o texto tbm, dando flex 1 ele ocupa todo o espaço do botão e ai consegue centralizar dando text-align*/
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    line-height: ${RFValue(21)}px;
    color: ${({theme}) => theme.colors.text_dark};
`