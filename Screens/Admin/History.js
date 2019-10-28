import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import shortid from 'shortid';
import HeaderComponent from '../../Components/Common/Header';
import { Content, Spinner } from 'native-base';
import MapHistoryCard from '../../Components/Admin/MapHistoryCard';

class History extends Component {

    state = {
        empid: null,
        user: null,
        maps: null,
        mapIds: null
    }


    componentDidMount() {

        const empid = this.props.navigation.getParam('id', null);
        const user = this.props.navigation.getParam('user', null);
        this.setState({
            empid,
            user
        }, () => {
            this._getEmployeeMaps();
        });
    }

    _getEmployeeMaps = () => {
        if (this.state.empid) {
            firebase.database().ref(`emp_locations/${this.state.empid}`).once('value').then((snapshot) => {
                const locations = snapshot.val();

                this.setState({
                    maps: locations,
                    mapIds: Object.keys(locations),
                });

            });
        }
    }

    _getMaps = () => {
        if (this.state.mapIds) {
            return this.state.mapIds.map(mapId => {
                return <MapHistoryCard
                    navigation={this.props.navigation}
                    key={shortid.generate()}
                    map={this.state.maps[mapId]}
                    mapId={mapId}
                />
            })
        }
        return <Spinner />;
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent title={`${this.state.user ? "History: " + this.state.user.name : "History"}`} />

                <Content>
                    {this._getMaps()}
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
});

export default History