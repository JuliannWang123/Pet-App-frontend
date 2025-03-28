import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParamList } from '../navigation/AppNaviagator';
import { BASE_URL } from '../config';

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginPageProps {
    navigation: LoginPageNavigationProp;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Check if the user is already logged in
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await EncryptedStorage.getItem('auth_token');
            if (token) {
                // Validate token with backend
                const response = await fetch(`${BASE_URL}/api/users/validate-token`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    const user = await response.json();
                    navigation.navigate('MainPet', { username: user.username });
                }
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const { token } = await response.json();
    
                // Store the auth token
                await EncryptedStorage.setItem('auth_token', token);
                await EncryptedStorage.setItem('username', username);

    
                // Fetch pet data
                const petResponse = await fetch(`${BASE_URL}/api/pets/${username}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                if (petResponse.ok) {
                    const petData = await petResponse.json();
                    if (petData) {
                        navigation.navigate('MainPet', { username });
                    } else {
                        navigation.navigate('PetCreation', { username });
                    }
                } else if (petResponse.status === 404) {
                    // Navigate to PetCreation if the user doesn't have a pet
                    navigation.navigate('PetCreation', { username });
                } else {
                    // Handle unexpected response codes
                    Alert.alert('Error', 'Failed to fetch pet data.');
                }
            } else {
                Alert.alert('Error', 'Invalid username or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
});

export default LoginPage;
