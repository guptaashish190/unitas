import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { SetUser } from '../../Actions/UserActions';
import { Toast } from 'native-base';

class Loading extends Component {

    componentDidMount() {
        const credentials = this.props.navigation.getParam('credentials', null);
        const type = this.props.navigation.getParam('type', null);
        console.log(credentials, type);
        if (credentials) {
            const { email } = credentials;
            const { password } = credentials;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(({ user }) => {
                    firebase.auth().onAuthStateChanged(() => {

                        let firebaseref = null;
                        let navigate = null;
                        if (type === 'admin') {
                            firebase.database().ref(`Admins/${user.uid}`);
                            navigate = this.props.navigation.navigate('Admin');
                        } else if (type === 'emp') {
                            firebase.database().ref(`Employees/${user.uid}`);
                            navigate = this.props.navigation.navigate('Employee');
                        } else {
                            this._goBack(null, type);
                            return;
                        }
                        if (firebaseref) {
                            this._goBack(null, type);
                            return;
                        }
                        firebaseref.once('value').then(snapshot => {
                            const userData = snapshot.val();
                            if (userData) {
                                this.props.setUser(userData);
                                this.props.setType(type);
                                navigate();
                            } else {
                                this._goBack(null, type);
                            }
                        });
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
});

export default connect(null, mapDispatchToProps)(Loading);