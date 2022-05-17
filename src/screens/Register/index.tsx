import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../components/Forms/Button'
import CategorySelectButton from '../../components/Forms/CategorySelectButton'
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton'
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles'
import CategorySelect from '../CategorySelect'
import { useForm } from 'react-hook-form'
import InputForm from '../../components/Forms/InputForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native'
import { useAuth } from '../../hooks/auth';

type FormData = {
  name: string;
  amount: number;
}

type NavigationProps = {
  navigate: (screen: string) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório.'),
  amount: Yup.number().typeError('Informe um valor numérico.').positive('O valor não pode ser negativo.').required('O valor é obrigatório.')
})/* eu to tipando o meu formulário. O nome tem q ser uma string, tem q ser obrigatório e vai aparecer essa msg */

const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const navigation = useNavigation<NavigationProps>()
  const {control, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(schema)});
  const {user} = useAuth()

  const handleRegister = async (form: FormData | any) => {
    if(!transactionType) {
      return Alert.alert('Selecione um tipo de transação.');
    } else if(category.key === 'category') {
      return Alert.alert('Selecione uma categoria.');
    } else {
      const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: category.key,
        date: new Date()
      }
      try {
        /* const dataKey = '@gofinances:transactions'; */
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];
        const dataFormatted = [
          ...currentData,
          newTransaction
        ]/* sem eu fazer essas tres coisas ai ele tava subescrevendo o que to enviando, ai desse jeito ele nao subescreve mais */
        const jsonAux = JSON.stringify(dataFormatted)
        await AsyncStorage.setItem(dataKey, jsonAux)
        setTransactionType('');
        setCategory({
          key: 'category',
          name: 'Categoria'
        })
        reset();
        navigation.navigate('Listagem');
      } catch(error) {
        console.log(error);
        Alert.alert('Não foi possível salvar.');
      }/* é bom fazer um try catch para isso */
    }
  }

  useEffect(() => {
    /* const loadData = async () => {
      const data = await AsyncStorage.getItem('@gofinances:transactions');
      console.log(JSON.parse(data!)) *///essa exclamação é tipo: pode confiar em mim, sempre vai ter alguma coisa nesse data 
    /* }
    loadData(); */
    async function removeAll() {
      await AsyncStorage.removeItem('@gofinances:transactions')
    }
    removeAll(); //ai eu to limpando a aplicação
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{/* essas coisas ai tudo é para quando eu clicar em qualquer lugar fora o teclado irá fechar */}
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm name="name" control={control} placeholder='Nome' autoCapitalize='sentences' autoCorrect={false} error={errors.name && errors.name.message} />
            <InputForm name="amount" control={control} placeholder='Preço' keyboardType='numeric' error={errors.amount && errors.amount.message} />
            <TransactionTypes>
              <TransactionTypeButton title='Income' type='up' onPress={() => setTransactionType('positive')} isActive={transactionType === 'positive'}/> 
              <TransactionTypeButton title='Outcome' type='down' onPress={() => setTransactionType('negative')} isActive={transactionType === 'negative'}/>
            </TransactionTypes>
            <CategorySelectButton title={category.name} onPress={() => setCategoryModal(true)}/>
          </Fields>
          <Button title='Enviar' onPress={handleSubmit(handleRegister)}/>
        </Form>
        <Modal visible={categoryModal}>{/* ele ja aparece pq o padrão é verdadeiro */}
          <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={() => setCategoryModal(false)/* handleCloseSelectCategory */}/>
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default Register

//não há className em react native