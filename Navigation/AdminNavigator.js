import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Track from '../Screens/Admin/Track';
import AdminHome from '../Screens/Admin/Home';

export default createAppContainer(createStackNavigator({
    AdminHome,
    Track: Track,
}, {
    defaultNavigationOptions: {
        header: null
    },
}));