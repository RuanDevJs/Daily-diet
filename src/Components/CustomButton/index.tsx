import { TouchableOpacityProps,  } from "react-native";
import * as Styled from "./styles";

interface CustomButtonProps extends TouchableOpacityProps {
  children: JSX.Element[] | JSX.Element;
}

export default function CustomButton({ children, ...props }: CustomButtonProps) {
  return (
    <Styled.Container activeOpacity={0.68} {...props}>
      {children}
    </Styled.Container>
  )
}
