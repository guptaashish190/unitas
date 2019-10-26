import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import HeaderComponent from '../../Components/Common/Header';
import EmployeeStatusBar from '../../Components/Employee/EmployeeStatusBar';
import ChangeStatus from '../../Components/Employee/ChangeStatus';
import { StatusChange } from '../../Actions/UserActions';
import EmployeeMap from '../../Components/Employee/EmployeeMap';
import Colors from '../../constants/Colors';

class Home extends Component {

    onStatusChange = status => {
        this.props.changeStatus(status);
        this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent title={`Welcome ${this.props.user.name}!`} />

                <EmployeeStatusBar status={this.props.user.status} />

                <ChangeStatus onStatusChange={this.onStatusChange} />

                {this.props.user.status === 'Offline' ?
                    <View style={styles.yourMapWillShow}>
                        <Text style={styles.yourMapWillShowText}>Your map will show up here!</Text>
                    </View>
                    :
                    <EmployeeMap location={this.props.location} />
                }

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