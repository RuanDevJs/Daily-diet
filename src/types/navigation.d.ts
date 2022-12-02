export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Statistic: {
        data: {
          percent: string;
          foodsRegistered: number;
          foodsInDiet: number;
          foodOutOfDiet: number;
        };
      };
      Form: undefined;
      Feedback: {
        type: 'positive' | 'negative'
      };
    }
  }
}

