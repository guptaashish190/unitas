import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Employee/Home';


export default createAppContainer(createStackNavigator({
    EmployeeHome: Home

}, {
    defaultNavigationOptions: {
        header: null
    },
}));