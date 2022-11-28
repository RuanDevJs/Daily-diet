import React from 'react'
import { useNavigation } from '@react-navigation/native';

import * as Styled from "./styles";

export default function Statistic() {
  const navigation = useNavigation();

  function handleNavigation(){
    navigation.navigate('Home');
  }

  return (
    <Styled.Container>
      <Styled.Title>90,86%</Styled.Title>
      <Styled.Description>das refeições dentro da dieta</Styled.Description>
      <Styled.Statistic>
        <Styled.StatisticTitle>Estatísticas gerais</Styled.StatisticTitle>
        <Styled.Data activeOpacity={0.82}>
          <Styled.DataTitle>90,86%</Styled.DataTitle>
          <Styled.DataDescription>Melhor sequência {'\n'} de pratos dentro da dieta</Styled.DataDescription>
        </Styled.Data>
        <Styled.Data activeOpacity={0.82}>
          <Styled.DataTitle>109</Styled.DataTitle>
          <Styled.DataDescription>Refeições registradas</Styled.DataDescription>
        </Styled.Data>
        <Styled.Info>
          <Styled.InfoWrap active>
            <Styled.InfoWrapTitle>99</Styled.InfoWrapTitle>
            <Styled.InfoWrapDescription>refeições dentro da dieta</Styled.InfoWrapDescription>
          </Styled.InfoWrap>
          <Styled.InfoWrap>
            <Styled.InfoWrapTitle>10</Styled.InfoWrapTitle>
            <Styled.InfoWrapDescription>refeições fora da dieta</Styled.InfoWrapDescription>
          </Styled.InfoWrap>
        </Styled.Info>
      </Styled.Statistic>
      <Styled.BackButtonTouchable onPress={handleNavigation} activeOpacity={0.5}>
        <Styled.BackIcon />
      </Styled.BackButtonTouchable>
    </Styled.Container>
  )
}
