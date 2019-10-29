import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { SetUser, SetType } from '../../Actions/UserActions';
import { Toast } from 'native-base';

class Loading extends Component {

    componentDidMount() {
        const credentials = this.props.navigation.getParam('credentials', null);
        const type = this.props.navigation.getParam('type', null);
        console.log("Got Crentials");
        if (credentials) {
            const { email } = credentials;
            const { password } = credentials;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(({ user }) => {

                    let firebaseref = null;
                    if (type === 'admin') {
                        firebaseref = firebase.database().ref(`Admins/${user.uid}`);
                    } else if (type === 'emp') {
                        firebaseref = firebase.database().ref(`Employees/${user.uid}`);
                    } else {
                        this._goBack(null, type);
                        return;
                    }
                    if (!firebaseref) {
                        this._goBack("No firebase ref", type);
                        return;
                    }
                    firebaseref.once('value').then(snapshot => {
                        const userData = snapshot.val();
                        if (userData) {
                            this.props.setUser({
                                ...userData,
                                id: user.uid
                            });
                            this.props.setType(type);
                            console.log("Navigating " + type);
                            this.props.navigation.navigate(type === 'admin' ? 'Admin' : 'Employee');
                        } else {
                            console.log('Null User');
                            this._goBack("Error: User Data -> null", type);
                        }
                    }).catch(err => {
                        this._goBack(err.message, type);
                    });
                }).catch((err) => {
                    this._goBack(err.message, type);
                });
        }
    }

    _goBack = (message, navigationType) => {
        if (navigationType === 'admin') {
            Toast.show({
                text: message || 'An Error occurred. Please try again!',
                onClose: () => this.props.navigation.navigate('AdminLogin'),
                type: 'danger'
            });
        } else if (navigationType === 'emp') {

            Toast.show({
                text: message || 'An Error occurred. Please try again!',
                onClose: () => this.props.navigation.navigate('EmployeeLogin'),
                type: 'danger'
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
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

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(SetUser(user)),
    setType: type => dispatch(SetType(type)),
});

export default connect(null, mapDispatchToProps)(Loading);