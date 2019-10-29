
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Toast } from 'native-base';
import haversine from 'haversine';
import Geocoder from 'react-native-geocoding';

import store from './store';
import { ToggleEnableLocationModal, SetLocation } from './Actions/UserActions';

module.exports = {

    getLocation: () => {
        return new Promise((resolve, reject) => {

            // check the status -> granted or denied
            Permissions.askAsync(Permissions.LOCATION).then(statusObj => {
                // If granted
                if (statusObj.status === 'granted') {
                    Location.getProviderStatusAsync().then(status => {
                        if (status.locationServicesEnabled) {
                            // if granted and location services enabled
                            // get location .. and set state
                            console.log("enable");
                            Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then(location => {
                                console.log("loc");
                                const loc = {
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude
                                }
                                store.dispatch(SetLocation(loc));
                                return resolve(loc);
                            }).catch(err => {
                                console.log("no location", err);
                                return reject(err.message);
                            });
                        } else {
                            store.dispatch(ToggleEnableLocationModal());
                            // If no loc services are enabled
                            console.log('no location services enabled');
                            return reject('noLocationServices');
                        }
                    });

                } else {
                    // If not granted show toast
                    Toast.show({
                        text: "Please give location permissions",
                        type: "warning"
                    });
                    return reject('noLocationPermissions');
                }
            });

        });
    },

    calcDistance: (prevLatLng, newLatLng) => {
        const distance = haversine(prevLatLng, newLatLng, { unit: 'meter' }) || 0;
        return Math.round(distance);
    },
    reverseGeocode: async (latlng) => {
        const json = await Geocoder.from(latlng);

        var location = json.results[0].address_components;
        console.log("location", location);
        return location;
    },

    getDistanceString: (distance) => {
        if (!distance) {
            return '-';
        }
        if (distance > 1000) {
            return `${(distance / 1000).toFixed(2)} Km`
        }
        return `${Math.round(distance)} m`
    },
    // Map the address string from the address component
    getAddressStringFromLocationObject: (locationObject) => {
        if (locationObject) {
            if (locationObject.locationString) {
                return locationObject.locationString;
            }
            if (locationObject.addressComponent) {
                let address = [];
                console.log(locationObject);
                // for each object in the address component
                locationObject.addressComponent.forEach(comp => {
                    // only add some parts of the address to the address string
                    if (comp.types.indexOf('sublocality_level_1') > -1 || comp.types.indexOf('locality') > -1 || comp.types.indexOf('administrative_area_level_1') > -1) {
                        address.push(comp.long_name);
                    }
                });
                return address.join(', ');
            }
        }
        return '';
    },
    formatAMPM: (d) => {
        const date = new Date(d);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
}