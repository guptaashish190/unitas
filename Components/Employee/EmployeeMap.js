import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Toast } from 'native-base';

import Utils from '../../utils';

class EmployeeMap extends Component {

    state = {
        showMap: false,
    }

    componentDidMount() {
        Utils.getLocation().then(() => {
            this.setState({
                showMap: true,
            });
        }).catch((err) => {
            console.log(err);
            Toast.show({
                text: 'Couldn\'t set the location',
                type: 'danger'
            });
        });
    }

    _getMap = () => {
        if (this.state.showMap
            && this.props.location.latitude
            && this.props.location.longitude) {

            const initialRegion = {
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };

            return (<MapView
                initialRegion={initialRegion}
                region={initialRegion}
                style={styles.mapView}
            >
                <Marker
                    coordinate={this.props.location}
                    title="You Are Here"
                />
            </MapView>)
        }
        return <Text>Loading</Text>;
    }

    render() {
        return (
            <View style={styles.container}>
                {this._getMap()}
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
});


export default EmployeeMap