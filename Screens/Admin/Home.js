import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import shortid from 'shortid';
import firebase from 'firebase';
import { Spinner } from 'native-base';
// import { employees } from '../../Data/Employees';
import HeaderComponent from '../../Components/Common/Header';
import EmployeeCard from '../../Components/Admin/EmployeeCard';
import Colors from '../../constants/Colors';

class Home extends Component {

    state = {
        employees: null,
        empids: null,
    }

    componentDidMount() {
        firebase.database().ref('Employees/').on('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({
                empids: Object.keys(snapshot.val()),
                employees: snapshot.val(),
            });
        });
    }


    _getEmployeeCards = () => {
        if (!this.state.empids) {
            return <Spinner color={Colors.tintColor} />
        }
        return this.state.empids.map(id => {
            return <EmployeeCard
                navigation={this.props.navigation}
                key={shortid.generate()}
                data={this.state.employees[id]}
                id={id}
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