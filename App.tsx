import Loading from '@Components/Loading';
import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';

import Routes from '@Routes/index.routes';

import theme from '@theme/';
import { ThemeProvider } from 'styled-components/native';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold
  });


  return (
    <ThemeProvider theme={theme}>
      { fontsLoaded ? <Routes /> : <Loading /> }
    </ThemeProvider>
  );
}

