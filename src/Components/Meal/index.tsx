import * as Styled from "./styles";

interface MealsProps {
  data: {
    DATE: string;
    MEALS: {
      time: string;
      title: string;
      isInDiet: boolean;
    }[]
  }
}

export default function Meal({ data }: MealsProps) {
  return (
    <Styled.Container>
      <Styled.Title>{data.DATE}</Styled.Title>
      {
        data.MEALS.map((meal) => {
          return(
            <Styled.Wrap key={meal.title}>
              <Styled.WrapTime>{meal.time}</Styled.WrapTime>
              <Styled.Separator />
              <Styled.WrapTitle numberOfLines={1}>{meal.title}</Styled.WrapTitle>
              <Styled.WrapStatus isInDiet={meal.isInDiet}/>
            </Styled.Wrap>
          )
        })
      }
    </Styled.Container>
  )
}
