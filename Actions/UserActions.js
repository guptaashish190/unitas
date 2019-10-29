import {
    STATUS_CHANGE,
    TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE,
    SET_LOCATION,
    SET_CURRENT_USER_MAP_SESSION_ID,
    SET_USER,
    SET_TYPE,
    SET_PHOTO,
    SET_USERNAME
} from "./Types/UserTypes";

export function StatusChange(status) {
    return {
        type: STATUS_CHANGE,
        payload: status
    }
}
export function ToggleEnableLocationModal() {
    return {
        type: TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE,
    }
}
export function SetLocation(location) {
    return {
        type: SET_LOCATION,
        payload: location
    }
}
export function setCurrentMapSessionID(i) {
    return {
        type: SET_CURRENT_USER_MAP_SESSION_ID,
        payload: i
    }
}
export function SetUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function SetType(type) {
    return {
        type: SET_TYPE,
        payload: type
    }
}
export function SetPhoto(url) {
    return {
        type: SET_PHOTO,
        payload: url
    }
}
export function SetUsername(name) {
    return {
        type: SET_USERNAME,
        payload: name
    }
}