import { PencilSimpleLine, Trash, ArrowLeft } from "phosphor-react-native";

import { Device } from "@Utils/Device";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;

  padding: ${Device.width * 0.2}px;
  background-color: ${({ theme }) => theme.COLORS.green_light};

  position: relative;
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

export const Content = styled.View`
  width: ${Device.width}px;
  height: ${Device.height}px;

  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.white};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

export const Wrap = styled.View`
  width: 80%;
  margin-top: ${Device.width * 0.1}px;
`;

export const ContentTitle = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.bold};
      font-size: ${theme.FONT_SIZE.md}px;
      color: ${theme.COLORS.gray_100};

      margin-bottom: 4px;
    `}
`;

export const ContentDescription = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.regular};
      font-size: ${theme.FONT_SIZE.sm}px;
      color: ${theme.COLORS.gray_100};
    `}
`;

export const ContentStatus = styled.TouchableOpacity`
  width: ${Device.width * 0.4}px;
  padding: 12px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.gray_600};
  border-radius: 50px;
`;

export const StatusCircle = styled.View`
  width: 10px;
  height: 10px;

  margin-right: 10px;

  border-radius: 50px;
  background-color: ${({ theme }) => theme.COLORS.green_dark};
`;

export const ButtonTitle = styled.Text`
    ${({ theme }) =>
    css`
      font-family: ${theme.FONT.bold};
      font-size: ${theme.FONT_SIZE.sm}px;
      color: ${theme.COLORS.white};
    `}
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;

  top: ${Device.width * 0.2}px;
  left: ${Device.width * 0.05}px;
`;

export const BackButtonIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.gray_100
}))``;

export const EditIcon = styled(PencilSimpleLine).attrs(({ theme }) => ({
  size: 18,
  color: theme.COLORS.white
}))`
  margin-right: 8px;
`;

export const DeleteIcon = styled(Trash).attrs(({ theme }) => ({
  size: 18,
  color: theme.COLORS.gray_100
}))`
  margin-right: 8px;
`;
