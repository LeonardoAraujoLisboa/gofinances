import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secundary};
    height: ${RFValue(56)}px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};
`