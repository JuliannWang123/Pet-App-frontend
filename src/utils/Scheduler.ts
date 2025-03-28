import BackgroundFetch from 'react-native-background-fetch';
import { NativeModules } from 'react-native';
import { getAuthToken } from './authUtils';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BASE_URL } from '../config';


const { ScreenTimeModule } = NativeModules;

export const scheduleDailyUpload = () => {
    console.log('[Scheduler] Initializing BackgroundFetch...');

    BackgroundFetch.configure(
        {
            minimumFetchInterval: 15, 
            stopOnTerminate: false,  
            startOnBoot: true,       
            requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        },
        async (taskId) => {
            const now = new Date();
            console.log(`[BackgroundFetch] Task executed: ${taskId} at ${now.toLocaleString()}`);

            if (((now.getHours() === 23 && now.getMinutes() >= 25) || (now.getHours() === 0 && now.getMinutes() <= 59)) || (1==1)){
                console.log('[BackgroundFetch] It’s 11:55 PM! Triggering screen time upload...');
                await uploadScreenTime();
            } else {
                console.log('[BackgroundFetch] Not 11:55 PM. Skipping upload.');
            }

            BackgroundFetch.finish(taskId); 
        },
        (error) => {
            console.error('[BackgroundFetch] Configuration error:', error);
        }
    );

    BackgroundFetch.start()
        .then(() => {
            console.log('[BackgroundFetch] Successfully started.');
        })
        .catch((error) => {
            console.error('[BackgroundFetch] Failed to start:', error);
        });
};


const uploadScreenTime = async () => {
    console.log('[UploadScreenTime] Fetching screen time data...');
    try {
        const usageStats: Record<string, number> = await ScreenTimeModule.getLiveUsageStats();
        console.log('[UploadScreenTime] Usage stats fetched:', JSON.stringify(usageStats, null, 2));


        const filteredAppUsages = Object.entries(usageStats)
            .filter(([_, usageTime]) => usageTime > 0)
            .map(([appName, usageTime]) => ({ appName, usageTime }));

        if (filteredAppUsages.length === 0) {
            console.log('[UploadScreenTime] No app usages with >0 time to upload. Skipping.');
            return;
        }

        const payload = {
            totalScreenTime: calculateTotalScreenTime(usageStats),
            appUsages: filteredAppUsages,
        };

        console.log('[UploadScreenTime] Preparing to upload data:', JSON.stringify(payload, null, 2));


        const username = await EncryptedStorage.getItem('username');
        if (!username) {
            console.error('[UploadScreenTime] No username found in EncryptedStorage. Skipping upload.');
            return;
        }

        const token = await getAuthToken();
        if (!token) {
            console.error('[UploadScreenTime] No auth token found. Skipping upload.');
            return;
        }

        const response = await fetch(`${BASE_URL}/api/screentimes/${username}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        console.log('[UploadScreenTime] Screen time uploaded successfully with status:', response.status);
    } catch (error) {
        console.error('[UploadScreenTime] Failed to upload screen time:', error);
    }
};



const calculateTotalScreenTime = (usageStats: Record<string, number>): number => {
    console.log('[CalculateTotalScreenTime] Calculating total screen time...');
    const total = Object.values(usageStats).reduce((acc, time) => acc + (time || 0), 0);
    console.log(`[CalculateTotalScreenTime] Total screen time: ${total} seconds`);
    return total;
};
