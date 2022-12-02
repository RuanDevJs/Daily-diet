import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, Keyboard, Modal } from 'react-native';

import Button from '@Components/Button';

import DatePicker, { Event } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import { store } from '@Storage/Meals';
import { Device } from '@Utils/Device';
import { format } from 'date-fns';

import * as Styled from "./styles";

interface FormTextProps {
  name: string;
  description: string;
}

interface FormDateProps {
  date: string;
  time: string;
}

interface FormProps {
  formDate: FormDateProps;
  setFormDate: Dispatch<SetStateAction<FormDateProps>>;
}

interface MealProp {
  time: string;
  title: string;
  descrption: string;
  isInDiet: boolean;
}
interface MealsProps {
  DATE: string;
  MEALS: MealProp[];
}

export default function Form() {
  const plataform = Device.plataform;

  const [formDate, setFormDate] = useState<FormDateProps>({} as FormDateProps);
  const [formText, setFormText] = useState<FormTextProps>({
    name: '',
    description: ''
  } as FormTextProps);

  const [activeYesButon, setActiveYesButon] = useState(false);
  const [activeNoButon, setActiveNoButon] = useState(false);

  const navigation = useNavigation();
  const title = 'Daily Diet 🥗';

  function handleActive(type: "inDiet" | "notInDiet") {
    if (type === 'inDiet') {
      setActiveYesButon(true)
      setActiveNoButon(false);
    } else {
      setActiveNoButon(true);
      setActiveYesButon(false)
    }
  }

  function valdiateForm() {
    if (formText.name.length === 0 || formText.description.length === 0) {
      return Alert.alert(title, 'Complete o formulário, não esqueça do nome e descrição! 😣')
    } else if (!formDate.date && !formDate.time) {
      return Alert.alert(title, 'Complete o formulário, não esqueça dos horários! 😣')
    } else if (!activeNoButon && !activeYesButon) {
      return Alert.alert(title, 'Está ou não na dieta ? 👀')
    }
  }

  async function handleSubmit() {
    try {
      valdiateForm();

      const newMeal: MealsProps = {
        DATE: formDate.date,
        MEALS: [
          {
            title: formText.name,
            description: formText.description,
            time: formDate.time,
            isInDiet: activeYesButon ? true : false
          }
        ]
      }

      await store(newMeal);
      navigation.navigate('Feedback', {
        type: activeYesButon ? 'positive' : 'negative'
      });
    } catch (error) {
      Alert.alert(title, 'Não foi possível adicionar a refeição 😭');
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
              onChangeText={(value) => setFormText((oldValue) => ({ ...oldValue, name: value.trim() }))}
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
              onChangeText={(value) => setFormText((oldValue) => ({ ...oldValue, description: value.trim() }))}
            />
          </Styled.FormWrap>
          {plataform === 'android' && (
            <FormAndroid
              formDate={formDate}
              setFormDate={setFormDate}
            />
          )}
          {plataform === 'ios' && (
            <FormIos formDate={formDate} setFormDate={setFormDate} />
          )}
          <Styled.FormWrap activeOpacity={100}>
            <Styled.Label>Está dentro da dieta?</Styled.Label>
            <Styled.FormRow style={{ width: '100%' }}>
              <Styled.FormSelect
                style={{ width: '45%', marginRight: 35 }}
                type='inDiet'
                active={activeYesButon}
                onPress={() => handleActive('inDiet')}
              >
                <Styled.FormSelectIcon active />
                <Styled.FormSelectLabel>Sim</Styled.FormSelectLabel>
              </Styled.FormSelect>
              <Styled.FormSelect
                style={{ width: '45%' }}
                type='notInDiet'
                active={activeNoButon}
                onPress={() => handleActive('notInDiet')}
              >
                <Styled.FormSelectIcon />
                <Styled.FormSelectLabel>Não</Styled.FormSelectLabel>
              </Styled.FormSelect>
            </Styled.FormRow>
          </Styled.FormWrap>
          <Button
            title='Cadastrar refeição'
            style={{ width: '90%', marginTop: 50 }}
            onPress={handleSubmit}
          />
        </Styled.Form>
        <Styled.BackButtonTouchable onPress={() => navigation.navigate('Home')}>
          <Styled.BackIcon />
        </Styled.BackButtonTouchable>
      </Styled.Container>
    </Styled.TouchableWithoutFeedback>
  )
}

function FormAndroid({ formDate, setFormDate }: FormProps) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [formatDate, setFormatedDate] = useState<string>('');
  const [formatTime, setFormatTime] = useState<string>('');

  const [modePicker, setModePicker] = useState<'date' | 'time'>();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleMode(modeSelected: 'date' | 'time'): void {
    setModePicker(modeSelected);
    modeSelected === 'date' ? setShowDatePicker(oldValue => !oldValue) : setShowTimePicker(oldValue => !oldValue);
  }

  function handleDateAndTimePicked(event: Event, datePicked: Date | undefined) {
    if (Device.plataform === 'android') {
      modePicker === 'date' ? setShowDatePicker(oldValue => !oldValue) : setShowTimePicker(oldValue => !oldValue)
    }
    if (modePicker === 'date' && datePicked !== undefined) {
      const parsedDate = format(datePicked, 'd.MM.y');
      setTime(datePicked);
      setFormatedDate(parsedDate);
      setFormDate(oldValue => ({ ...oldValue, date: parsedDate }));
    } else if (modePicker === 'time' && datePicked !== undefined) {
      const parsedTime = `${datePicked.getHours()}:${datePicked.getMinutes()}`;
      setDate(datePicked);
      setFormatTime(parsedTime);
      setFormDate(oldValue => ({ ...oldValue, time: parsedTime }));
    }
  }

  return (
    <Styled.FormRow>
      <Styled.FormWrap
        style={{ width: '45%', marginRight: 35 }}
        onPress={() => handleMode('date')}
      >
        <Styled.Label>Data</Styled.Label>
        <Styled.Input
          value={formatDate}
        />
        {showDatePicker && (
          <DatePicker
            mode={modePicker}
            display='default'
            value={date}
            onChange={handleDateAndTimePicked}
          />
        )}
      </Styled.FormWrap>
      <Styled.FormWrap
        style={{ width: '45%' }}
        onPress={() => handleMode('time')}
      >
        <Styled.Label>Hora</Styled.Label>
        <Styled.Input
          value={`${formatTime}`}
          editable={false}
        />
        {showTimePicker && (
          <DatePicker
            mode={modePicker}
            display='default'
            value={time}
            onChange={handleDateAndTimePicked}
            is24Hour
          />
        )}
      </Styled.FormWrap>
    </Styled.FormRow>
  )
}

function FormIos({ formDate, setFormDate }: FormProps) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleMode(modeSelected: 'date' | 'time'): void {
    if (modeSelected === 'date') {
      setShowDatePicker(oldValue => !oldValue)
    } else {
      setShowTimePicker(oldValue => !oldValue)
    }
  }

  function handleDate(event: Event, datePicked: Date | undefined) {
    if (datePicked !== undefined) {
      const parsedDate = format(datePicked, 'd.MM.y');
      setDate(datePicked);
    }
  }

  function handleTime(event: Event, datePicked: Date | undefined) {
    if (datePicked !== undefined) {
      const formatedTime = `${datePicked.getHours()}:${datePicked.getMinutes()}`;
      setTime(datePicked);
    }
  }

  return (
    <Styled.FormRow>
      <Styled.FormWrap
        style={{ width: '45%', marginRight: 35 }}
        onPress={() => handleMode('date')}
      >
        <Styled.Label>Data</Styled.Label>
        {showDatePicker && (
          <DatePicker
            mode='date'
            display={'calendar'}
            value={date}
            onChange={handleDate}
          />
        )}
      </Styled.FormWrap>
      <Styled.FormWrap
        style={{ width: '45%' }}
        onPress={() => handleMode('time')}
      >
        <Styled.Label>Hora</Styled.Label>
        {showTimePicker && (
          <DatePicker
            mode='time'
            display='compact'
            value={time}
            onChange={handleTime}
            is24Hour
          />
        )}
      </Styled.FormWrap>
    </Styled.FormRow>
  )
}
