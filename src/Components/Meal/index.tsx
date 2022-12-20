import { useNavigation } from "@react-navigation/native";
import * as Styled from "./styles";

interface Data {
  _id: string | number[];
  time: string;
  title: string;
  description: string;
  isInDiet: boolean;
}
interface MealComponentProps {
  data: {
    _id: string | number[];
    DATE: string;
    MEALS: Data[];
  }
}


export default function Meal({ data }: MealComponentProps) {
  const navigation = useNavigation();

  function goToMealPage(mealData: Data) {
    const meal = {
      _id: data._id,
      DATE: data.DATE,
      MEAL: mealData
    }
    navigation.navigate("Meal", meal);
  }

  return (
    <Styled.Container>
      <Styled.Title>{data.DATE}</Styled.Title>
      {
        data.MEALS.map((meal, index) => {
          return (
            <Styled.Wrap
              key={`${meal.title}-${index}`}
              activeOpacity={0.72}
              onPress={() => goToMealPage(meal)}
            >
              <Styled.WrapTime>{meal.time}</Styled.WrapTime>
              <Styled.Separator />
              <Styled.WrapTitle numberOfLines={1}>{meal.title}</Styled.WrapTitle>
              <Styled.WrapStatus isInDiet={meal.isInDiet} />
            </Styled.Wrap>
          )
        })
      }
    </Styled.Container>
  )
}
