import AsyncStorage from "@react-native-async-storage/async-storage";
import storageConfig from "@Storage/storageConfig";
import { AppError } from "@Utils/Errors";
import { findIndex } from "@Utils/findIndex";

interface Meal {
  _id: string | number[];
  title: string;
  description: string;
  time: string;
  isInDiet: boolean;
}

interface Meals {
  _id: string | number[];
  DATE: string;
  MEALS: Meal[];
}

type removeMeal = {
  mealId: string | number[];
  idToDelete: string | number[];
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

export async function findByDate(date: string) {
  try {
    const storagedMeals = await find();

    const foundMealByDate = storagedMeals.filter((meal) => meal.DATE === date);
    return foundMealByDate ? foundMealByDate : [];
  } catch (error) {
    throw error;
  }
}

export async function findById(id: string | number[]) {
  try {
    const storage = await AsyncStorage.getItem(storageConfig.MEALS_CONFIG);
    const MEALS: Meals[] = storage ? JSON.parse(storage) : [];
    return MEALS.find((meal) => meal._id === id);
  } catch (error) {
    throw error;
  }
}

export async function store(newMeal: Meals) {
  try {
    const storagedMeals = await find();
    const mealByDate = await findByDate(newMeal.DATE);

    if (mealByDate && mealByDate.length) {
      return await storeById(newMeal);
    }

    const parsedMeals = JSON.stringify([...storagedMeals, newMeal]);
    await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, parsedMeals);
  } catch (e) {
    throw e;
  }
}

async function storeById(newMeal: Meals){
  const storagedMeals = await find();

  const updatedMeals = storagedMeals.map((meals) => {
    if (meals.DATE === newMeal.DATE) {
      meals.MEALS.push(newMeal.MEALS[0]);
    }

    return meals;
  });

  await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, JSON.stringify(updatedMeals));
}

export async function update(meal: Meals){
  try {
    const storagedMeals = await find();
    const mealByDate = await findByDate(meal.DATE);

    if(mealByDate && mealByDate.length){
      return updateByDate(meal);
    }

    const updatedStoragedMeals = storagedMeals
    .filter((meals) => {
      if(meals.DATE !== meal.DATE){
        return meals;
      }
    });

    const updatedMeals = [...updatedStoragedMeals, meal]

    await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, JSON.stringify(updatedMeals));
  } catch(error){
    throw error;
  }
}

async function updateByDate(meal: Meals){
  try {
    const storagedMeals = await find();
    const updatedMeals = storagedMeals
    .find(meals => meals.DATE === meal.DATE)
    ?.MEALS.map((meals) => {
      if(meals._id === meal._id){
        meals = meal.MEALS[0];
      }

      return meals;
    });

    if(updatedMeals && updatedMeals.length){
      const updatedStoragedMeals = storagedMeals
      .map((meals) => {
        if(meals.DATE === meal.DATE){
          meals.MEALS = updatedMeals;
        }

        return meals;
      })

      await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, JSON.stringify(updatedStoragedMeals));
    }
  } catch(error) {
    throw error;
  }
}

export async function remove({ mealId, idToDelete }: removeMeal) {
  try {
    if (mealId && idToDelete) {
      let storagedMeal = await find();
      // const updatedMeal = storagedMeal.find((meal) => meal._id === mealId)?.MEALS.filter(meal => meal._id !== idToDelete);

      const findIndex: number = storagedMeal.findIndex(meal => meal._id === mealId);
      const updatedMeal = storagedMeal[findIndex].MEALS.filter(meal => meal._id !== idToDelete);

      const updatedStoragedMeals = storagedMeal
      .map((meal) => {
        if(meal._id === mealId){
          meal.MEALS = updatedMeal;
        }

        return meal;
      });

      if(updatedStoragedMeals.some(meal => meal.MEALS.length === 0)){
        storagedMeal = storagedMeal.filter(meal => meal._id !== mealId);
        await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, JSON.stringify(storagedMeal));
        return;
      }

      storagedMeal = updatedStoragedMeals;
      await AsyncStorage.setItem(storageConfig.MEALS_CONFIG, JSON.stringify(storagedMeal));
    } else {
      await AsyncStorage.removeItem(storageConfig.MEALS_CONFIG);
    }
  } catch (error) {
    throw error;
  }
}


