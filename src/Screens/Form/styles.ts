import styled, { css } from "styled-components/native";
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
  margin-top: ${Device.width * 0.1}px;
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

export const FormSelect = styled.TouchableOpacity`
  ${({ theme }) =>
    css`
      width: 43%;
      border: 1.5px solid ${theme.COLORS.gray_500};
      border-radius: 4px;

      font-family: ${theme.FONT.regular};
      font-size: ${theme.FONT_SIZE.sm}px;
      color: ${theme.COLORS.gray_100};

      padding: 16px;

      justify-content: center;
      align-items: center;
    `}
`;

export const FormSelectLabel = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.bold};
      font-size: ${theme.FONT_SIZE.md}px;
      color: ${theme.COLORS.gray_200};
    `}
`;
