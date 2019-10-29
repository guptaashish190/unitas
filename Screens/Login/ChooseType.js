import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';

import UnitasLogo from '../../Components/UnitasLogo';
import Colors from '../../constants/Colors';

class ChooseType extends Component {

    componentWillMount() {
        console.log(this.props.user);
        if (this.props.user) {
            const type = this.props.type === 'admin' ? 'Admin' : 'Employee';
            this.props.navigation.navigate(type);
            return false;
        }
    }

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

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    type: state.UserReducer.type
});

export default connect(mapStateToProps)(ChooseType);