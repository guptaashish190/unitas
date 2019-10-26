import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import MapView from 'react-native-maps';

class Track extends Component {

    state = {
        currentLocation: {
            latitude: null,
            longitude: null
        }
    }

    componentDidMount() {
        firebase.database().ref('Employees/2ozBcyRGLOZjOR73g6FHhpIYLuz2').once('value', (snapshot) => {
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
            return (<MapView
                region={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{ alignSelf: 'stretch', height: 400 }}
            />)
        }
        return <Text>Loading</Text>;
    }

    render() {
        return (
            <View style={styles.container}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
});

export default Track;