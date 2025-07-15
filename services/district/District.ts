import AsyncStorage from '@react-native-async-storage/async-storage';


export default class District {

    // getDistrictId = async () => {

    //     try {
    //         const districtId = await AsyncStorage.getItem('districtId');
    //         if (districtId) {
    //             return districtId;
    //         }
    //     } catch (e) {
    //         console.log('Erro ao ler:', e);
    //         return null;
    //     }
    // };

    getDistrictName = async (): Promise<string | null | undefined> => {

        try {
            const districtName = await AsyncStorage.getItem('districtName');
            if (districtName) {
                return districtName;
            }
        } catch (e) {
            console.log('Erro ao ler:', e);
            return null;
        }
    };


    storageDistrict = async (districtName: string | null): Promise<boolean> => {

        try {
            // await AsyncStorage.setItem('districtId', String(districtId));
            await AsyncStorage.setItem('districtName', String(districtName));

            return true;
        } catch (e) {
            console.log('Erro ao salvar:', e);
            return false;
        }
    };
}