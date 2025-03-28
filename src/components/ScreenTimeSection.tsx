import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenTimeCard from './ScreenTimeCard'; 
import { formatTime } from '../utils/timeUtils'; 

interface ScreenTime {
    appName: string;
    usageTime: number; // Time in seconds
}

interface ScreenTimeSectionProps {
    selectedDate: string;
    screenTimeData: ScreenTime[];
    totalScreenTime: number; // Total screen time in seconds
}

const ScreenTimeSection: React.FC<ScreenTimeSectionProps> = ({
    selectedDate,
    screenTimeData,
    totalScreenTime,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Screen Time</Text>
            <Text style={styles.dateText}>Selected Date: {selectedDate}</Text>
            <Text style={styles.totalText}>Total Screen Time: {formatTime(totalScreenTime)}</Text>
            <FlatList
                data={screenTimeData}
                keyExtractor={(item, index) => `${item.appName}-${index}`}
                renderItem={({ item }) => (
                    <ScreenTimeCard
                        appName={item.appName}
                        usageTimeFormatted={formatTime(item.usageTime)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No data available.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 18,
        marginBottom: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
});

export default ScreenTimeSection;
