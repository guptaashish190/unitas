import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Screens/Employee/Home';
import History from '../Screens/Common/History';
import MapScreen from '../Screens/Common/MapScreen';
import { Icon } from 'native-base';


export default createAppContainer(createDrawerNavigator({
    EmployeeHome: {

        screen: Home,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => <Icon name="home" type='MaterialCommunityIcons' />
        }
    },
    History: {
        screen: createStackNavigator({
            History: {
                screen: props => <History {...props} type="emp" />
            },
            EmpMapScreen: MapScreen
        },
            {
                defaultNavigationOptions: {
                    header: null
                }
            }),

        navigationOptions: {
            drawerLabel: 'History',
            drawerIcon: () => <Icon fontSize={17} name="history" type='MaterialCommunityIcons' />
        }
    },
}));