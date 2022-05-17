import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    
`

export const Header = styled.View`
    height: ${RFPercentage(70)}px;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`

export const TitleWrapper = styled.View`
    align-items: center;
    padding-bottom: 80px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    line-height: ${RFValue(40)}px;
    text-align: center;
    margin-top: 40px;
`

export const SigninTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    line-height: ${RFValue(24)}px;
    text-align: center;
    max-width: ${RFValue(190)}px;
    padding-bottom: 67px;
`

export const Footer = styled.View`
    height: 100%;
    background-color: ${({theme}) => theme.colors.secundary};
`

export const FooterWrapper = styled.View`
    padding: ${RFValue(0)}px ${RFValue(32)}px;
    margin-top: ${RFPercentage(-4)}px;
`