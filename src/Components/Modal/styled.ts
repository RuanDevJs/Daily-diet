import { Device } from "@Utils/Device";
import styled, { css } from "styled-components/native";

export const Modal = styled.Modal``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  align-items: center;
`;

interface TitleProps {
  type: 'positive' | 'negative';
}

export const Title = styled.Text<TitleProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.lg}px;
    color: ${type === 'positive' ? theme.COLORS.green_dark : theme.COLORS.red_dark};
  `}
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${theme.COLORS.gray_100};

    text-align: center;
    margin-top: ${Device.width * 0.02}px;
  `}
`;

export const Wrap = styled.TouchableOpacity`
  margin-top: ${Device.width * 0.1}px;
`;
