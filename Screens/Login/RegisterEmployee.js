import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UnitasLogo from '../../Components/UnitasLogo';
import { Input, Item, Button, Icon, Content, Toast } from 'native-base';

import firebase from 'firebase';
import config from '../../config';
import Colors from '../../constants/Colors';

class RegisterAdmin extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        confPassword: '',
        passcode: '',
        error: '',
    }

    isError = type => {
        if (this.state.error && this.state.error.includes(type)) {
            return true;
        }
        if (this.state.error && !this.state[type].length) {
            return true;
        }
        return false;
    }

    _onRegister = () => {
        if (!this.state.username.length
            || !this.state.password.length
            || !this.state.confPassword.length
            || !this.state.passcode.length
            || !this.state.email.length
        ) {
            this.setState({
                error: 'Fill all the fields'
            }, () => {
                Toast.show({
                    text: "Fill all the fields",
                    type: 'danger',
                    duration: 3000,
                });
            });
        } else if (this.state.password !== this.state.confPassword) {
            Toast.show({
                text: "Passwords do not match",
                type: 'danger',
                duration: 3000,
            });

        } else if (this.state.passcode !== config.empPassCode) {
            Toast.show({
                text: "Employee Passcode is invalid",
                type: 'danger',
                duration: 3000,
            });
        } else {
            this._register();
        }
    }

    _register = () => {

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(({ user }) => {
            firebase.database().ref(`Employees/${user.uid}`).set({
                name: this.state.username,
                email: this.state.email,
                status: 'Offline',
                photo: null,
            }).then(() => {
                Toast.show({
                    text: "Employee Created!",
                    type: 'success',
                    duration: 3000,
                    onClose: () => this.props.navigation.goBack(),
                });
            });
        }).catch(err => {
            Toast.show({
                text: err.message,
                type: 'danger',
                duration: 3000,
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <UnitasLogo />
                <Content contentContainerStyle={styles.boxContainer}>
                    <View style={styles.box}>
                        <Text style={styles.title}>Register Employee</Text>

                        <Item style={styles.textBox} error={this.isError('username')} rounded>
                            <Icon name="person" style={{ color: Colors.tintColor }} />
                            <Input
                                style={{ padding: 10 }}
                                placeholder="Username"
                                onChangeText={text => this.setState({ username: text, error: this.state.error.replace('username', '') })}
                                value={this.state.username} />
                            {this.isError('username') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
                        </Item>

                        <Item style={styles.textBox} error={this.isError('email')} rounded>
                            <Icon name="mail" style={{ color: Colors.tintColor }} />
                            <Input
                                style={{ padding: 10 }}
                                placeholder="Email"
                                onChangeText={text => this.setState({ email: text, error: this.state.error.replace('email', '') })}
                                value={this.state.email} />
                            {this.isError('email') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
                        </Item>

                        <Item style={styles.textBox} error={this.isError('password')} rounded>
                            <Icon name="lock" style={{ color: Colors.tintColor }} />
                            <Input
                                style={{ padding: 10 }}
                                secureTextEntry
                                placeholder="Password"
                                onChangeText={text => this.setState({ password: text, error: this.state.error.replace('password', '') })}
                                value={this.state.password} />
                            {this.isError('password') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
                        </Item>

                        <Item style={styles.textBox} error={this.isError('confPassword')} rounded>
                            <Icon name="lock" style={{ color: Colors.tintColor }} />
                            <Input
                                style={{ padding: 10 }}
                                secureTextEntry
                                placeholder="Confirm Password"
                                onChangeText={text => this.setState({ confPassword: text, error: this.state.error.replace('confPassword', '') })}
                                value={this.state.confPassword} />
                            {this.isError('confPassword') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
                        </Item>

                        <Item style={styles.textBox} error={this.isError('passcode')} rounded>
                            <Icon name="lock" style={{ color: '#ff5252' }} />
                            <Input
                                style={{ padding: 10 }}
                                secureTextEntry
                                placeholder="Employee PassCode"
                                onChangeText={text => this.setState({ passcode: text, error: this.state.error.replace('passcode', '') })}
                                value={this.state.passcode} />
                            {this.isError('passcode') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
                        </Item>
                    </View>
                    <Button onPress={() => this._onRegister()} style={styles.registerButton}>
                        <Text style={styles.registerText}>
                            Register
                        </Text>
                    </Button>
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    unitasContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3,
    },
    registerButton: {
        alignSelf: 'center',
        padding: 20,
        marginTop: 30,
        backgroundColor: Colors.tintColor,
    },
    registerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    title: {
        fontWeight: 'bold',
        color: '#555'
    },
    unitasText: {
        fontWeight: 'bold',
        fontSize: 50,
        color: Colors.tintColor,
    },
    content: {
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    boxContainer: {
        alignSelf: 'center',
        width: '90%',
    },
    box: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        elevation: 5,
        margin: 10,
    },
    textBox: {
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
        padding: 5,
        margin: 10
    },
    loginButton: {
        marginTop: 20,
        padding: 20,
        height: 80,
        borderRadius: 100,
        backgroundColor: 'white',
    },
    loginText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.secondary,
        fontSize: 30,
        width: '90%',
    },
    moreOptionsContainer: {
        marginTop: 20,
        opacity: 0.7,
        flexDirection: 'row',
    },
});

export default RegisterAdmin