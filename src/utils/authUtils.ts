import EncryptedStorage from 'react-native-encrypted-storage';

export const getAuthToken = async (): Promise<string | null> => {
    try {
        const token = await EncryptedStorage.getItem('auth_token');
        if (!token) {
            console.warn('[AuthUtils] No auth token found');
        }
        return token;
    } catch (error) {
        console.error('[AuthUtils] Failed to retrieve auth token:', error);
        return null;
    }
};

export const saveAuthToken = async (token: string): Promise<void> => {
    try {
        await EncryptedStorage.setItem('auth_token', token);
        console.log('[AuthUtils] Auth token saved successfully');
    } catch (error) {
        console.error('[AuthUtils] Failed to save auth token:', error);
    }
};
