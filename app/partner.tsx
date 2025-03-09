import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PartnerScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Partner Questions - Coming Soon!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
