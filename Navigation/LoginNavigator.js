import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChooseType from '../Screens/Login/ChooseType';
import AdminLogin from '../Screens/Login/AdminLogin';
import EmployeeLogin from '../Screens/Login/EmployeeLogin';
import RegisterAdmin from '../Screens/Login/RegisterAdmin';
import RegisterEmployee from '../Screens/Login/RegisterEmployee';

export default createAppContainer(createStackNavigator({
    ChooseType,
    AdminLogin,
    RegisterAdmin,
    EmployeeLogin,
    RegisterEmployee
}, {
    defaultNavigationOptions: {
        header: null
    },
}));