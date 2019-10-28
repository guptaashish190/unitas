import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Picker } from 'native-base';

class ChangeStatus extends Component {
    state = {
        selected: "Offline",
    };

    onValueChange(value) {
        this.setState({
            selected: value
        });
        this.props.processStatusChange(value);
    }
    render() {
        return (
            <View style={styles.container}>
                <Picker
                    note
                    mode="dropdown"
                    style={styles.picker}
                    selectedValue={this.state.selected}
                    onValueChange={value => this.onValueChange(value)}
                >
                    <Picker.Item label="Active" value="Active" />
                    <Picker.Item label="Offline" value="Offline" />
                </Picker>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    picker: {
        backgroundColor: 'white',
        elevation: 4,
        borderRadius: 10,
    },
    changeButton: {
        backgroundColor: 'white',
        alignSelf: 'center',
        padding: 10,
    }
});

export default ChangeStatus