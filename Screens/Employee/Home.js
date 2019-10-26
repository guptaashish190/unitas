import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import HeaderComponent from '../../Components/Common/Header';
import EmployeeStatusBar from '../../Components/Employee/EmployeeStatusBar';
import ChangeStatus from '../../Components/Employee/ChangeStatus';
import { StatusChange } from '../../Actions/UserActions';
import EmployeeMap from '../../Components/Employee/EmployeeMap';
import Colors from '../../constants/Colors';
import { Content, Button } from 'native-base';

class Home extends Component {

    onStatusChange = status => {
        this.props.changeStatus(status);
        this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent title={`Welcome ${this.props.user.name}!`} />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <EmployeeStatusBar status={this.props.user.status} />

                    <ChangeStatus onStatusChange={this.onStatusChange} />

                    {this.props.user.status === 'Offline' ?
                        <View style={styles.yourMapWillShow}>
                            <Text style={styles.yourMapWillShowText}>Your map will show up here!</Text>
                        </View>
                        :
                        <EmployeeMap user={this.props.user} location={this.props.location} />
                    }
                    {this.props.user.status === 'Active' ?
                        <Button danger style={styles.goOffline} onPress={() => this.onStatusChange('Offline')}>
                            <Text style={styles.offlineText}>GO OFFLINE</Text>
                        </Button>
                        :
                        null
                    }
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);