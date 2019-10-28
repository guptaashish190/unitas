import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import shortid from 'shortid';
import HeaderComponent from '../../Components/Common/Header';
import EmployeeStatusBar from '../../Components/Employee/EmployeeStatusBar';
import ChangeStatus from '../../Components/Employee/ChangeStatus';
import { StatusChange, setCurrentMapSessionID } from '../../Actions/UserActions';
import EmployeeMap from '../../Components/Employee/EmployeeMap';
import Colors from '../../constants/Colors';
import { Content, Button } from 'native-base';
import ConfirmationModal from '../../Components/Common/ConfirmationModal';

class Home extends Component {

    state = {
        confirmOfflineModal: false,
        confirmOnlineModal: false,
    }

    processStatusChange = (status) => {

        if (status === 'Active') {
            this.toggleConfirmOnlineModal();
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
            firebase.database().ref(`Employees/${this.props.user.id}`).set({
                ...user,
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
    _onStatusChange = (status) => {
        this.setState({
            confirmOfflineModal: false,
            confirmOnlineModal: false,
        }, () => {
            this.props.changeStatus(status);
            this.forceUpdate();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    openDrawer={this.props.navigation.openDrawer}
                    title={`Welcome ${this.props.user.name}!`} />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <EmployeeStatusBar
                        toggleStatus={this.processStatusChange}
                        status={this.props.user.status} />

                    {this.props.user.status === 'Offline' ?
                        <View style={styles.yourMapWillShow}>
                            <Text style={styles.yourMapWillShowText}>Your map will show up here!</Text>
                        </View>
                        :
                        <EmployeeMap user={this.props.user} location={this.props.location} />
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
    }
});

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    location: state.UserReducer.location
});

const mapDispatchToProps = dispatch => ({
    changeStatus: status => dispatch(StatusChange(status)),
    setCurrentMapSessionID: mapSessionId => dispatch(setCurrentMapSessionID(mapSessionId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);