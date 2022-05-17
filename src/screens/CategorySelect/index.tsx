import React from 'react'
import { FlatList } from 'react-native';
import Button from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Icon, Name, Categorys, Separator, Footer } from './styles'

interface Category {
  key: string;
  name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

const CategorySelect = ({category, setCategory, closeSelectCategory}: Props) => {

  const handlePress = (category: Category) => {
    setCategory(category);
  }

  return (
    <Container>
        <Header>
            <Title>Categoria</Title>
        </Header>
        <FlatList style={{flex: 1, width: '100%'}} data={categories} keyExtractor={(item) => item.key} renderItem={({item}) => (
          <Categorys onPress={() => handlePress(item)} isActive={category.key === item.key}>
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Categorys>
        )} ItemSeparatorComponent={() => <Separator />} />
        <Footer>
          <Button title='Selecionar' onPress={closeSelectCategory} />
        </Footer>
    </Container>
  )
}

export default CategorySelect