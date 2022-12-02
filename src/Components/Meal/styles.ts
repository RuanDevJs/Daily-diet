import { Device } from "@Utils/Device";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  margin-top: ${Device.width * 0.1}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
  `}
`;

export const Wrap = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.COLORS.gray_500};
  border-radius: 4px;
  padding: 18px;
  margin: 4px 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

export const WrapTime = styled.Text`
  ${({ theme }) => css`
    width: 10%;
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.x_sm}px;
    color: ${theme.COLORS.gray_100}
    margin-right: 18px;
  `}
`;

export const Separator = styled.View`
  width: 1px;
  height: 25px;
  background-color: ${({ theme }) => theme.COLORS.gray_400};
  left: ${Device.width * 0.15}px;
  position: absolute;
`;

export const WrapTitle = styled.Text`
  width: 80%;

  ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${theme.COLORS.gray_100}
  `}
`;

type WrapStatusProps = {
  isInDiet: boolean;
}

export const WrapStatus = styled.View<WrapStatusProps>`
  width: 15px;
  height: 15px;

  margin-left: 6px;

  border-radius: 50px;
  background-color: ${({ theme, isInDiet }) => isInDiet ? theme.COLORS.green_mid : theme.COLORS.red_mid};
`;
