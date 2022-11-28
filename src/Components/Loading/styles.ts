import Lottie from "lottie-react-native";
import styled, { css } from "styled-components/native";

import { Device } from "@Utils/Device";

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;

  padding: 18px 0;
`;

export const Loading = styled(Lottie).attrs({
  autoPlay: true,
  loop: true
})`
  width: ${Device.width * 0.72}px;
  height: ${Device.width * 0.72}px;
`;

export const Title = styled.Text`
  ${({ theme }) =>
    css`
      font-family: ${theme.FONT.regular};
      font-size: ${theme.FONT_SIZE.lg}px;
      color: ${theme.COLORS.gray_600};
      margin: 12px 0;
    `
  }
`;
