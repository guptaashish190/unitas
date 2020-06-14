import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HeaderComponent from '../../Components/Common/Header';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid/v1';
import { Input, Item, Button, Toast, Spinner, Right } from 'native-base';
import firebase from 'firebase';

import Colors from '../../constants/Colors';
import { SetPhoto, SetUsername } from '../../Actions/UserActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DEFAULT_PROFILE_PHOTO = require('../../assets/images/default_photo.png');

class Settings extends Component {

    state = {
        username: this.props.user.name,
        loading: false,
        edited: false,
    }
    componentDidMount() {
        console.log(this.props.user);
    }
    async _selectPicture() {
        const result = await ImagePicker.launchImageLibraryAsync({
            aspect: [1, 1],
            allowsEditing: true
        })
        if (!result.cancelled) {
            await this._setImage(result.uri)
        }
    }
    /**
     * Get picture from camera
     */
    async _takePicture() {
        const result = await ImagePicker.launchCameraAsync({
            aspect: [1, 1],
            allowsEditing: true
        })
        if (!result.cancelled) {
            await this._setImage(result.uri)
        }
    }

    _deleteCurrentImage = async () => {
        firebase.storage().ref().child('/images/');
    }

    _setImage = async (uri) => {
        this.setState({
            loading: true
        }, async () => {
            try {
                const response = await fetch(uri);
                const blob = await response.blob();
                console.log("Blob Generated");
                var ref = firebase.storage().ref().child("images/" + uuid());
                const snapshot = await ref.put(blob);

                console.log('image uploaded');
                const url = await snapshot.ref.getDownloadURL();
                await firebase.database().ref(`Employees/${this.props.user.id}`).update({
                    photo: url,
                });
                Toast.show({
                    text: 'Successfully Changed',
                    type: 'success',
                });
                this.setState({
                    loading: false,
                });
                this.props.setPhoto(url);
            } catch (err) {
                console.log(err.message);
                this.setState({
                    loading: false,
                });
                Toast.show({
                    text: err.message || "Some error occured. Please try again later.",
                    type: 'danger'
                });
            }
        });
    }


    _updateUsername = () => {

        if (this.state.username.length > 0 && !this.state.loading) {
            this.setState({
                loading: true,
            }, () => {

                const ref = firebase.database().ref(`Employees/${this.props.user.id}`);
                ref.update({
                    name: this.state.username
                }).then(() => {
                    Toast.show({
                        text: "Updated",
                        type: 'success'
                    });
                    this.props.setUsername(this.state.username);
                    this.setState({
                        loading: false,
                        edited: false,
                    });
                }).catch(err => {
                    Toast.show({
                        text: err.message,
                        type: 'danger'
                    });
                });
            });
        } else {
            Toast.show({
                text: "Username cannot be null.",
                type: 'danger'
            });
        }
    }
    _getRight = () => {
        if (this.state.edited) {
            return (
                <Right>
                    <TouchableOpacity style={styles.updateButton} onPress={() => this._updateUsername()}>
                        <Text style={{ color: Colors.tintColor }}>
                            Update
                </Text>
                    </TouchableOpacity>
                </Right>
            )
        }
        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    openDrawer={() => this.props.navigation.openDrawer()}
                    title="Settings"
                />

                <View style={styles.row}>
                    <Item rounded>
                        <Input
                            onChangeText={text => this.setState({ username: text, edited: true })}
                            value={this.state.username} placeholder='Username' />
                        {this._getRight()}
                    </Item>
                </View>

                <Image
                    style={styles.image}
                    source={this.props.user ? ({ uri: this.props.user.photo }) : DEFAULT_PROFILE_PHOTO}
                />
                <View style={styles.buttonContainer}>
                    <Button onPress={() => this._selectPicture()} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Choose Image
                    </Text>
                    </Button>
                    <Button onPress={() => this._takePicture()} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Take Picture
                    </Text>
                    </Button>
                </View>
                {this.state.loading ? <Spinner /> : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    row: {
        margin: 20,
    },
    image: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        width: 300,
        height: 300,
    },
    buttonText: {
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    updateButton: {
        marginRight: 10,
    }
});


const mapStateToProps = state => ({
    user: state.UserReducer.user,
});
const mapDispatchToProps = dispatch => ({
    setPhoto: url => dispatch(SetPhoto(url)),
    setUsername: name => dispatch(SetUsername(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);