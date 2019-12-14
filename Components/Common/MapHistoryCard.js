import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import Utils from '../../utils';
import { Button, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MapHistoryCard extends Component {

    _getDateString = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            return date.toDateString() + ` (${Utils.formatAMPM(date)})`;
        }
        return '-';
    }

    _showMap = () => {
        this.props.navigation.navigate('MapScreen', { mapId: this.props.mapId, map: this.props.map });
    }

    render() {
        return (
            <View style={styles.container}>

                {/* Close Button */}
                <View style={styles.close}>
                    <TouchableOpacity onPress={() => this.props.delete(this.props.mapId)}>
                        <Icon style={{ color: '#ff5959' }} name="close-circle" />
                    </TouchableOpacity>
                </View>
                {/* Map Id */}
                <Text style={styles.rowText}><Text style={styles.label}>Map ID: </Text>{this.props.mapId}</Text>

                {/* From time */}
                <Text style={styles.rowText}><Text style={styles.label}>From: </Text>{this._getDateString(this.props.map.date)}</Text>

                {/* To Time */}
                <Text style={styles.rowText}><Text style={styles.label}>To: </Text>{this._getDateString(this.props.map.dateTo)}</Text>

                {/* Distance Travelled */}
                <Text style={styles.rowText}><Text style={styles.label}>Distance: </Text>{Utils.getDistanceString(this.props.map.distanceTravelled)}</Text>

                <Button onPress={() => this._showMap()} style={styles.viewMapButton}>
                    <Text>
                        View Map
                    </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        margin: 10,
        elevation: 10
    },
    label: {
        fontWeight: 'bold'
    },
    viewMapButton: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        alignSelf: 'flex-start'
    },
    close: {
        position: 'absolute',
        top: -10,
        right: 20,
        borderRadius: 100,
        padding: 1,
    }
});

export default MapHistoryCard