import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BASE_URL } from '../config';

const SetGoalScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
    const { username } = route.params; 
    const [hours, setHours] = useState<string>(''); 
    const [minutes, setMinutes] = useState<string>(''); 

    const handleSaveGoal = async () => {
        const parsedHours = parseInt(hours) || 0; 
        const parsedMinutes = parseInt(minutes) || 0;

        // Input validation
        if (parsedHours < 0 || parsedMinutes < 0 || parsedMinutes >= 60) {
            Alert.alert('Error', 'Please enter valid hours (>= 0) and minutes (0-59).');
            return;
        }

        const totalMinutes = parsedHours * 60 + parsedMinutes; 

        try {
            const token = await EncryptedStorage.getItem('auth_token');
            const response = await fetch(`${BASE_URL}/api/goals/${username}/set`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(totalMinutes),
            });

            if (response.ok) {
                Alert.alert('Success', 'Goal updated successfully.');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to update goal.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Daily Screen Time Goal</Text>

            <Text style={styles.label}>Hours</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter hours"
                value={hours}
                onChangeText={setHours}
            />

            <Text style={styles.label}>Minutes</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter minutes"
                value={minutes}
                onChangeText={setMinutes}
            />

            <Button title="Save Goal" onPress={handleSaveGoal} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});

export default SetGoalScreen;
