import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items-key';

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        return value != null ? JSON.parse(value) : [];
    } catch (ex) {
        console.error(ex);
        return [];
    }
};

export const storeData = async (value) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(STORAGE_KEY, json);
    } catch (ex) {
        console.error(ex);
    }
};
