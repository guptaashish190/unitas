import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChooseType from '../Screens/Login/ChooseType';
import AdminLogin from '../Screens/Login/AdminLogin';
import EmployeeLogin from '../Screens/Login/EmployeeLogin';
import AdminNavigator from './AdminNavigator.js';
import EmployeeNavigator from './EmployeeNavigator';

export default createAppContainer(createStackNavigator({
    Employee: EmployeeNavigator,
    ChooseType,
    Admin: AdminNavigator,
    AdminLogin,
    EmployeeLogin,
}, {
    defaultNavigationOptions: {
        header: null
    },
}));