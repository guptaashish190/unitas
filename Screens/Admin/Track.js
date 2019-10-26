import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import MapView, { Marker } from 'react-native-maps';
import HeaderComponent from '../../Components/Common/Header';
import { Toast } from 'native-base';

class Track extends Component {

    state = {
        currentLocation: {
            latitude: null,
            longitude: null
        },
        marker: {
            title: "Ashish Gupta",
        },
        empid: null
    }

    componentDidMount() {

        const empid = this.props.navigation.getParam('id', null);
        this.setState({
            empid
        }, () => {
            if (this.state.empid) {
                this._getEmployeeLocation();
            }
        });
    }
    _getEmployeeLocation() {
        firebase.database().ref(`Employees/${this.state.empid}`).on('value', (snapshot) => {

            const employeeDetail = snapshot.val();
            console.log(employeeDetail);
            if (employeeDetail.status === 'Offline') {
                Toast.show({
                    text: `${employeeDetail.name} is currently offline.`,
                    buttonText: 'Back',
                    onClose: () => {
                        this.props.navigation.goBack();
                    }
                });
            }
            this.setState({
                currentLocation: {
                    latitude: employeeDetail.currentLocation.latitude,
                    longitude: employeeDetail.currentLocation.longitude,
                },
            });
        });
    }
    _getMap = () => {
        if (this.state.currentLocation.latitude && this.state.currentLocation.longitude) {
            console.log(this.state.currentLocation);

            const initialRegion = {
                latitude: this.state.currentLocation.latitude,
                longitude: this.state.currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };

            return (<MapView
                initialRegion={initialRegion}
                region={initialRegion}
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