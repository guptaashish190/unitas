import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'firebase';
import MapView, { Marker, Polyline } from 'react-native-maps';
import HeaderComponent from '../../Components/Common/Header';
import { Toast, Spinner, Content } from 'native-base';

import Colors from '../../constants/Colors';

const FLAG = require('../../assets/images/green_flag.png');

class Track extends Component {

    state = {
        user: null,
        empid: null,
        showMap: false,
        coordinate: null,
        routeCoordinates: [],
        distanceTravelled: 0,
    }

    componentWillUnmount() {
        this.empLocRef.off('value');
        this.empRef.off('value');
    }

    componentDidMount() {

        const empid = this.props.navigation.getParam('id', null);
        const user = this.props.navigation.getParam('user', null);
        console.log(user);
        this.setState({
            empid,
            user
        }, () => {
            if (this.state.empid) {
                this._getEmployeeLocation();
            }
        });
    }
    _getEmployeeLocation() {
        const empRef = firebase.database().ref(`Employees/${this.state.empid}`);
        const empLocRef = firebase.database().ref(`emp_locations/${this.state.empid}/${this.state.user.currentMapSessionID}`);

        this.empRef = empRef;
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
        empRef.on('value', (snapshot) => {
            const employeeDetail = snapshot.val();
            if (employeeDetail !== null && employeeDetail.status !== 'Active') {
                Toast.show({
                    text: `${employeeDetail.name} is currently offline.`,
                    buttonText: 'Back',
                    onClose: () => {
                        this.props.navigation.goBack();
                    }
                });
                return;
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

    _getDistanceString = () => {
        if (this.state.distanceTravelled > 1000) {
            return `Distance Travelled: ${(this.state.distanceTravelled / 1000).toFixed(2)} Km`
        }
        return `Distance Travelled: ${Math.round(this.state.distanceTravelled)} m`
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent title={`Tracking: ${this.state.user ? this.state.user.name : ''}`} />
                <Content contentContainerStyle={{ flex: 1 }}>
                    {this._getMap()}
                    {this.state.showMap ?
                        <View style={styles.detailContainer}>
                            <Text style={styles.distance}>{this._getDistanceString()}</Text>
                        </View> : null}
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default Track;