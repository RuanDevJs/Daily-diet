import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@Screens/Home";
import Statistic from "@Screens/Statistic";
import Form from "@Screens/Form";
import Feedback from "@Screens/Feedback";

export default function Stack() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        component={Home}
        name="Home"
      />
      <Screen
        component={Statistic}
        name="Statistic"
      />
      <Screen
        component={Form}
        name="Form"
      />
      <Screen
        component={Feedback}
        name="Feedback"
      />
    </Navigator>
  )
}
