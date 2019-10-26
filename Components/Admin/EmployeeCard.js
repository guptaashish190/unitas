import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
class EmployeeCard extends Component {


    _getStatusStyle = () => {

        let color = '#828282';

        switch (this.props.data.status) {
            case 'Offline':
                color = '#aaa';
                break;
            case 'Active':
                color = '#94ff94';
        }

        return ({
            borderRightWidth: 7,
            borderColor: color
        });
    }

    _goToTrackScreen = () => {
        this.props.navigation.navigate('Track');
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this._goToTrackScreen()}>
                <View style={[styles.container, this._getStatusStyle()]}>
                    <Image style={styles.image} source={this.props.data.photo} />
                    <View style={styles.rightContainer}>
                        <Text style={styles.name}>{this.props.data.name}</Text>
                        <Text>ID: {this.props.data.id}</Text>
                        <Text style={styles.statusText}>Status: {this.props.data.status}</Text>

                        <View style={styles.buttons}>
                            <Button style={[styles.button, styles.viewButton]}>
                                <Text>View</Text>
                            </Button>
                            <Button style={[styles.button, styles.viewButton]}>
                                <Text>History</Text>
                            </Button>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        elevation: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        marginLeft: 30,
    },
    image: {
        width: 100,
        height: 100,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    statusText: {
        fontStyle: 'italic'
    }
});

export default EmployeeCard