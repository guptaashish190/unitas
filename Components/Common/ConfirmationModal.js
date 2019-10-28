import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../constants/Colors';

class ConfirmationModal extends Component {
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
                            {this.props.info}
                        </Text>
                        <View style={styles.options}>
                            <TouchableOpacity onPress={() => this.props.toggleModal()}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.onApprove()}>
                                <Text style={styles.cancel}>{this.props.approvalText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
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

export default ConfirmationModal