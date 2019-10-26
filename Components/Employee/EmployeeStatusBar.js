import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
class EmployeeStatusBar extends Component {

    _getStatusColor = () => {
        let color = Colors.offline;
        switch (this.props.status) {
            case 'Offline':
                color = Colors.offline;
                break;
            case 'Active':
                color = Colors.active;
                break;
            default:
                color = Colors.offline;
        }
        return { backgroundColor: color };
    }


    render() {
        return (
            <View style={[styles.container, this._getStatusColor()]}>
                <Text style={styles.statusText}>Current Status: </Text>
                <Text style={styles.status}>{this.props.status}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        padding: 10
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#fff",
    },
    status: {
        fontSize: 17,
        fontStyle: 'italic',
        color: '#fff'
    }
});

export default EmployeeStatusBar