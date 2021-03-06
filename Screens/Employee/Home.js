import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Toast, Spinner } from 'native-base';
import shortid from 'shortid';
import Utils from '../../utils';
import HeaderComponent from '../../Components/Common/Header';
import EmployeeStatusBar from '../../Components/Employee/EmployeeStatusBar';
import { StatusChange, setCurrentMapSessionID, SetUser } from '../../Actions/UserActions';
import EmployeeMap from '../../Components/Employee/EmployeeMap';
import Colors from '../../constants/Colors';
import { Content, Button } from 'native-base';
import ConfirmationModal from '../../Components/Common/ConfirmationModal';

class Home extends Component {

    state = {
        confirmOfflineModal: false,
        loading: false,
        confirmOnlineModal: false,
    }

    _mounted = true;

    componentDidMount() {
        const channelConfig = {
            id: 'channelId',
            name: 'Channel name',
            description: 'Channel description',
            enableVibration: false
        };

    }

    componentWillUnmount() {
        this._mounted = false;
    }

    processStatusChange = (status) => {

        if (status === 'Active') {
            // Check is location is enabled and accessible or not
            // if not dont go online
            this.setState({
                loading: true,
            }, () => {

                Utils.getLocation().then(() => {
                    this.setState({
                        loading: false,
                    });
                    this.toggleConfirmOnlineModal();
                }).catch((err) => {
                    this.setState({
                        loading: false,
                    });
                    Toast.show({
                        text: 'Couldn\'t set the location',
                        type: 'danger',
                    });
                });
            });
        } else {
            this.toggleConfirmOfflineModal();
        }
    }

    goOnline = () => {
        // Set new map session 
        // go online
        firebase.database().ref(`Employees/${this.props.user.id}`).once('value').then(snapshot => {
            const user = snapshot.val();

            const newSessionId = shortid.generate();
            firebase.database().ref(`Employees/${this.props.user.id}`).update({
                currentMapSessionID: newSessionId,
            }).then(() => {
                this.props.setCurrentMapSessionID(newSessionId);
                this._onStatusChange("Active");
            });
        });
    }

    toggleConfirmOfflineModal = () => {
        this.setState({
            confirmOfflineModal: !this.state.confirmOfflineModal
        });
    }
    toggleConfirmOnlineModal = () => {
        this.setState({
            confirmOnlineModal: !this.state.confirmOnlineModal
        });
    }
    _onStatusChange = async (status) => {
        await this.setState({
            confirmOfflineModal: false,
            confirmOnlineModal: false,
        }, async () => {
            try {
                await firebase.database().ref(`Employees/${this.props.user.id}`).update({
                    status: status
                });
                this.props.changeStatus(status);
                if (this._mounted) {
                    this.forceUpdate();
                }
            } catch (err) {
                Toast.show({
                    text: err.message || "Error occured",
                    type: 'danger',
                    duration: 3000,
                });
            }
        });
    }


    _signOut = () => {
        this._onStatusChange('Offline').then(() => {
            console.log("Signing out");
            firebase.auth().signOut().then(() => {
                this.props.setUser(null);
                this.props.navigation.navigate('ChooseType');
            });
        });
    }

    render() {
        if (this.props.user) {

            return (
                <View style={styles.container}>
                    <HeaderComponent
                        rightText="Sign Out"
                        rightFunc={this._signOut}
                        openDrawer={this.props.navigation.openDrawer}
                        title={`Welcome ${this.props.user.name}!`} />
                    <Content contentContainerStyle={{ flex: 1 }}>
                        <EmployeeStatusBar
                            toggleStatus={this.processStatusChange}
                            status={this.props.user.status} />
                        {this.state.loading ? <Text style={styles.loading}>Loading Location...</Text> : null}
                        {this.props.user.status === 'Offline' ?
                            <View style={styles.yourMapWillShow}>
                                <Text style={styles.yourMapWillShowText}>Your map will show up here!</Text>
                            </View>
                            :
                            <EmployeeMap
                                user={this.props.user}
                                location={this.props.location} />
                        }
                        {this.props.user.status === 'Active' ?
                            <Button danger style={styles.goOffline} onPress={() => this.processStatusChange('Offline')}>
                                <Text style={styles.offlineText}>GO OFFLINE</Text>
                            </Button>
                            :
                            null
                        }
                        {/* Confirm offline modal */}
                        <ConfirmationModal
                            isModalVisible={this.state.confirmOfflineModal}
                            toggleModal={this.toggleConfirmOfflineModal}
                            info="Confirm Offline"
                            approvalText="Go Offline"
                            onApprove={() => this._onStatusChange('Offline')}
                        />

                        {/* Confirm Online modal */}
                        <ConfirmationModal
                            isModalVisible={this.state.confirmOnlineModal}
                            toggleModal={this.toggleConfirmOnlineModal}
                            info="Confirm Online"
                            approvalText="Go Online"
                            onApprove={() => this.goOnline()}
                        />
                    </Content>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    yourMapWillShow: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    yourMapWillShowText: {
        fontWeight: 'bold',
        color: Colors.dark,
        fontStyle: 'italic'
    },
    goOffline: {
        margin: 10,
        padding: 10,
        alignSelf: 'center'
    },
    offlineText: {
        fontWeight: 'bold',
        color: 'white'
    },
    loading: {
        alignSelf: 'center',
    }
});

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    location: state.UserReducer.location
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(SetUser(user)),
    changeStatus: status => dispatch(StatusChange(status)),
    setCurrentMapSessionID: mapSessionId => dispatch(setCurrentMapSessionID(mapSessionId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);