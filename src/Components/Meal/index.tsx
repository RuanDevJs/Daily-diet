import { useNavigation } from "@react-navigation/native";
import * as Styled from "./styles";

interface MealsProps {
  data: {
    DATE: string;
    MEALS: {
      time: string;
      title: string;
      description: string;
      isInDiet: boolean;
    }[]
  }
}

interface Meal {
  DATE: string;
  MEAL: {
    time: string;
    title: string;
    description: string;
    isInDiet: boolean;
  }
}

interface Data {
  time: string;
  title: string;
  description: string;
  isInDiet: boolean;
}

export default function Meal({ data }: MealsProps) {
  const navigation = useNavigation();

  function goToMealPage(mealData: Data) {
    const meal: Meal = {
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
