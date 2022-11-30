import { Dimensions, Platform } from "react-native";

type Device = {
  width: number;
  height: number;
  plataform: string;
  behavior: 'padding' | 'height';
}

export const Device: Device = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  plataform: Platform.OS,
  behavior: Platform.OS === 'ios' ? 'padding' : 'height'
};

