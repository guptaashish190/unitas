import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import MapView, { Marker } from 'react-native-maps';
import HeaderComponent from '../../Components/Common/Header';

class Track extends Component {

    state = {
        currentLocation: {
            latitude: null,
            longitude: null
        },
        marker: {
            title: "Ashish Gupta",
        }
    }

    componentDidMount() {
        this._getEmployeeLocation();
    }
    _getEmployeeLocation() {
        firebase.database().ref('Employees/2ozBcyRGLOZjOR73g6FHhpIYLuz2').once('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({
                currentLocation: {
                    latitude: snapshot.val().currentLocation.latitude,
                    longitude: snapshot.val().currentLocation.longitude,
                },
            });
        });
        firebase.database().ref('Employees/2ozBcyRGLOZjOR73g6FHhpIYLuz2').on('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({
                currentLocation: {
                    latitude: snapshot.val().currentLocation.latitude,
                    longitude: snapshot.val().currentLocation.longitude,
                },
            });
        });
    }
    _getMap = () => {
        if (this.state.currentLocation.latitude && this.state.currentLocation.longitude) {
            console.log(this.state.currentLocation);
            return (<MapView
                initialRegion={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.mapView}
            >
                <Marker
                    coordinate={this.state.currentLocation}
                    title={this.state.marker.title}
                />
            </MapView>)
        }
        return <Text>Loading</Text>;
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent title={`Tracking: ${this.props.name || "Null"}`} />
                <View>
                    {this._getMap()}
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
        height: '100%',
    },
});

export default Track;