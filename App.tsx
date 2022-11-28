import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';
import theme from '@theme/';
import { ThemeProvider } from 'styled-components/native';

import Home from '@Screens/Home';
import Loading from '@Components/Loading';
import Statistic from '@Screens/Statistic';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold
  });

  if(!fontsLoaded){
    return <Loading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Statistic />
    </ThemeProvider>
  );
}

