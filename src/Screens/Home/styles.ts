import { Device } from "@Utils/Device";
import { ArrowUpRight } from "phosphor-react-native";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: ${Device.width * 0.2}px 12px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TouchableArea = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled.Image`
  width: ${Device.width * 0.12}px;
  height: ${Device.width * 0.12}px;
  border-radius: 50px;
  border: 2px solid ${({ theme }) => theme.COLORS.gray_200};
`;

type PercentProps = TouchableOpacityProps & {
  percent: number;
}

export const Percent = styled.TouchableOpacity<PercentProps>`
  background-color: ${({ theme, percent }) => percent >= 8 ? theme.COLORS.green_light : theme.COLORS.red_light };
  padding: 32px 0;
  margin-top: ${Device.width * 0.1}px;

  border-radius: 12px;
  position: relative;
`;

export const PercentTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
  `}
`;

export const PercentDescription = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
  `}
`;

export const ArrowIcon = styled(ArrowUpRight).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.green_dark
}))`
  position: absolute;

  left: ${Device.width * 0.83}px;
  top: ${Device.width * 0.05}px;
`;

export const Meals = styled.View`
  flex: 1;
  margin-top: ${Device.width * 0.1}px;
`;

export const MealsTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
  `}
`;
