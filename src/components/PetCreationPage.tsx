import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNaviagator';
import EncryptedStorage from 'react-native-encrypted-storage'; // Import EncryptedStorage
import { BASE_URL } from '../config';

type PetCreationPageProps = StackScreenProps<RootStackParamList, 'PetCreation'>;

const PetCreationPage: React.FC<PetCreationPageProps> = ({ navigation, route }) => {
    const { username } = route.params;
    const [petName, setPetName] = useState<string>('');

    const handleCreatePet = async () => {
        try {

            const token = await EncryptedStorage.getItem('auth_token');
            if (!token) {
                Alert.alert('Error', 'Authentication token not found. Please log in again.');
                navigation.replace('Login'); // Redirect to login if no token is found
                return;
            }

            const response = await fetch(`${BASE_URL}/api/pets/${username}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token
                },
                body: JSON.stringify(petName),
            });

            if (response.ok) {

                navigation.navigate('MainPet', { username });
            } else {
                Alert.alert('Error', 'Failed to create pet. Please try again.');
            }
        } catch (error) {
            console.error('Error creating pet:', error);
            Alert.alert('Error', 'Failed to create pet');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Pet</Text>
            <TextInput
                style={styles.input}
                placeholder="Pet Name"
                value={petName}
                onChangeText={setPetName}
            />
            <Button title="Create Pet" onPress={handleCreatePet} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
});

export default PetCreationPage;
