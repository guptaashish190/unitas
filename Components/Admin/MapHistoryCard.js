import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import Utils from '../../utils';
import { Button } from 'native-base';

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
    }
});

export default MapHistoryCard