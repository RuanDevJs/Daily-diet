import { Device } from "@Utils/Device";
import { ArrowLeft } from "phosphor-react-native";

import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.green_light};

  padding-top: ${Device.width * 0.2}px;
  position: relative;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
  `}
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;

    margin: 5px 0;
  `}
`;

export const Statistic = styled.View`
  flex: 1;
  margin-top: ${Device.width * 0.1}px;
  padding-top: ${Device.width * 0.12}px;

  background-color: ${({ theme }) => theme.COLORS.white};
  border-radius: 20px;

  align-items: center;
`;

export const StatisticTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;

    margin: 5px 0;
  `}
`;

export const Data = styled.TouchableOpacity`
  width: 90%;
  padding: 24px;
  margin-top: ${Device.width * 0.05}px;

  background-color: ${({ theme }) => theme.COLORS.gray_600};
  border-radius: 4px;
`;

export const DataTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
  `}
`;

export const DataDescription = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
    margin-top: ${Device.width * 0.02}px;
  `}
`;

export const Info = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface InfoWrapProps {
  active: boolean;
}

export const InfoWrap = styled.View<InfoWrapProps>`
  width: 48%;

  padding: 24px;
  margin-top: ${Device.width * 0.05}px;

  background-color: ${({ theme, active }) => active ? theme.COLORS.green_light : theme.COLORS.red_light};
  border-radius: 4px;
`;

export const InfoWrapTitle = styled.Text`
    ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.lg}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
  `}
`;

export const InfoWrapDescription = styled.Text`
    ${({ theme }) => css`
    font-family: ${theme.FONT.regular};
    font-size: ${theme.FONT_SIZE.sm}px;
    color: ${({ theme }) => theme.COLORS.gray_100};
    text-align: center;
    margin-top: ${Device.width * 0.02}px;
  `}
`;

export const BackButtonTouchable = styled.TouchableOpacity`
  position: absolute;
  top: ${Device.width * 0.15}px;
  left: ${Device.width * 0.05}px;
`;

export const BackIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.green_dark
}))`

`;
