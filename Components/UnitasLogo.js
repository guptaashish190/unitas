import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const LOGO = require('../assets/images/logo.png');

class UnitasLogo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={LOGO} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        margin: 10,
    },
    logo: {
        width: 200,
        height: 80,
    },
    unitas: {
        fontWeight: 'bold',
        fontSize: 30,
    }
});

export default UnitasLogo