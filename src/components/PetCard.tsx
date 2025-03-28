import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { cosmeticFrames } from '../utils/assetsMapping';

interface PetCardProps {
  cosmetic: string;
  onSelect: (cosmetic: string) => void;
}

const PetCard: React.FC<PetCardProps> = ({ cosmetic, onSelect }) => {

  const frames = cosmeticFrames[cosmetic]?.happy || cosmeticFrames.default.happy;
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 150);
    return () => clearInterval(interval);
  }, [frames]);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(cosmetic)}>
      <Image source={frames[currentFrame]} style={styles.petImage} />
      <Text style={styles.cosmeticLabel}>{cosmetic}</Text>
    </TouchableOpacity>
  );
};

export default PetCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',


    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  petImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  cosmeticLabel: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
