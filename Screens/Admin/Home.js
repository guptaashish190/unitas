import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>React Native Component</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
});

export default Home