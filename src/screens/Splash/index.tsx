import React, { useEffect } from 'react';
import {Container} from './styles';
import LogoSvg from '../../assets/logo.svg'
import Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const splashAnimation = useSharedValue(0) // do 0 -> até 50

    const navigation = useNavigation<any>()

    const brandStyle = useAnimatedStyle(() => {
        return  {
            opacity: interpolate(splashAnimation.value, 
                [0, 50], /* consegue interpolar as etapas da sua animação */
                [1, 0], /* e ai vc coloca o valor de cada etapa q vc colocou no array de cima */
                Extrapolate.CLAMP /* isso é pra ele nunca ultrapassar o limite */
                /* RESUMINDO QUANDO O VALOR DO SPLASH FOR 0 A OPACIDADE VAI SER 1 E ASSIM POR DIANTE E O INTERPOLATE FAZ ISSO GRADATIVAMENTE*/
            )
        }
    })

    const startApp = () => {
        navigation.navigate('SignIn')
    }

    useEffect(() => {
        splashAnimation.value = withTiming(50, {duration: 1000}, () => {
            'worklet'/* para que possa navegar quando terminar a animação */
            runOnJS(startApp)() 
        })
    }, [])

   return (
      <Container>
        <Animated.View style={[brandStyle, {position: 'absolute'}]}>
            <LogoSvg width={80} height={50} />
        </Animated.View>
      </Container>
   );
}

export default Splash;