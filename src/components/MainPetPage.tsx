import React, { useState, useEffect , useLayoutEffect} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Text,
    ListRenderItem,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNaviagator';
import PetSection from './PetSection';
import WeeklyCalendar from './WeeklyCalendar';
import ScreenTimeCard from './ScreenTimeCard';
import { getScreenTimeData } from '../modules/ScreenTimeModule';
import { formatTime } from '../utils/timeUtils';
import { BASE_URL } from '../config';

interface MainPetPageProps {
    route: RouteProp<RootStackParamList, 'MainPet'>;
    navigation: StackNavigationProp<RootStackParamList, 'MainPet'>;
}

interface ScreenTime {
    appName: string;
    usageTime: number;
}

interface ScreenTimeResponse {
    date: string;
    totalScreenTime: number;
    appUsages: ScreenTime[];
}

const MainPetPage: React.FC<MainPetPageProps> = ({ route, navigation }) => {
    const { username } = route.params;

    const [petData, setPetData] = useState<{
        name: string;
        happinessLevel: number;
        type: string;
        currentStreak: number;
    } | null>(null);

    const [goal, setGoal] = useState<number | null>(null);
    const [screenTimeData, setScreenTimeData] = useState<ScreenTime[]>([]);
    const [totalScreenTime, setTotalScreenTime] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const fetchPetData = async () => {
        try {
            const token = await EncryptedStorage.getItem('auth_token');
            const response = await fetch(`${BASE_URL}/api/pets/${username}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPetData(data);
            } else {
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    const fetchGoal = async () => {
        try {
            const token = await EncryptedStorage.getItem('auth_token');
            const response = await fetch(`${BASE_URL}/api/goals/${username}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setGoal(data.dailyScreenTimeGoal);
            } else {
                console.error('Failed to fetch goal');
            }
        } catch (error) {
            console.error('Error fetching goal:', error);
        }
    };

    const fetchScreenTimeData = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            if (selectedDate === today) {
                const currentDayData = await getScreenTimeData();
                setScreenTimeData(currentDayData.appUsages);
                setTotalScreenTime(currentDayData.totalScreenTime);
            } else {
                const token = await EncryptedStorage.getItem('auth_token');
                const response = await fetch(
                    `${BASE_URL}/api/screentimes/${username}/date/${selectedDate}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const data: ScreenTimeResponse = await response.json();
                    setScreenTimeData(data.appUsages);
                    setTotalScreenTime(data.totalScreenTime);
                } else {
                    setScreenTimeData([]);
                    setTotalScreenTime(0);
                    Alert.alert('Error', 'No screen time data found for the selected date.');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch screen time data.');
            setScreenTimeData([]);
            setTotalScreenTime(0);
        }
    };

    const updatePetHappiness = async (newHappiness: number) => {
        try {
            const token = await EncryptedStorage.getItem('auth_token');
            const response = await fetch(`${BASE_URL}/api/pets/${username}/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...petData,
                    happinessLevel: newHappiness,
                }),
            });

            if (response.ok) {
                const updatedPet = await response.json();
                setPetData(updatedPet);
            } else {
                Alert.alert('Error', 'Failed to update pet happiness.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while updating pet happiness.');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true); // Start refreshing
        try {
            await Promise.all([fetchPetData(), fetchGoal(), fetchScreenTimeData()]);
        } catch (error) {
            Alert.alert('Error', 'Failed to refresh data.');
        } finally {
            setRefreshing(false); // Stop refreshing
        }
    };

    useEffect(() => {
        fetchPetData();
    }, [username]);

    useEffect(() => {
        fetchGoal();
    }, [username]);

    useEffect(() => {
        fetchScreenTimeData();
    }, [selectedDate, username]);

    useEffect(() => {
        if (goal !== null && petData) {
            const goalInSeconds = goal * 60;
            const newHappiness = totalScreenTime > goalInSeconds ? 25 : 100;
            if (petData.happinessLevel !== newHappiness) {
                updatePetHappiness(newHappiness);
            }
        }
    }, [goal, totalScreenTime, petData]);

    const handleLogout = async () => {
        try {
            await EncryptedStorage.removeItem('auth_token'); 
            navigation.replace('Login'); 
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };
    


// Inside MainPetPage.tsx, update your renderItem function for type 'pet'
const renderItem: ListRenderItem<any> = ({ item }) => {
    if (item.type === 'pet') {
        return (
            <>
              <PetSection petData={petData} goal={goal} />
              {/* New button to navigate to PetGallery */}
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={() =>
                  navigation.navigate('PetGallery', { username, refreshPetData: fetchPetData })
                }
              >
                <Text style={styles.galleryButtonText}>Change Cosmetic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.setGoalButton}
                onPress={() => navigation.navigate('SetGoal', { username })}
              >
                <Text style={styles.setGoalButtonText}>Set Goal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.leaderboardButton}
                onPress={() => navigation.navigate('Leaderboard')}
              >
                <Text style={styles.leaderboardButtonText}>Leaderboard</Text>
              </TouchableOpacity>
            </>
        );
    } else if (item.type === 'calendar') {
        return (
            <View style={styles.calendarWrapper}>
                <WeeklyCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </View>
        );
    } else if (item.type === 'screenTime') {
        return (
            <ScreenTimeCard
                appName={item.data.appName}
                usageTimeFormatted={formatTime(item.data.usageTime)}
            />
        );
    }
    return null;
};


    const data = [
        { type: 'pet' },
        { type: 'calendar' },
        ...screenTimeData.map((item) => ({ type: 'screenTime', data: item })),
    ];

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={styles.container}
            ListFooterComponent={
                <View style={styles.logoutButton}>
                    <TouchableOpacity onPress={(handleLogout)} style={styles.logoutButtonInner}>
                        <Text style={styles.buttonText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    galleryButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2196F3', 
        borderRadius: 8,
        alignItems: 'center',
    },
    galleryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5', 
    },
    calendarWrapper: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#FFFFFF', 
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    logoutButton: {
        marginVertical: 20,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    logoutButtonInner: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    setGoalButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
    },
    setGoalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    leaderboardButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF5722', 
        borderRadius: 8,
        alignItems: 'center',
    },
    leaderboardButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },}

    );

export default MainPetPage;
