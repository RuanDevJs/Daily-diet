import { useTheme } from "styled-components/native";
import { StackActions, useNavigation } from "@react-navigation/native";

import Button from "@Components/Button";

import IlustrationPositive from "@assets/IlustrationPositive.svg";
import IlustrationNegative from "@assets/IlustrationNegative.svg";

import { Device } from "@Utils/Device";
import * as Styled from "./styled";

interface ModalProps {
  type: 'positive' | 'negative';
}

export default function Modal({ type = 'positive' }: ModalProps) {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleNavigation(){
    navigation.dispatch(StackActions.popToTop());
  }

  const UI = {
    title: type === 'positive' ? 'Continue assim!' : 'Que pena!',
    description: type === 'positive' ? 'Você continua dentro da dieta. Muito bem!' : 'Você saiu da dieta dessa vez, mas continue se esforçando e não desista!'
  }

  return (
    <Styled.Modal>
      <Styled.Container>
        <Styled.Title type={type}> {UI.title} </Styled.Title>
        {
          type === 'positive' ?
            <Styled.Description>
              Você continua
              <Styled.Description style={{ fontFamily: theme.FONT.bold }}> dentro da dieta. </Styled.Description>
              Muito bem!
            </Styled.Description>
            :
            <Styled.Description>
              Você
              <Styled.Description style={{ fontFamily: theme.FONT.bold }}> saiu da dieta. </Styled.Description>
              dessa vez, mas continue se esforçando e não desista!
            </Styled.Description>
        }
        <Styled.Wrap activeOpacity={0.72}>
          {
            type === 'positive' ?
            <IlustrationPositive />
            :
            <IlustrationNegative />
          }
        </Styled.Wrap>
          <Button
            title="Ir para a página inicial"
            activeOpacity={0.72}
            onPress={handleNavigation}
            style={{ marginTop: Device.width * 0.1 }}
          />
      </Styled.Container>
    </Styled.Modal>
  )
}
