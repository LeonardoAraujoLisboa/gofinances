import React, { useCallback, useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadContainer } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';
import {VictoryPie} from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {addMonths, format, subMonths} from 'date-fns'
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export interface CategoryData {
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    key: string;
    percent: string
}

const Resume = () => {
    const [loading, setLoading] = useState<boolean>();
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const theme = useTheme();
    const {user} = useAuth();

    const handleDateChange = (action: 'next' | 'prev') => {
        if (action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1))
        } else {
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    const loadAllTransactions = async () => {
        try {
            setLoading(true);
            const dataKey = `@gofinances:transactions_user:${user.id}`;
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const expensives = currentData.filter((item: DataListProps) => {                
                return item.type === 'negative' && new Date(item.date).toLocaleString('pt-BR', {month: 'long', year: 'numeric'}) === format(selectedDate, 'MMMM, yyyy', {locale: ptBR}).replace(',', ' de')
            })
            console.log(expensives)
            console.log(selectedDate)
            const allExpensivesTotal = expensives.reduce((acumullator: number, expensive: DataListProps) => {
                return acumullator + Number(expensive.amount)
            }, 0)
            const totalByCategory: CategoryData[] = [];
            categories.forEach((category) => {
                let expensivesTotal = 0;
                expensives.forEach((expensive: DataListProps) => {
                    if (expensive.category === category.key) {
                        expensivesTotal += Number(expensive.amount)
                    }
                })
                if (expensivesTotal > 0) {
                    const percent = `${(expensivesTotal/allExpensivesTotal*100).toFixed(0)}%`//so uma casa decimal
                    totalByCategory.push({
                        name: category.name,
                        totalFormatted: expensivesTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
                        color: category.color,
                        key: category.key,
                        total: expensivesTotal,
                        percent
                    });
                }
            })
            setTotalByCategories(totalByCategory);
            setLoading(false);
        } catch(error) {
            setLoading(false);
            console.log(error);
        }
    }

    /* useEffect(() => {
        loadAllTransactions();
    }, [selectedDate]) nao precisa disso*/

    useFocusEffect(useCallback(() => {
        loadAllTransactions();
      }, [selectedDate]))

  return (
    <Container>
        <Header>
            <Title>Resumo por categoria</Title>
        </Header>
        { loading ?
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadContainer> :
        <>
            <Content showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 24, paddingBottom: useBottomTabBarHeight()}}>
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('prev')}>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButton>
                    <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>
                <ChartContainer>
                    <VictoryPie data={totalByCategories} colorScale={totalByCategories.map(item => item.color)} style={{labels:{ fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape}}} labelRadius={50} x='percent' y='total' /> 
                </ChartContainer>
                {totalByCategories.map((item) => (
                    <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color} /> 
                ))}
            </Content>
        </>
        }
    </Container>
  )
}

export default Resume