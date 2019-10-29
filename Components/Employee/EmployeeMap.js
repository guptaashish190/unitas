import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Spinner, Toast } from 'native-base';
import firebase from 'firebase';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import Utils from '../../utils';
import Colors from '../../constants/Colors';

import { TASK_NAME } from '../../constants/BackgroundTasksConstants';

// Defines background task for setting the location to firebase
import './BackgroundTask';


const FLAG = require('../../assets/images/green_flag.png');

class EmployeeMap extends Component {

    state = {
        showMap: false,
        coordinate: null,
        routeCoordinates: [],
        distanceTravelled: 0,
    }

    componentWillUnmount() {
        TaskManager.unregisterTaskAsync(TASK_NAME);
        this.empLocRef.off('value');
    }

    async componentDidMount() {
        await AsyncStorage.setItem('currentUser', JSON.stringify(this.props.user));

        console.log("starting loc services");
        Location.startLocationUpdatesAsync(TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
        });

        const empLocRef = firebase.database().ref(`emp_locations/${this.props.user.id}/${this.props.user.currentMapSessionID}`)
        this.empLocRef = empLocRef;

        empLocRef.on('value', (snapshot) => {
            const emp_loc = snapshot.val();
            if (emp_loc) {
                this.setState({
                    showMap: true,
                    ...emp_loc
                });
            }
        });
    }
    getMapRegion = () => ({
        latitude: this.state.coordinates.latitude,
        longitude: this.state.coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    _getMap = () => {
        if (this.state.showMap) {

            return (<MapView
                style={styles.mapView}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={this.getMapRegion()}
            >
                {this._getStartMarker()}
                <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} strokeColor={Colors.tintColor} />
                <Marker.Animated
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={this.state.coordinates}
                />
            </MapView>)
        }
        return <Spinner />;
    }

    _getStartMarker = () => {
        if (this.state.routeCoordinates.length > 0) {
            return (
                <Marker coordinate={this.state.routeCoordinates[0]}
                >
                    <Image source={FLAG} style={styles.startMarker} />
                </Marker>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                {this._getMap()}

                {this.state.showMap ? <View style={styles.detailContainer}>
                    <Text style={styles.distance}>Distance Travelled: {Utils.getDistanceString(this.state.distanceTravelled)}</Text>
                </View> : null}

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
    mapView: {
        width: '100%',
        height: '90%',
    },
    detailContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 10,
    },
    startMarker: {
        width: 40,
        height: 40,
    },
    distance: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#888'
    }


});


export default EmployeeMap