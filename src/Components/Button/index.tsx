import { TouchableOpacityProps } from "react-native";
import * as Styled from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <Styled.Container activeOpacity={0.68} {...props}>
      <Styled.Title>
        {title}
      </Styled.Title>
    </Styled.Container>
  )
}
