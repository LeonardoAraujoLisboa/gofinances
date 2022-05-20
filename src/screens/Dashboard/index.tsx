import React, { useCallback, useEffect, useState } from 'react'
import {ActivityIndicator} from 'react-native'
import {Container, Header, UserInfo, Photo, User, UserGreeting, UserName, IconLogout, HighlightCards, UserWrapper, Transaction, Title, TransactionList, LogoutButton, LoadContainer } from './styles';
import HighlightCard from '../../components/HighlightCard'
import TransactionCard, {TransactionCardProps} from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

const Dashboard = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  const {SingOut, user} = useAuth()

  const getLastTransactionDate = (collection: DataListProps[], type: 'positive' | 'negative') => {
    const collectionFilttered = collection.filter((item) => {
      return item.type === type
    })
    if (collectionFilttered.length === 0) {
      return 0;
    } else {
      const lastTransactions = new Date(Math.max.apply(Math, collectionFilttered.map((item) => {
        return new Date(item.date).getTime()//esse new date é pq ele vem como uma data so q como string com as aspas ai ele tira as aspas, depois timestamp e pega o maior e dps transforma para uma data dnv
       })))
       return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long'})}`
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)
      let entriesTotal = 0;
      let expensiveTotal = 0;
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const response = await AsyncStorage.getItem(dataKey);
      const dataTransactions = response ? JSON.parse(response) : [];
      const transactionsFormatted = dataTransactions.map((item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }
        const data = {
          id: item.id,
          name: item.name,
          amount: Number(item.amount).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
          date: Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit'}).format(new Date(item.date)),
          type: item.type,
          category: item.category
        }
        return data
      })
      setData(transactionsFormatted)
      const lastEntriesDate = getLastTransactionDate(dataTransactions, 'positive');     
      const lastExpensivesDate = getLastTransactionDate(dataTransactions, 'negative'); 
      const totalInterval = `${lastExpensivesDate ? `01 a ${lastExpensivesDate}` : 'Não há transações'}`  
      setHighlightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
          lastTransaction: `${lastEntriesDate ? `Última entrada dia ${lastEntriesDate}` : 'Não há transações'}`
        },
        expensives: {
          amount: expensiveTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
          lastTransaction: `${lastExpensivesDate ? `Última saída dia ${lastExpensivesDate}` : 'Não há transações'}`

        },
        total: {
          amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
          lastTransaction: totalInterval
        }
      })  
      setLoading(false)
    } catch(error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    loadData();
  }, [])/* colocando data ai funcionou, mas vou utilizar o useFocusEffect, ele é chamado quando a tela entra em foco */

  useFocusEffect(useCallback(() => {
    loadData();
  }, []))

  return (
    <Container>
      { loading ? 
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadContainer> :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{uri: `${user.photo}`}}/>
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={SingOut}>
                <IconLogout name="power"/>
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards /* horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 24}} eu posso deixar ai ou no styles*/>
            <HighlightCard type='up' title='Entradas' amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction} />
            <HighlightCard type='down' title='Saídas' amount={highlightData.expensives.amount} lastTransaction={highlightData.expensives.lastTransaction}/>
            <HighlightCard type='total' title='Total' amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} />
          </HighlightCards>
          <Transaction>
            <Title>Listagem</Title>
            <TransactionList data={data} keyExtractor={item => item.id} renderItem={({item}) => <TransactionCard data={item}/>}/>
          </Transaction>
        </>
      }
    </Container>
  )
}

export default Dashboard