import storageConfig from "@Storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function find(): Promise<string>{
  try {
    const storageUri = await AsyncStorage.getItem(storageConfig.USERS_CONFIG);
    return storageUri ? JSON.parse(storageUri) : '';
  } catch(error) {
    throw error;
  }
}

export async function store(uri: string): Promise<void>{
  try {
    await AsyncStorage.setItem(storageConfig.USERS_CONFIG, JSON.stringify(uri));
  } catch(error) {
    throw error;
  }
}
