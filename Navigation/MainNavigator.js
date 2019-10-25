import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChooseType from '../Screens/Login/ChooseType.js';
import AdminLogin from '../Screens/Login/AdminLogin.js';
import EmployeeLogin from '../Screens/Login/EmployeeLogin';

// Login Stack Navigation

export default createAppContainer(createStackNavigator({
    ChooseType,
    AdminLogin,
    EmployeeLogin,
}, {
    defaultNavigationOptions: {
        header: null
    },
}));