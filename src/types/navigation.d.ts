export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Statistic: {
        data: {
          percent: number;
          foodsRegistered: number;
          foodsInDiet: number;
          foodOutOfDiet: number;
        };
      };
    }
  }
}

