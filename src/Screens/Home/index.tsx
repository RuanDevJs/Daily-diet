import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"

import IconLogo from "@assets/Logo.svg";
import ProfilePicture from "@assets/Foto.png";

import Button from "@Components/Button";
import Meal from "@Components/Meal";
import Loading from "@Components/Loading";

import { formatPercentage } from "@Utils/formatPercentage";
import { find } from "@Storage/Meals";
import * as StorageUser from "@Storage/User";

import * as Styled from "./styles";
interface MealProp {
  _id: string | number[];
  time: string;
  description: string;
  title: string;
  isInDiet: boolean;
}
interface MealsProps {
  _id: string | number[];
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

export default function Home() {
  const [active, setActive] = useState(false);
  const [formartedPorcentage, setFormartedPorcentage] = useState<string>('0');

  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState<MealsProps[]>([]);

  const [imageUri, setImageUri] = useState<string>('');
  const [mealsData, setMealsData] = useState<getAndParseAllMeals>({} as getAndParseAllMeals);

  const navigation = useNavigation();

  function getAndParseAllMeals(meals: MealsProps[]): getAndParseAllMeals {
    const parsedMeal: parsedMeal[] = [];

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
      setLoading(true)
      const mealStorage = await find();
      const getMeal = getAndParseAllMeals(mealStorage);

      if (mealStorage && mealStorage.length) {
        const parsedPorcentage = formatPercentage(getMeal.mealsInDiet, getMeal.meals.length);

        const realPorcentage = getMeal.mealsInDiet / getMeal.meals.length;

        if (realPorcentage >= 0.3) {
          setActive(true);
          setMeals(mealStorage);
          setFormartedPorcentage(parsedPorcentage);
          setMealsData(getMeal);
        }else {
          setActive(false);
          setMeals(mealStorage);
          setFormartedPorcentage(parsedPorcentage);
          setMealsData(getMeal);
        }

      }else{
        setMeals([]);
        setFormartedPorcentage('0');
        setActive(false);
      }
    } catch (e) {
      setMeals([]);
      setFormartedPorcentage('0');
    } finally {
      setLoading(false);
    }
  }

  function handleNavigation() {
    if(meals && meals.length){
      navigation.navigate('Statistic', {
        data: {
          percent: formartedPorcentage,
          foodsRegistered: mealsData.meals.length,
          foodsInDiet: mealsData.mealsInDiet,
          foodOutOfDiet: mealsData.mealsOutOfnDiet
        }
      });
    }
  }

  function navigateForm() {
    navigation.navigate('Form', {
      type: 'store'
    })
  }

  const pickImage = useCallback(() => {
    (async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1
        });

        if(result && result.assets){
          await StorageUser.store(result.assets[0].uri);
          setImageUri(result.assets[0].uri);
        }
      } catch {
        alert('Não foi possível alterar a foto...')
      }
    })()
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async() => {
        await handleMeal();

        const uri = await StorageUser.find();

        if(uri && uri.length){
          setImageUri(uri);
        }
      })();
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
        <Styled.TouchableArea activeOpacity={0.72} onPress={pickImage}>
          { imageUri ? <Styled.Image source={{ uri: imageUri }} /> : <Styled.MealsTitle>Adicionar Foto</Styled.MealsTitle>}
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

