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
      Form: {
        type: "store" | "update";
        MEAL?: {
          DATE: string;
          MEAL: {
            time: string;
            title: string;
            description: string;
            isInDiet: boolean;
          };
        };
      };
      Feedback: {
        type: "positive" | "negative";
      };
      Meal: {
        DATE: string;
        MEAL: {
          time: string;
          title: string;
          description: string;
          isInDiet: boolean;
        };
      };
    }
  }
}
