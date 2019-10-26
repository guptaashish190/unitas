import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Toast, Spinner } from 'native-base';

import Utils from '../../utils';
import Colors from '../../constants/Colors';

const FLAG = require('../../assets/images/green_flag.png');

class EmployeeMap extends Component {

    state = {
        showMap: false,
        coordinate: null,
        routeCoordinates: [],
        distanceTravelled: 0,
    }

    componentDidMount() {
        Utils.getLocation().then((location) => {
            console.log(location);
            this.setState({
                showMap: true,
                coordinate: location
            }, () => {
                this.watchPosition();
            });
        }).catch((err) => {
            console.log(err);
            Toast.show({
                text: 'Couldn\'t set the location',
                type: 'danger'
            });
        });
    }
    watchPosition = () => {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                console.log(position.coords);
                let { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };
                if (Platform.OS === "android") {
                    if (this.marker) {
                        // this.marker._component.animateMarkerToCoordinate(
                        //     newCoordinate,
                        //     500
                        // );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }
                distanceTravelled += Math.floor(Utils.calcDistance(this.state.coordinate, newCoordinate));
                this.setState({
                    coordinate: newCoordinate,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled,
                    prevLatLng: newCoordinate
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    getMapRegion = () => ({
        latitude: this.state.coordinate.latitude,
        longitude: this.state.coordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    _getMap = () => {
        if (this.state.showMap
            && this.state.coordinate.latitude
            && this.state.coordinate.longitude) {

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
                    coordinate={this.state.coordinate}
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
            return `Distance Travelled: ${this.state.distanceTravelled / 1000} Km`
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