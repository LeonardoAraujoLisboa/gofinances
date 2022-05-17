import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Button, ImageContainer, Title } from './styles';
import {SvgProps} from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>//o React.FC é dizendo que ele é um componente do tipo SvgProps
}

function SignInSocialButton({title, svg: Svg, ...rest}: Props) {//eu uso o svg assim como propriedade mas ai dentro eu passo para Svg 
  return (
    <Button {...rest}>
        <ImageContainer>
            <Svg width={RFValue(24)} height={RFValue(24)} />
        </ImageContainer>
        <Title>{title}</Title>
    </Button>
  )
}

export default SignInSocialButton