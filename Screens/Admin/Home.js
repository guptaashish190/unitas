import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderComponent from '../../Components/Common/Header';
import shortid from 'shortid';

import { employees } from '../../Data/Employees';
import EmployeeCard from '../../Components/Admin/EmployeeCard';

class Home extends Component {

    _getEmployeeCards = () => {
        return employees.map(emp => {
            return <EmployeeCard
                navigation={this.props.navigation}
                key={shortid.generate()}
                data={emp}
            />
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent title="Employee Status" />

                <ScrollView>
                    {this._getEmployeeCards()}
                </ScrollView>
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

export default Home