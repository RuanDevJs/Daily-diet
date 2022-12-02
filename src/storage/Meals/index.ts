import AsyncStorage from "@react-native-async-storage/async-storage";
import storageConfig from "@Storage/storageConfig";

interface MealsData {
  title: string;
  descrption: string;
  time: string;
  isInDiet: boolean;
}

interface Meals {
  DATE: string;
  MEALS: MealsData[];
}

interface newMeal {
  DATE: string;
  MEALS: MealsData[];
}

export async function find(): Promise<Meals[]> {
  try {
    const storage = await AsyncStorage.getItem(storageConfig.MEALS_CONFIG);
    const MEALS: Meals[] = storage ? JSON.parse(storage) : [];
    return MEALS;
  } catch (error) {
    throw error;
  }
}

export async function findByDate(date: string): Promise<Meals[]> {
  try {
    const storage = await AsyncStorage.getItem(storageConfig.MEALS_CONFIG);
    const MEALS: Meals[] =
      storage && storage?.length ? JSON.parse(storage) : [];
    return MEALS.length ? MEALS.filter((el) => el.DATE === date) : [];
  } catch (error) {
    throw error;
  }
}

export async function store(meal: newMeal) {
  try {
    const meals = await find();
    const mealsByDate = await findByDate(meal.DATE);

    if(mealsByDate && mealsByDate.length){
      await storeByDate(meal.DATE, meal.MEALS[0]);
      return;
    }

    if (meals && meals.length) {
      const newMeals = JSON.stringify([...meals, meal]);
      await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, newMeals);
    }else{
      const newMeals = JSON.stringify([meal]);
      await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, newMeals);
    }
  } catch (error) {
    throw new error;
  }
}

type storeByDate = (date: string, data: MealsData) => Promise<void>;

export async function storeByDate(date: string, data: MealsData): Promise<void> {
  try {
    const [rows] = await findByDate(date);
    const meals = await find();

    rows.MEALS.push(data);

    const newMeals = meals.map((el) => {
      if(el.DATE === rows.DATE){
        el.MEALS = rows.MEALS;
      }

      return el
    });

    const parsedNewMeals = JSON.stringify(newMeals);
    await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, parsedNewMeals);

  } catch(error) {
    throw error;
  }
}
