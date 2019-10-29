import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { Header, Left, Body, Right, Button, Icon } from 'native-base';
import Colors from '../../constants/Colors';

import Logo from '../../assets/images/icon.png';
// Adaptive Header component
// Adds back button if goBack prop is passed else
// logo will be displayed
// Adds next button is next prop is passed

class HeaderComponent extends Component {

    // left side of navbar
    _getLeft = () => {
        if (this.props.openDrawer) {
            return (
                <Button onPress={() => this.props.openDrawer()} transparent>
                    <Icon name='menu' style={{ color: '#000' }} />
                </Button>
            );
        } else if (this.props.goBack) {
            return (
                <Button onPress={() => this.props.goBack()} transparent>
                    <Icon name='arrow-back' style={{ color: '#000' }} />
                </Button>
            );
        }
        else {
            return (
                <Image style={styles.icon} source={Logo} />
            );
        }
    }
    _getRightFunc = () => {
        if (this.props.rightText && this.props.rightFunc) {
            return (
                <TouchableOpacity onPress={() => this.props.rightFunc()}>
                    <Text style={styles.rightTextFunc}>{this.props.rightText}</Text>
                </TouchableOpacity>
            )

        }

    }

    _getBody = () => {
        if (this.props.onTitlePress) {
            return (
                <Body style={styles.searchBackgroundStyle}>
                    <TouchableOpacity
                        style={styles.searchTouchable}
                        onPress={() => requestAnimationFrame(() => this.props.onTitlePress())}>
                        <Text style={styles.searchTitle}>{this.props.title}</Text>
                    </TouchableOpacity>
                </Body>
            )
        }
        return (
            <Body>
                <Text style={styles.title}>{this.props.title}</Text>
            </Body>
        )
    }
    // Right side of the header (Next button)
    _getRight = () => {
        if (this.props.next) {
            return (
                <TouchableOpacity onPress={() => this.props.next()}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.rightText}>Next</Text>
                        <Icon name="arrow-forward" style={{ color: 'white' }} />
                    </View>
                </TouchableOpacity>
            )
        }
        return null
    }

    render() {
        return (
            <Header style={styles.header}>
                {this._getLeft()}
                {this._getBody()}
                {this._getRight()}
                {this._getRightFunc()}
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    title: {
        color: '#555'
    },
    searchTitle: {
        color: '#000',
        marginLeft: 10,
    },
    leftContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBackgroundStyle: {
        borderRadius: 4,
        height: '80%',
        backgroundColor: '#ffffffdd',
        justifyContent: 'center'
    },
    searchTouchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    rightText: {
        color: 'white',
        marginRight: 10,
    },
    rightContainer: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center',
    },
    rightTextFunc: {
        fontWeight: 'bold',
        color: '#ff1f1f'
    }
});

export default HeaderComponent