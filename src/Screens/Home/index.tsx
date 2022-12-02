import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import IconLogo from "@assets/Logo.svg";
import ProfilePicture from "@assets/Foto.png";

import Button from "@Components/Button";
import Meal from "@Components/Meal";
import Loading from "@Components/Loading";

import { formatPercentage } from "@Utils/formatPercentage";
import { find } from "@Storage/Meals";

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

interface parsedMeal {
  name: string;
  isInDiet: boolean;
}

interface getAndParseAllMeals {
  meals: parsedMeal[];
  mealsInDiet: number;
  mealsOutOfnDiet: number;
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
  const [formartedPorcentage, setFormartedPorcentage] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState<MealsProps[]>([]);

  const [mealsData, setMealsData] = useState<getAndParseAllMeals>({} as getAndParseAllMeals);

  const navigation = useNavigation();

  function getAndParseAllMeals(meals: MealsProps[]): getAndParseAllMeals {
    const parsedMeal:parsedMeal[] = [];

    meals.forEach((food) => {
      food.MEALS.forEach((food) => {
        parsedMeal.push({
          name: food.title,
          isInDiet: food.isInDiet
        });
      })
    });

    return {
      meals: parsedMeal,
      mealsInDiet: parsedMeal.filter(el => el.isInDiet).length,
      mealsOutOfnDiet: parsedMeal.filter(el => !el.isInDiet).length
    };
  }

  async function handleMeal() {
    try {
      const mealStorage = await find();
      const getMeal = getAndParseAllMeals(mealStorage);

      if(mealStorage && mealStorage.length){
        const parsedPorcentage = formatPercentage(getMeal.mealsOutOfnDiet, getMeal.meals.length);

        const realPorcentage = getMeal.mealsInDiet / getMeal.meals.length;

        if(realPorcentage >= 0.3){
          setActive(true);
        }

        setMeals(mealStorage);
        setFormartedPorcentage(parsedPorcentage);
        setMealsData(getMeal);
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }

  }

  function handleNavigation() {
    const percentage = mealsData.mealsInDiet / mealsData.meals.length;

    navigation.navigate('Statistic', {
      data: {
        percent: percentage,
        foodsRegistered: mealsData.meals.length,
        foodsInDiet: mealsData.mealsInDiet,
        foodOutOfDiet: mealsData.mealsOutOfnDiet
      }
    });
  }

  function navigateForm() {
    navigation.navigate('Form')
  }

  useFocusEffect(
    useCallback(() => {
      handleMeal();
    }, [])
  );

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
        <Button
          title="+ Nova refeição"
          onPress={navigateForm}
        />
        <FlatList
          data={meals}
          keyExtractor={((item, index) => `$key=${index}`)}
          renderItem={({ item }) => <Meal data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Styled.Meals>
    </Styled.Container>
  )
}

