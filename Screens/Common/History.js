import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import shortid from 'shortid';
import HeaderComponent from '../../Components/Common/Header';
import { Content, Spinner, Toast } from 'native-base';
import MapHistoryCard from '../../Components/Common/MapHistoryCard';

class History extends Component {

    state = {
        empid: null,
        user: null,
        maps: null,
        mapIds: null,
        error: null,
        loading: false,
    }


    componentDidMount() {

        if (this.props.type === 'emp') {
            this.setState({
                empid: this.props.user.id,
                user: this.props.user,
            }, () => {
                this._getEmployeeMaps();
            });
        } else {
            const empid = this.props.navigation.getParam('id', null);
            const user = this.props.navigation.getParam('user', null);
            this.setState({
                empid,
                user
            }, () => {
                this._getEmployeeMaps();
            });
        }
    }

    _getEmployeeMaps = () => {
        console.log(this.state);
        this.setState({
            loading: true
        }, () => {

            if (this.state.empid) {
                firebase.database().ref(`emp_locations/${this.state.empid}`).once('value').then((snapshot) => {
                    const locations = snapshot.val();
                    if (locations) {
                        this.setState({
                            maps: locations,
                            mapIds: Object.keys(locations),
                            loading: false,
                        });
                    } else {
                        this.setState({
                            error: 'No Locations',
                            loading: false
                        });
                    }

                }).catch(err => {
                    Toast.show({
                        text: err.message,
                        type: 'danger'
                    });
                });
            }
        });
    }

    _getMaps = () => {
        if (this.state.mapIds) {
            return this.state.mapIds.map(mapId => {
                return <MapHistoryCard
                    delete={this.deleteHistoryCard}
                    navigation={this.props.navigation}
                    key={shortid.generate()}
                    map={this.state.maps[mapId]}
                    mapId={mapId}
                />
            })
        }
    }

    deleteHistoryCard = (id) => {
        firebase.database().ref(`emp_locations/${this.state.empid}/${id}`).remove().then(() => {
            this._getEmployeeMaps();
            Toast.show({
                text: 'Deleted Successfully',
                duration: 1500,
                type: 'success',
            });
        }).catch(() => {
            Toast.show({
                text: 'Error deleting the map',
                duration: 1500,
                type: 'danger'
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    goBack={this.props.navigation.goBack}
                    loadingEnable
                    reload={this._getEmployeeMaps}
                    loading={this.state.loading}
                    openDrawer={this.props.navigation.openDrawer}
                    title={`${this.state.user ? "History: " + this.state.user.name : "History"}`} />

                <Content>
                    {this._getMaps()}
                    <Text style={styles.errorText}>{this.state.error}</Text>
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
    errorText: {
        margin: 20,
        fontSize: 17,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#aaa'
    }
});

const mapStateToProps = state => ({
    user: state.UserReducer.user,
});

export default connect(mapStateToProps)(History);