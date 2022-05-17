import React from 'react'
import { categories } from '../../utils/categories';
import { Container, Header, Title, Amount, Footer, Icon, CategoryName, TransactionDate, Category } from './styles'

export interface TransactionCardProps {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface PropsTransaction {
    data: TransactionCardProps
}

const TransactionCard = ({data}: PropsTransaction) => {
    const category = categories.filter((item) => {
        return item.key === data.category
    })[0]/* ai eu ja to pegando a primeira posição ai nao precisa colocar o index 0 la no icon e no nome da categoria */

  return (
    <Container>
        <Header>
            <Title>{data.name}</Title>
            <Amount type={data.type}>{data.type === 'negative' ? `- ${data.amount}` : `${data.amount}`}</Amount>
        </Header>
        <Footer>
            <Category>
                <Icon name={category.icon}/>
                <CategoryName>{category.name}</CategoryName>
            </Category>
            <TransactionDate>{data.date}</TransactionDate>
        </Footer>
    </Container>
  )
}

export default TransactionCard