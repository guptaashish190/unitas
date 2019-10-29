import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginNavigator from './LoginNavigator';
import Loading from '../Screens/Common/Loading';
import EmployeeNavigator from './EmployeeNavigator';
import AdminNavigator from './AdminNavigator';

export default createAppContainer(createSwitchNavigator({
    LoginNavigator,
    Employee: EmployeeNavigator,
    Admin: AdminNavigator,
    Loading
}, {
    defaultNavigationOptions: {
        header: null
    },
}));