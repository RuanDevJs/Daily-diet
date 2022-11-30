import React, { useState } from 'react'
import { Keyboard } from 'react-native';

import { Device } from '@Utils/Device';
import DatePicker, { Event } from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import * as Styled from "./styles";

export default function Form() {
  const [date] = useState(new Date());
  const [time] = useState(new Date());


  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleDate(event: Event, datePicked: Date | undefined) {
    if (Device.plataform === 'android') {
      setShowDatePicker(oldValue => !oldValue)
    }

    if (datePicked !== undefined) {
      const parsedDate = format(datePicked, 'd.MM.y')
      setSelectedDate(parsedDate)
    }
  }

  function handleTime(event: Event, timePicked: Date | undefined) {
    if (Device.plataform === 'android') {
      setShowTimePicker(oldValue => !oldValue)
    }

    if (timePicked !== undefined) {
      const formatedTime = `${timePicked.getHours()}:${timePicked.getMinutes()}`;
      setSelectedTime(formatedTime)
    }
  }

  return (
    <Styled.TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Styled.Container>
        <Styled.Title>Nova refeição</Styled.Title>
        <Styled.Form>
          <Styled.FormWrap>
            <Styled.Label>Nome</Styled.Label>
            <Styled.Input
              keyboardType='default'
            />
          </Styled.FormWrap>
          <Styled.FormWrap>
            <Styled.Label>Descrição</Styled.Label>
            <Styled.Input
              keyboardType='default'
              numberOfLines={4}
              multiline={true}
              style={{
                textAlignVertical: 'top'
              }}
            />
          </Styled.FormWrap>
          <Styled.FormRow>
            <Styled.FormWrap
              style={{ width: '45%', marginRight: 35 }}
              onPress={() => setShowDatePicker(true)}
            >
              <Styled.Label>Data</Styled.Label>
              <Styled.Input
                value={selectedDate}
              />
              {showDatePicker && (
                <DatePicker
                  mode='date'
                  display='calendar'
                  value={date}
                  onChange={handleDate}
                />
              )}
            </Styled.FormWrap>
            <Styled.FormWrap
              style={{ width: '45%' }}
              onPress={() => setShowTimePicker(true)}
            >
              <Styled.Label>Hora</Styled.Label>
              <Styled.Input
                value={selectedTime}
              />
              {showTimePicker && (
                <DatePicker
                  mode='time'
                  display='default'
                  value={time}
                  onChange={handleTime}
                  is24Hour
                />
              )}
            </Styled.FormWrap>
          </Styled.FormRow>
          <Styled.FormWrap activeOpacity={100}>
            <Styled.Label>Está dentro da dieta?</Styled.Label>
            <Styled.FormRow style={{ width: '100%'}}>
              <Styled.FormSelect
                style={{ width: '45%', marginRight: 35 }}
              >
                <Styled.FormSelectLabel>Sim</Styled.FormSelectLabel>
              </Styled.FormSelect>
              <Styled.FormSelect
                style={{ width: '45%' }}
              >
                <Styled.FormSelectLabel>Não</Styled.FormSelectLabel>
              </Styled.FormSelect>
            </Styled.FormRow>
          </Styled.FormWrap>
        </Styled.Form>
      </Styled.Container>
    </Styled.TouchableWithoutFeedback>
  )
}
