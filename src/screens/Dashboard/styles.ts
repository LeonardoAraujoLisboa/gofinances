/* o arquivo é .ts pq nao vai ter renderização dos elementos dentro dele, eu vou importar eles em outro canto */
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Feather} from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DataListProps } from ".";
import { FlatList, FlatListProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;/* ele pega 42% da altura total da tela do celular */
    justify-content: center;
    align-items: flex-start;
    background-color: ${({theme}) => theme.colors.primary};
    flex-direction: row;
`

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 ${RFValue(24)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;

`

export const User = styled.View`
    margin-left: 17px;
`

export const UserGreeting = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    line-height: 24px;
`

export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    line-height: 24px;
`

export const LogoutButton = styled(BorderlessButton)`/* o BorderlessButton é para um ícone que nao tem borada nao tem fundo... */
     
`

export const IconLogout = styled(Feather)`/* eu deixo assim pois estou chamando uma biblioteca de icones do expo */
    color: ${({theme}) => theme.colors.secundary};
    font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({//esse attrs sao os atributos da scrollview q ja existem q eu posso colocar fazendo assim
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingLeft: 24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(25)}px;
`//tem q deixar essas aspas

export const Transaction = styled.View`
    flex: 1;
    padding: 0 ${RFValue(24)}px;
    margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.text_dark};
    line-height: 27px;
    padding-bottom: ${RFValue(16)}px;
`

export const TransactionList = styled(FlatList as new(props: FlatListProps<DataListProps>) => FlatList<DataListProps>).attrs({/* coloquei entre parenteses pq estou pegando a flatlist do react native agr e dando uma tipagem a ela */
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
        /* esse padding é para tirar do final do iphone que nem o top */
    }
})``

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`