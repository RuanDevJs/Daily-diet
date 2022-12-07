import AsyncStorage from "@react-native-async-storage/async-storage";
import storageConfig from "@Storage/storageConfig";

interface MealsData {
  title: string;
  description: string;
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

interface mealToDelete {
  DATE: string;
  MEAL: MealsData;
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

    if (mealsByDate && mealsByDate.length) {
      await storeByDate(meal.DATE, meal.MEALS[0]);
      return;
    }

    if (meals && meals.length) {
      const newMeals = JSON.stringify([...meals, meal]);
      await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, newMeals);
    } else {
      const newMeals = JSON.stringify([meal]);
      await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, newMeals);
    }
  } catch (error) {
    throw error;
  }
}

type storeByDate = (date: string, data: MealsData) => Promise<void>;

export async function storeByDate(
  date: string,
  data: MealsData
): Promise<void> {
  try {
    const [rows] = await findByDate(date);
    const meals = await find();

    rows.MEALS.push(data);

    const newMeals = meals.map((el) => {
      if (el.DATE === rows.DATE) {
        el.MEALS = rows.MEALS;
      }

      return el;
    });

    const parsedNewMeals = JSON.stringify(newMeals);
    await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, parsedNewMeals);
  } catch (error) {
    throw error;
  }
}

export async function deleteMeal(mealToDelete: mealToDelete) {
  try {
    const rows = await find();
    const [mealsByDate] = await findByDate(mealToDelete.DATE);

    if (mealsByDate && mealsByDate.DATE) {
      const updatedMeals = mealsByDate.MEALS.filter(
        (meal) => meal.title !== mealToDelete.MEAL.title
      );
      const index = rows.findIndex((el) => el.DATE === mealsByDate.DATE);

      if (updatedMeals.length === 0) {
        const removeUpdatedMeals = rows.filter(
          (el) => el.DATE !== mealsByDate.DATE
        );
        await AsyncStorage.setItem(
          storageConfig.MEALS_CONFIG,
          JSON.stringify(removeUpdatedMeals)
        );
      } else {
        rows[index].MEALS = updatedMeals;
        await AsyncStorage.setItem(
          storageConfig.MEALS_CONFIG,
          JSON.stringify(rows)
        );
      }
    }else{
      await AsyncStorage.setItem(
        storageConfig.MEALS_CONFIG,
        JSON.stringify(rows)
      );
    }
  } catch (error) {
    throw error;
  }
}
