import styled, { css } from "styled-components/native";
import { ArrowLeft } from "phosphor-react-native";

import { Device } from "@Utils/Device";

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;

  align-items: center;

  padding: ${Device.width * 0.2}px 0;
`;

export const Title = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.bold};
      font-size: ${theme.FONT_SIZE.md}px;
      color: ${theme.COLORS.gray_100};

      margin-bottom: ${Device.width * 0.1}px;
    `}
`;

export const Form = styled.View`
  width: 100%;
  height: 1299px;

  background-color: ${({ theme }) => theme.COLORS.white};
  border-radius: 32px;

  align-items: center;
`;

export const FormWrap = styled.TouchableOpacity`
  width: 90%;
  margin-top: ${Device.width * 0.04}px;
`;

export const Label = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.bold};
      font-size: ${theme.FONT_SIZE.md}px;
      color: ${theme.COLORS.gray_200};

      margin-bottom: 8px;
    `}
`;

export const Input = styled.TextInput`
  ${({ theme }) =>
    css`
      width: 100%;
      border: 1.5px solid ${theme.COLORS.gray_500};
      border-radius: 4px;

      font-family: ${theme.FONT.regular};
      font-size: ${theme.FONT_SIZE.sm}px;
      color: ${theme.COLORS.gray_100};

      padding: 16px;
    `}
`;

export const FormRow = styled.View`
  width: 90%;

  flex-direction: row;
  justify-content: space-around;
`;
interface FormSelectProps {
  type: "inDiet" | "notInDiet";
  active: boolean;
}

export const FormSelect = styled.TouchableOpacity<FormSelectProps>`
  ${({ theme, type, active }) => {
    const returnBackground = type === 'inDiet' ? theme.COLORS.green_light : theme.COLORS.red_light;
    const returnBorder = type === 'inDiet' ? theme.COLORS.green_dark : theme.COLORS.red_dark;

    return css`
      flex-direction: row;

      width: 43%;
      background-color: ${theme.COLORS.gray_700};
      border-radius: 4px;

      font-family: ${theme.FONT.regular};
      font-size: ${theme.FONT_SIZE.sm}px;
      color: ${theme.COLORS.gray_100};

      padding: 16px;

      justify-content: center;
      align-items: center;
      ${active && `background-color: ${returnBackground};`}
      ${active && `border: 1.5px solid ${returnBorder};`}
    `;
  }}
`;

export const FormSelectLabel = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.bold};
      font-size: ${theme.FONT_SIZE.md}px;
      color: ${theme.COLORS.gray_200};
    `}
`;

interface FormSelectIconProps {
  active?: boolean;
}

export const FormSelectIcon = styled.View<FormSelectIconProps>`
  ${({ theme, active }) =>
    css`
      width: 10px;
      height: 10px;

      background-color: ${active ? theme.COLORS.green_dark : theme.COLORS.red_dark};

      border-radius: 20px;
      margin-right: 8px;
    `}
`;

export const BackButtonTouchable = styled.TouchableOpacity`
  position: absolute;
  top: ${Device.width * 0.2}px;
  left: ${Device.width * 0.05}px;
`;

export const BackIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.gray_100
}))``;
