import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import HeaderComponent from '../../Components/Common/Header';
import EmployeeStatusBar from '../../Components/Employee/EmployeeStatusBar';
import ChangeStatus from '../../Components/Employee/ChangeStatus';
import { StatusChange } from '../../Actions/UserActions';

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

const mapStateToProps = state => ({
    user: state.UserReducer.user,
});

const mapDispatchToProps = dispatch => ({
    changeStatus: status => dispatch(StatusChange(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);