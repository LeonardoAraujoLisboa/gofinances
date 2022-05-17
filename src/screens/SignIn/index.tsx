import React, {useState} from 'react';
import { Container, Header, TitleWrapper, Title, SigninTitle, Footer, FooterWrapper } from './styles';
import AppleSvg from '../../assets/apple-icon.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';


const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const {signInWithGoogle, signInWithApple} = useAuth();
  const theme = useTheme()

  const handleSignInWithGoole = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.');
    }//eu poderia colocar um finally depois od catch (finally {}) ai é independente se deu certo ou erro, faça isso
  }/* la eu dei o throw error, joguei o erro e ai ele vai vir pra ca e eu posso tratar ele aqui */

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple.');
    }/* la eu dei o throw error, joguei o erro e ai ele vai vir pra ca e eu posso tratar ele aqui */
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleWrapper>
        <SigninTitle>Faça seu login com uma das contas abaixo</SigninTitle>
      </Header>
      <Footer>
        <FooterWrapper>
        <SignInSocialButton title='Entrar com Google' svg={GoogleSvg} onPress={handleSignInWithGoole} />
          {Platform.OS === 'ios' && <SignInSocialButton title='Entrar com Apple' svg={AppleSvg} onPress={handleSignInWithApple} />}
        </FooterWrapper>
        {isLoading && <ActivityIndicator color={theme.colors.shape} style={{marginTop: 18}} />}
      </Footer>
    </Container>
  )
}

export default SignIn