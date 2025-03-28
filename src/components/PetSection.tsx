import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { cosmeticFrames } from '../utils/assetsMapping'; 

interface PetData {
  name: string;
  happinessLevel: number;
  type: string; 
  currentStreak: number;
}

interface PetSectionProps {
  petData: PetData | null;
  goal: number | null;
}

const PetSection: React.FC<PetSectionProps> = ({ petData, goal }) => {
  const [petState, setPetState] = useState<'idle' | 'sad' | 'jump' | 'run' | 'walk'>('idle');
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  const getFramesForState = (state: string) => {
    const cosmetic = petData?.type && cosmeticFrames[petData.type] ? cosmeticFrames[petData.type] : cosmeticFrames.default;
    switch (state) {
      case 'jump':
        return cosmetic.jump;
      case 'run':
        return cosmetic.run;
      case 'walk':
        return cosmetic.walk;
      default:
        return petData?.happinessLevel && petData.happinessLevel > 70 ? cosmetic.happy : cosmetic.sad;
    }
  };

  const getPetFrames = (): any[] => {
    return getFramesForState(petState);
  };

  const handlePetPress = () => {
    const animations: Array<'jump' | 'run' | 'walk'> = ['jump', 'run', 'walk'];
    const randomIndex = Math.floor(Math.random() * animations.length);
    setPetState(animations[randomIndex]);
  };

  useEffect(() => {
    const frames = getPetFrames();
    setCurrentFrame(0);
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        if (next >= frames.length) {
          if (petState === 'jump' || petState === 'run' || petState === 'walk') {
            setPetState('idle');
          }
          return 0;
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [petState, petData?.happinessLevel]);

  const formatGoal = (goalInMinutes: number | null): string => {
    if (goalInMinutes === null) return 'No goal set';
    const hours = Math.floor(goalInMinutes / 60);
    const minutes = goalInMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  if (!petData) {
    return <Text style={styles.loading}>Loading pet data...</Text>;
  }

  const framesToShow = getPetFrames();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi I am, {petData.name}!</Text>
      <TouchableWithoutFeedback onPress={handlePetPress}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={styles.petImageWrapper}
          imageStyle={styles.petImageBackground}
        >
          <Image source={framesToShow[currentFrame]} style={styles.petImage} />
        </ImageBackground>
      </TouchableWithoutFeedback>
      <Text style={styles.subtitle}>Happiness Level: {petData.happinessLevel}</Text>
      <Text style={styles.streakText}>Streak: {petData.currentStreak}</Text>
      {goal !== null && (
        <Text style={styles.goalText}>Today's Usage Goal: {formatGoal(goal)}</Text>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  petImageWrapper: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  petImageBackground: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  petImage: {
    width: 120,
    height: 120,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
  },
  streakText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  goalText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  loading: {
    fontSize: 18,
    color: '#888',
  },
});

export default PetSection;
