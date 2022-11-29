import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Styled from "./styles";
interface RouteParams {
  data: {
    percent: number;
    foodsRegistered: number;
    foodsInDiet: number;
    foodOutOfDiet: number;
  }
}

export default function Statistic() {
  const { data } = useRoute().params as RouteParams;
  const navigation = useNavigation();

  const formatedPercentage = data.percent * 100;

  function handleNavigation() {
    navigation.navigate('Home');
  }

  return (
    <Styled.ScrollContainer
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Styled.Container active={data.percent > 0.3}>
        <Styled.Title>{formatedPercentage}%</Styled.Title>
        <Styled.Description>das refeições dentro da dieta</Styled.Description>
        <Styled.Statistic>
          <Styled.StatisticTitle>Estatísticas gerais</Styled.StatisticTitle>
          <Styled.Data activeOpacity={0.82}>
            <Styled.DataTitle>90,86%</Styled.DataTitle>
            <Styled.DataDescription>Melhor sequência {'\n'} de pratos dentro da dieta</Styled.DataDescription>
          </Styled.Data>
          <Styled.Data activeOpacity={0.82}>
            <Styled.DataTitle>{data.foodsRegistered}</Styled.DataTitle>
            <Styled.DataDescription>Refeições registradas</Styled.DataDescription>
          </Styled.Data>
          <Styled.Info>
            <Styled.InfoWrap active>
              <Styled.InfoWrapTitle>{data.foodsInDiet}</Styled.InfoWrapTitle>
              <Styled.InfoWrapDescription>refeições dentro da dieta</Styled.InfoWrapDescription>
            </Styled.InfoWrap>
            <Styled.InfoWrap>
              <Styled.InfoWrapTitle>{data.foodOutOfDiet}</Styled.InfoWrapTitle>
              <Styled.InfoWrapDescription>refeições fora da dieta</Styled.InfoWrapDescription>
            </Styled.InfoWrap>
          </Styled.Info>
        </Styled.Statistic>
        <Styled.BackButtonTouchable onPress={handleNavigation} activeOpacity={0.5}>
          <Styled.BackIcon active={data.percent > 0.3} />
        </Styled.BackButtonTouchable>
      </Styled.Container>
    </Styled.ScrollContainer>
  )
}
