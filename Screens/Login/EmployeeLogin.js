import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Text, Item, Input, Icon, Button, Toast } from 'native-base';
import Colors from '../../constants/Colors';
import UnitasLogo from '../../Components/UnitasLogo';
import { SetUser } from '../../Actions/UserActions';

class EmployeeLogin extends Component {

    state = {
        email: 'guptaashish1901@gmail.com',
        password: 'password',
        error: '',
    }

    onRegisterClick = () => {
        this.props.navigation.navigate('RegisterEmployee');
    }
    onLoginClick = () => {
        if (!this.state.email.length || !this.state.password.length) {
            this.setState({
                error: 'Fill all the fields'
            }, () => {
                Toast.show({
                    text: "Fill all the fields",
                    type: 'danger',
                    duration: 3000,
                });
            });
        } else {
            this._loginUser();
        }
    }

    _loginUser = () => {
        this.props.navigation.navigate("Loading", {
            credentials: {
                email: this.state.email,
                password: this.state.password,
            },
            type: 'emp'
        });
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

    render() {
        return (
            <Container style={styles.container}>
                <UnitasLogo />
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Text style={styles.title}>Employee</Text>
                        <Item style={styles.textBox} error={this.isError('email')} rounded>
                            <Icon name="person" style={{ color: Colors.tintColor }} />
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
                                value={this.state.password}
                            />
                            {this.isError('password') ? <Icon name="close-circle" style={{ color: 'red' }} /> : null}
                        </Item>
                        <View>
                            <Button onPress={() => this.onLoginClick()} style={styles.loginButton}><Text style={styles.loginText}>Login</Text></Button>
                        </View>
                        <View>
                            <Button onPress={() => this.onRegisterClick()} style={styles.registerButton}><Text style={styles.registerText}>Register</Text></Button>
                        </View>
                    </View>
                </View>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    unitasContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.3,
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
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    boxContainer: {
        flex: 0.7
    },
    box: {
        padding: 20,
        paddingBottom: 40,
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        elevation: 5,
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
    registerButton: {
        backgroundColor: 'white',
        marginTop: 20,

    },
    registerText: {
        color: 'black',
    }
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(SetUser(user)),
});

export default connect(null, mapDispatchToProps)(EmployeeLogin);