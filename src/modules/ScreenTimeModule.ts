import { NativeModules, Platform } from 'react-native';

const { ScreenTimeModule } = NativeModules;

export type UsageStat = {
    packageName: string;
    totalTimeInForeground: number;
};

const isUsageAccessGranted = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
        try {
            return await ScreenTimeModule.isUsageAccessGranted();
        } catch (error) {
            console.error("Error checking permission:", error);
            return false;
        }
    }
    return false;
};

const requestUsageAccessPermission = (): void => {
    if (Platform.OS === 'android') {
        ScreenTimeModule.requestUsageAccessPermission();
    }
};


const getRawScreenTimeData = async (): Promise<UsageStat[]> => {
    if (Platform.OS === 'android') {
        try {
            const data: Record<string, number> = await ScreenTimeModule.getLiveUsageStats(); 
            return Object.entries(data)
                .filter(([_, totalTimeInForeground]) => totalTimeInForeground > 0) 
                .map(([packageName, totalTimeInForeground]) => ({
                    packageName,
                    totalTimeInForeground: totalTimeInForeground,
                }))
                .sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground); 
        } catch (error) {
            console.error('Error retrieving screen time data:', error);
            return [];
        }
    }
    return [];
};


 const getScreenTimeData = async (): Promise<{ appUsages: { appName: string; usageTime: number }[]; totalScreenTime: number }> => {
    const rawData = await getRawScreenTimeData();
    const totalScreenTime = rawData.reduce((sum, stat) => sum + stat.totalTimeInForeground, 0);
    const appUsages = rawData.map(stat => {
        const appName = stat.packageName.split('.').pop() || stat.packageName; 
        return {
            appName,
            usageTime: stat.totalTimeInForeground,
        };
    });
    return { appUsages, totalScreenTime };
};

export { isUsageAccessGranted, requestUsageAccessPermission, getRawScreenTimeData, getScreenTimeData };
