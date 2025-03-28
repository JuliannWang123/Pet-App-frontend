// AppNaviagator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../components/LoginPage';
import PetCreationPage from '../components/PetCreationPage';
import MainPetPage from '../components/MainPetPage';
import SetGoalScreen from '../components/SetGoalScreen';
import LeaderboardScreen from '../components/LeaderboardScreen';
import PetGallery from '../components/PetGallery';

export type RootStackParamList = {
  Login: undefined;
  PetCreation: { username: string };
  MainPet: { username: string };
  SetGoal: { username: string };
  Leaderboard: undefined;
  PetGallery: { username: string; refreshPetData: () => void };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen
          name="PetCreation"
          component={PetCreationPage}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="MainPet"
          component={MainPetPage}
          options={{ headerLeft: () => null, headerShown: false }}
        />
        <Stack.Screen
          name="SetGoal"
          component={SetGoalScreen}
          options={{ title: 'Set Goal' }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{ title: 'Leaderboard' }}
        />
        <Stack.Screen name="PetGallery" options={{ title: 'Pet Gallery' }}>
          {props => {
            const { username, refreshPetData } = props.route.params;
            return (
              <PetGallery
                username={username}
                onCosmeticSelected={refreshPetData}
              />
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
