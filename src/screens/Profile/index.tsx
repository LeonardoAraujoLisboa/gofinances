import React from 'react'
import {View, Text, TextInput, Button} from 'react-native'

const Profile = () => {
  return (
    <View>
        <Text testID='text-title'>Perfil</Text>
        <TextInput placeholder='Nome' autoCorrect={false} testID="input-name" value='Leonardo' />
        <TextInput placeholder='Sobrenome' testID='input-surname' value='Lisboa' />
        <Button title='Salvar' onPress={() => {}} />
    </View>
  )
}

export default Profile