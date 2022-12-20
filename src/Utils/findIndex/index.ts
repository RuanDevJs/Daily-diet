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

export function findIndex(meals: Meals[], id: string | number[]){
  return meals.find(meal => meal._id === id);
}
