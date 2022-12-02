import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.gray_200};
  border-radius: 8px;

  justify-content: center;
  align-items: center;

  padding: 22px;
  margin-top: 12px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT.bold};
    font-size: ${theme.FONT_SIZE.md}px;
    color: ${({ theme }) => theme.COLORS.white};
  `}
`;
