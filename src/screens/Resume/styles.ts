import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {BorderlessButton} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

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

export const Content = styled.ScrollView.attrs({
    
})`
`

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
`
export const MonthSelectButton = styled(BorderlessButton)`

`
export const MonthSelectIcon = styled(Feather)`
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(24)}px;
`
export const Month = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
    line-height: ${RFValue(30)}px;
    text-transform: capitalize;
`

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`