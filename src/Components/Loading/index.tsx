import Icon from "@assets/Loading.json";
import LoadingIcon from "@assets/Loading2.json";

import * as Styled from "./styles";

type LoadingProps = {
  title?: string;
}

export default function Loading({ title }: LoadingProps){

  return (
    <Styled.Container>
      <Styled.Loading
        source={LoadingIcon}
      />
      { title && <Styled.Title>{title}</Styled.Title>}
    </Styled.Container>
  )
}
