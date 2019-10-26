import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Admin/Home';

export default createAppContainer(createStackNavigator({
    AdminHome: Home
}, {
    defaultNavigationOptions: {
        header: null
    },
}));