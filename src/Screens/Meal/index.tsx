import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

import { Device } from '@Utils/Device';
import { useTheme } from 'styled-components/native';

import CustomButton from '@Components/CustomButton';

import { deleteMeal } from '@Storage/Meals';
import * as Styled from "./styled";

interface useRouteProps {
  DATE: string;
  MEAL: {
    time: string;
    title: string;
    description: string;
    isInDiet: boolean;
  };
};

export default function Meal() {
  const theme = useTheme();
  const meal = useRoute().params as useRouteProps;

  const navigation = useNavigation();

  const colors = {
    background: meal.MEAL.isInDiet ? theme.COLORS.green_light : theme.COLORS.red_light,
    color: meal.MEAL.isInDiet ? theme.COLORS.green_dark : theme.COLORS.red_dark,
  }

  function goBack() {
    navigation.navigate('Home');
  }

  async function onDelete(){
    try {
      await deleteMeal(meal);
      goBack();
    } catch(error){
      console.log(error);
    }
  }

  return (
    <Styled.Container style={{ backgroundColor: colors.background }}>
      <Styled.Title>Refeição</Styled.Title>
      <Styled.Content>
        <Styled.Wrap>
          <Styled.ContentTitle>{meal.MEAL.title}</Styled.ContentTitle>
          <Styled.ContentDescription>{meal.MEAL.description}</Styled.ContentDescription>
        </Styled.Wrap>
        <Styled.Wrap>
          <Styled.ContentTitle>Data e hora</Styled.ContentTitle>
          <Styled.ContentDescription>{meal.DATE} às {meal.MEAL.time}</Styled.ContentDescription>
        </Styled.Wrap>
        <Styled.Wrap>
          <Styled.ContentStatus activeOpacity={0.72}>
            <Styled.StatusCircle style={{ backgroundColor: colors.color }} />
            <Styled.ContentDescription>
              {meal.MEAL.isInDiet ? 'dentro da dieta' : 'fora da dieta'}
            </Styled.ContentDescription>
          </Styled.ContentStatus>
        </Styled.Wrap>

        <Styled.Wrap
          style={{
            width: '100%',
            height: Device.width * 0.7,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CustomButton style={{ width: '80%' }}>
            <Styled.EditIcon />
            <Styled.ButtonTitle>Editar refeição</Styled.ButtonTitle>
          </CustomButton>
          <CustomButton
            style={{
              width: '80%', backgroundColor: theme.COLORS.white,
              borderWidth: 1.5,
            }}
            onPress={onDelete}
          >
            <Styled.DeleteIcon />
            <Styled.ButtonTitle
              style={{ color: theme.COLORS.gray_100 }}
            >
              Excluir refeição
            </Styled.ButtonTitle>
          </CustomButton>
        </Styled.Wrap>
      </Styled.Content>
      <Styled.BackButton onPress={goBack}>
        <Styled.BackButtonIcon />
      </Styled.BackButton>
    </Styled.Container>
  )
}
