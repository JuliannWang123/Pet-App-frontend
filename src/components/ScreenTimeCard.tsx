import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScreenTimeCardProps {
    appName: string;
    usageTimeFormatted: string; 
}

const ScreenTimeCard: React.FC<ScreenTimeCardProps> = ({ appName, usageTimeFormatted }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.appName}>{appName}</Text>
            <Text style={styles.usageTime}>{usageTimeFormatted}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    appName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    usageTime: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
    },
    
});


export default ScreenTimeCard;
