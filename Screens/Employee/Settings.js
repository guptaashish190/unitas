import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HeaderComponent from '../../Components/Common/Header';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Content, Input, Item, Icon, Button } from 'native-base';
import firebase from 'firebase';
import Colors from '../../constants/Colors';

const DEFAULT_PROFILE_PHOTO = require('../../assets/images/default_photo.png');

class Settings extends Component {

    state = {
        username: this.props.user.name,
    }
    componentDidMount() {
        console.log(this.props.user);
    }
    async _selectPicture() {
        const result = await ImagePicker.launchImageLibraryAsync()
        if (!result.cancelled) {
            await this._setImage(result.uri)
        }
    }

    async _setImage(uri) {
        this.setState({
            loading: true
        }, () => {

        });
    }


    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null

            const imageRef = FirebaseClient.storage().ref('images').child('image_001')

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /**
     * Get picture from camera
     */
    async _takePicture() {
        const result = await ImagePicker.launchCameraAsync()
        if (!result.cancelled) {
            await this._setImage(result.uri)
        }
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
                            onChangeText={text => this.setState({ username: text })}
                            value={this.state.username} placeholder='Username' />
                    </Item>
                </View>

                <Image
                    style={styles.image}
                    source={this.props.user.photo ? ({ uri: this.props.user.photo }) : DEFAULT_PROFILE_PHOTO}
                />
                <View style={styles.buttonContainer}>
                    <Button onPress={() => this._chooseImage()} style={styles.button}>
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
    }
});


const mapStateToProps = state => ({
    user: state.UserReducer.user,
});

export default connect(mapStateToProps)(Settings);