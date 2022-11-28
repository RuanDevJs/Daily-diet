import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IconLogo from "@assets/Logo.svg";
import ProfilePicture from "@assets/Foto.png";

import Button from "@Components/Button";
import Meal from "@Components/Meal";
import Loading from "@Components/Loading";

import * as Styled from "./styles";

interface MealsProps {
  DATE: string;
  MEALS: {
    time: string;
    title: string;
    isInDiet: boolean;
  }[];
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
  const [percentFoodsInDiet, setPercentFoodsInDiet] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleDiet(){
    const foodsInDiet: foodIndiet[] = [];

    MEALS.forEach((food) => {
      food.MEALS.forEach((food) => {
        if(food.isInDiet){
          foodsInDiet.push({
            name: food.title,
            isInDiet: food.isInDiet
          });
        }
      })
    });

    const parsedFoodInDiet = Math.floor(100 / foodsInDiet.length);

    setPercentFoodsInDiet(parsedFoodInDiet);
    setLoading(false);
  }

  function handleNavigation(){
    navigation.navigate('Statistic');
  }

  useEffect(() => {
    handleDiet();
  }, []);

  if(loading){
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
      <Styled.Percent onPress={handleNavigation} percent={percentFoodsInDiet} activeOpacity={0.68}>
        <Styled.PercentTitle>{percentFoodsInDiet}%</Styled.PercentTitle>
        <Styled.PercentDescription>das refeições dentro da dieta</Styled.PercentDescription>
        <Styled.ArrowIcon />
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

