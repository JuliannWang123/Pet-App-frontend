import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNaviagator';

export const logout = async (navigation: StackNavigationProp<RootStackParamList, any>) => {
    try {
        await EncryptedStorage.removeItem('auth_token');
        await EncryptedStorage.removeItem('username');

        console.log('[Logout] User logged out successfully.');

        navigation.replace('Login'); 
    } catch (error) {
        console.error('[Logout] Failed to logout:', error);
    }
};
