import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import * as IntentLauncher from 'expo-intent-launcher';

import Colors from '../constants/Colors';
import { ToggleEnableLocationModal } from '../Actions/UserActions';

class LocationEnableModal extends Component {

    _openSettings = () => {
        this.props.toggleModal();
        if (Platform.OS == 'ios') {
            Linking.openURL('app-settings:');
        } else {
            IntentLauncher.startActivityAsync(
                IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    backdropOpacity={0}
                    useNativeDriver
                    isVisible={this.props.isModalVisible}
                    onRequestClose={() => this.props.toggleModal()}
                >
                    <View style={styles.main}>
                        <Text style={styles.info}>
                            To continue, please turn on location services on your mobile.
                        </Text>
                        <View style={styles.options}>
                            <TouchableOpacity onPress={() => this.props.toggleModal()}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._openSettings()}>
                                <Text style={styles.cancel}>Go To Settings</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleModal: () => dispatch(ToggleEnableLocationModal()),
})

const mapStateToProps = state => {
    console.log(state);
    return ({
        isModalVisible: state.UserReducer.isEnableLocationModalVisible,
    })
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        margin: 20,
        padding: 10,
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 7,
    },
    info: {
        fontSize: 17,
        lineHeight: 24,
        color: '#999'
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancel: {
        margin: 10,
        fontSize: 17,
        color: Colors.secondary,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationEnableModal)