import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HeaderComponent from '../../Components/Common/Header';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Spinner, Content } from 'native-base';

import Utils from '../../utils';
import Colors from '../../constants/Colors';

const START_MARKER_IMAGE = require('../../assets/images/green_flag.png');
const FINISH_MARKER_IMAGE = require('../../assets/images/red_flag.png');


class MapScreen extends Component {


    state = {
        map: null,
        mapId: null
    }

    componentDidMount() {
        const map = this.props.navigation.getParam('map', {});
        const mapId = this.props.navigation.getParam('mapId', {});
        this.setState({
            map,
            mapId
        });
    }
    getMapRegion = () => ({
        latitude: this.state.map.coordinates.latitude,
        longitude: this.state.map.coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    componentWillUnmount() {
        clearTimeout(this.fitTimeout);
    }
    _onLayout() {
        this.fitTimeout = setTimeout(() => {
            if (this.state.map) {
                this.mapRef.fitToCoordinates(this.state.map.routeCoordinates, { animated: true })

            }
        }, 1000);

    }
    _getMap = () => {
        if (this.state.map) {

            return (<MapView
                style={styles.mapView}
                showUserLocation
                followUserLocation
                loadingEnabled
                ref={(ref) => { this.mapRef = ref }}
                onLayout={() => this._onLayout()}
                region={this.getMapRegion()}
            >
                <Marker
                    coordinate={this.state.map.routeCoordinates[this.state.map.routeCoordinates.length - 1]}
                >
                    <Image source={FINISH_MARKER_IMAGE} style={styles.startMarker} />
                </Marker>
                <Polyline coordinates={this.state.map.routeCoordinates} strokeWidth={5} strokeColor={Colors.tintColor} />

                <Marker
                    coordinate={this.state.map.routeCoordinates[0]}
                >
                    <Image source={START_MARKER_IMAGE} style={styles.startMarker} />
                </Marker>

            </MapView>)
        }
        return <Spinner />;
    }

    render() {
        return (
            <View style={styles.container}>

                <HeaderComponent
                    goBack={this.props.navigation.goBack}
                    title={`Map: ${this.state.mapId || '-'}`} />
                {this._getMap()}
                <View style={styles.infoContainer}>
                    <Text style={styles.rowText}><Text style={styles.label}>Distance: </Text>{this.state.map ? Utils.getDistanceString(this.state.map.distanceTravelled) : '-'}</Text>
                </View>
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
    infoContainer: {
        position: "absolute",
        bottom: 50,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        elevation: 2
    },
    label: {
        fontWeight: 'bold'
    },
    startMarker: {
        width: 40,
        height: 40,
    },
});

export default MapScreen