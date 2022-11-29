import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IconLogo from "@assets/Logo.svg";
import ProfilePicture from "@assets/Foto.png";

import Button from "@Components/Button";
import Meal from "@Components/Meal";
import Loading from "@Components/Loading";

import { formatPercentage } from "@Utils/formatPercentage";

import * as Styled from "./styles";
interface MealProp {
  time: string;
  title: string;
  isInDiet: boolean;
}
interface MealsProps {
  DATE: string;
  MEALS: MealProp[];
}

interface foodIndiet {
  name: string;
  isInDiet: boolean;
}

const MEALS: MealsProps[] = [
  {
    DATE: '12.08.2022',
    MEALS: [
      {
        time: '20:00',
        title: 'X-tudo',
        isInDiet: false
      },
      {
        time: '20:00',
        title: 'Whey protein com leite Whey protein com leite Whey protein com leite',
        isInDiet: true
      },
      {
        time: '20:00',
        title: 'Salada cesar com frango grelhado',
        isInDiet: true
      },
      {
        time: '20:00',
        title: 'Vitamina de banana com abacate',
        isInDiet: true
      }
    ]
  },
  {
    DATE: '11.08.2022',
    MEALS: [
      {
        time: '20:00',
        title: 'X-tudo',
        isInDiet: false
      },
      {
        time: '20:00',
        title: 'Whey protein com leite Whey protein com leite Whey protein com leite',
        isInDiet: true
      },
      {
        time: '20:00',
        title: 'Salada cesar com frango grelhado',
        isInDiet: true
      },
      {
        time: '20:00',
        title: 'Vitamina de banana com abacate',
        isInDiet: true
      }
    ]
  },
  {
    DATE: '10.08.2022',
    MEALS: [
      {
        time: '20:00',
        title: 'X-tudo',
        isInDiet: false
      },
      {
        time: '20:00',
        title: 'Whey protein com leite Whey protein com leite Whey protein com leite',
        isInDiet: true
      },
      {
        time: '20:00',
        title: 'Salada cesar com frango grelhado',
        isInDiet: true
      },
      {
        time: '20:00',
        title: 'Vitamina de banana com abacate',
        isInDiet: true
      }
    ]
  }
]

export default function Home() {
  const [active, setActive] = useState(false);
  const [formartedPorcentage, setFormartedPorcentage] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleMeal() {
    const mealsInDiet: foodIndiet[] = [];

    MEALS.forEach((food) => {
      food.MEALS.forEach((food) => {
        mealsInDiet.push({
          name: food.title,
          isInDiet: food.isInDiet
        });
      })
    });

    return {
      meals: mealsInDiet,
      mealsInDiet: mealsInDiet.filter(el => el.isInDiet).length,
      mealsOutOfnDiet: mealsInDiet.filter(el => !el.isInDiet).length,
    }
  }

  function handlePercent(){
    const handledMeal = handleMeal();
    const result = formatPercentage(handledMeal.mealsInDiet, handledMeal.meals.length);

    const percentage = handledMeal.mealsInDiet / handledMeal.meals.length;

    if(percentage >= 0.3){
      setActive(true)
    }

    setFormartedPorcentage(result);
    setLoading(false)
  }

  function handleNavigation() {
    const handledMeal = handleMeal();
    const percentage = handledMeal.mealsInDiet / handledMeal.meals.length;

    navigation.navigate('Statistic', {
      data: {
        percent: percentage,
        foodsRegistered: handledMeal.meals.length,
        foodsInDiet: handledMeal.mealsInDiet,
        foodOutOfDiet: handledMeal.mealsOutOfnDiet
      }
    });
  }

  useEffect(() => {
    handlePercent();
  }, []);

  if (loading) {
    return (
      <Loading
        title="Quase lá..."
      />
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.TouchableArea activeOpacity={0.8}>
          <IconLogo />
        </Styled.TouchableArea>
        <Styled.TouchableArea activeOpacity={0.72}>
          <Styled.Image source={ProfilePicture} />
        </Styled.TouchableArea>
      </Styled.Header>
      <Styled.Percent
        onPress={handleNavigation}
        activeOpacity={0.68}
        active={active}
      >
        <Styled.PercentTitle>{formartedPorcentage}%</Styled.PercentTitle>
        <Styled.PercentDescription>das refeições dentro da dieta</Styled.PercentDescription>
        <Styled.ArrowIcon active={active} />
      </Styled.Percent>
      <Styled.Meals>
        <Styled.MealsTitle>Refeições</Styled.MealsTitle>
        <Button title="+ Nova refeição" />
        <FlatList
          data={MEALS}
          keyExtractor={((_, index) => `$key=${index}`)}
          renderItem={({ item }) => <Meal data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Styled.Meals>
    </Styled.Container>
  )
}

