import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Button } from 'native-base';
import UnitasLogo from '../../Components/UnitasLogo';
class ChooseType extends Component {

    _onLoginClick = (type) => {
        if (type === 'admin') {
            this.props.navigation.navigate('AdminLogin');
        } else {
            this.props.navigation.navigate('EmployeeLogin');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <UnitasLogo />

                <View style={styles.chooseContainer}>
                    <Button onPress={() => this._onLoginClick('admin')} style={styles.loginButton}>
                        <Text style={[styles.loginText, styles.adminText]}>Admin Login</Text>
                    </Button>

                    <Button onPress={() => this._onLoginClick('emp')} style={styles.loginButton}>
                        <Text style={[styles.loginText, styles.emptext]}>Employee Login</Text>
                    </Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginButton: {
        marginTop: 20,
        padding: 20,
        height: 80,
        elevation: 3,
        borderRadius: 20,
        backgroundColor: 'white'

    },
    loginText: {
        textAlign: 'center',
        fontSize: 30,
        width: '90%',
    },
    adminText: {
        color: Colors.tintColor
    },
    emptext: {
        color: Colors.secondary
    }
});

export default ChooseType