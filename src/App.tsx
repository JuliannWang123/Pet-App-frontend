import React, { useEffect, useState } from 'react';
import { Alert, LogBox } from 'react-native';
import AppNavigator from './navigation/AppNaviagator';
import { enableScreens } from 'react-native-screens';
import BackgroundFetch from 'react-native-background-fetch';
import { isUsageAccessGranted, requestUsageAccessPermission } from './modules/ScreenTimeModule';
import { scheduleDailyUpload } from './utils/Scheduler'; 

enableScreens(); 

LogBox.ignoreLogs(['Warning: ...']);

const App: React.FC = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [checkingPermission, setCheckingPermission] = useState(true);

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const granted = await isUsageAccessGranted();
                setHasPermission(granted);

                if (!granted) {
                    Alert.alert(
                        'Permission Required',
                        'We need Usage Access permission to track your screen time. Please enable it in settings.',
                        [
                            { text: 'Grant Permission', onPress: requestUsageAccessPermission },
                            { text: 'Cancel', style: 'cancel' },
                        ]
                    );
                }
            } catch (error) {
                console.error('Error checking permission:', error);
            } finally {
                setCheckingPermission(false);
            }
        };

        checkPermission();
    }, []);

    useEffect(() => {
        if (hasPermission) {
            console.log('[App.tsx] hasPermission is true. Scheduling daily upload...');
            scheduleDailyUpload();
        } else {
            console.log('[App.tsx] hasPermission is false. Not scheduling upload.');
            scheduleDailyUpload();
        }
    }, [hasPermission]);
    

    if (checkingPermission) {
        return null; 
    }

    return <AppNavigator />;
};

export default App;
