import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "@Components/Modal";

import * as Styled from "./styled";

interface useRoute {
  type: 'positive' | 'negative'
}

export default function Feedback() {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { type } = params as useRoute;

  function handleNavigation(){
    navigation.navigate('Home')
  }

  return (
    <Styled.Container>
      <Modal
        onPress={handleNavigation}
        type={type}
      />
    </Styled.Container>
  )
}
