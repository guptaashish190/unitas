import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Image, AsyncStorage } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Toast, Spinner } from 'native-base';
import firebase from 'firebase';
import * as Location from 'expo-location';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import Utils from '../../utils';
import Colors from '../../constants/Colors';

const FLAG = require('../../assets/images/green_flag.png');

const TASK_NAME = "watch_position";
TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (data) {
        const user = await EmployeeMap.getCurrentUser();
        const coordinates = {
            latitude: data.locations[0].coords.latitude,
            longitude: data.locations[0].coords.longitude,
        }
        console.log(coordinates);
        EmployeeMap.setLocationCoordinates(coordinates, user.id);
    }
});

class EmployeeMap extends Component {

    state = {
        showMap: false,
        coordinate: null,
        routeCoordinates: [],
        distanceTravelled: 0,
    }

    static setLocationCoordinates = (location, id) => {
        firebase.database().ref(`emp_locations/${id}`).once('value', function (snapshot) {

            const emp_location = snapshot.val();
            if (emp_location === null) {
                const ref1 = firebase.database().ref(`emp_locations/${id}`);
                this.ref1 = ref1;
                ref1.set({
                    distanceTravelled: 0,
                    coordinates: location,
                    routeCoordinates: [location],
                });
                return;
            }

            let distanceTravelled = emp_location.distanceTravelled;
            if (emp_location.coordinates) {
                distanceTravelled += Utils.calcDistance(location, emp_location.coordinates);
            }

            const ref2 = firebase.database().ref(`emp_locations/${id}`);
            this.ref2 = ref2;
            ref2.set({
                distanceTravelled,
                coordinates: location,
                routeCoordinates: [...emp_location.routeCoordinates, location],
            });

        });

    }

    static getCurrentUser = async () => {
        const currentUser = await AsyncStorage.getItem('currentUser');
        return JSON.parse(currentUser);
    }
    componentDidMount = async () => {
        // Utils.getLocation().then((location) => {
        //     console.log(location);
        //     this.setState({
        //         showMap: true,
        //         coordinate: location
        //     }, () => {



        //     });
        // }).catch((err) => {
        //     console.log(err);
        //     Toast.show({
        //         text: 'Couldn\'t set the location',
        //         type: 'danger'
        //     });
        // });
        await AsyncStorage.setItem('currentUser', JSON.stringify(this.props.user));

        console.log("starting loc services");
        Location.startLocationUpdatesAsync(TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
        });

        firebase.database().ref(`emp_locations/${this.props.user.id}`).on('value', (snapshot) => {
            const emp_loc = snapshot.val();
            this.setState({
                showMap: true,
                ...emp_loc
            });
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

    _getDistanceString = () => {
        if (this.state.distanceTravelled > 1000) {
            return `Distance Travelled: ${(this.state.distanceTravelled / 1000).toFixed(2)} Km`
        }
        return `Distance Travelled: ${this.state.distanceTravelled} m`
    }

    render() {
        return (
            <View style={styles.container}>
                {this._getMap()}

                {this.state.showMap ? <View style={styles.detailContainer}>
                    <Text style={styles.distance}>{this._getDistanceString()}</Text>
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