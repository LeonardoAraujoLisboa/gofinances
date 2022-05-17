import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    margin-bottom: 8px;
    flex-direction: row;
    justify-content: space-between;
    padding: ${RFValue(13)}px ${RFValue(20)}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${({color}) => color};
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.title};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(22.5)}px;
`

export const Amount = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.title};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(22.5)}px;
`