import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface WeeklyCalendarProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedDate, onDateChange }) => {
    const [currentWeek, setCurrentWeek] = useState<string[]>([]);

    useEffect(() => {
        updateWeek(new Date(selectedDate));
    }, [selectedDate]);

    const updateWeek = (date: Date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); 
        const week: string[] = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            week.push(currentDate.toISOString().split('T')[0]); 
        }

        setCurrentWeek(week);
    };

    const handlePreviousWeek = () => {
        const previousWeek = new Date(currentWeek[0]);
        previousWeek.setDate(previousWeek.getDate() - 7); 
        updateWeek(previousWeek);
        onDateChange(previousWeek.toISOString().split('T')[0]);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeek[6]);
        nextWeek.setDate(nextWeek.getDate() + 1); 
        updateWeek(nextWeek);
        onDateChange(nextWeek.toISOString().split('T')[0]); 
    };
    const headerMonthYear = new Date(selectedDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <TouchableOpacity onPress={handlePreviousWeek} style={styles.navButton}>
                    <Text style={styles.navText}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.weekLabel}>{headerMonthYear}</Text>
                <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
                    <Text style={styles.navText}>{">"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weekContainer}
            >
                {currentWeek.map((date) => {
                    const isSelected = date === selectedDate;
                    return (
                        <TouchableOpacity
                            key={date}
                            style={[
                                styles.dateContainer,
                                isSelected && styles.selectedDateContainer,
                            ]}
                            onPress={() => onDateChange(date)}
                        >
                            <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </Text>
                            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                                {new Date(date).getDate()}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 12, 
        marginHorizontal: 15, 
        shadowColor: '#000', 
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    navButton: {
        padding: 10,
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    weekLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    dateContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        width: 50,
    },
    selectedDateContainer: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    selectedDateText: {
        color: '#FFFFFF',
    },
    selectedDayText: {
        color: '#FFFFFF',
    },
});


export default WeeklyCalendar;
