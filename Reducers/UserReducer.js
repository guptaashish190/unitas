import {
    STATUS_CHANGE,
    TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE,
    SET_LOCATION,
    SET_CURRENT_USER_MAP_SESSION_ID,
    SET_TYPE,
    SET_PHOTO,
    SET_USER,
    SET_USERNAME
} from "../Actions/Types/UserTypes";


// Initial State
const INITIAL_STATE = {
    user: {
        id: '2ozBcyRGLOZjOR73g6FHhpIYLuz2',
        name: 'Ashish Gupta',
        status: 'Offline',
        photo: "data:image/jpeg;base64,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",
    },
    type: null,
    location: null,
    isEnableLocationModalVisible: false,
    currentMapSessionID: 'axnsuna'
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STATUS_CHANGE:
            let oldState = { ...state };
            oldState.user.status = action.payload;
            return oldState;
        case TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE:
            return { ...state, isEnableLocationModalVisible: !state.isEnableLocationModalVisible };
        case SET_LOCATION:
            return { ...state, location: action.payload }
        case SET_CURRENT_USER_MAP_SESSION_ID:
            return { ...state, user: { ...state.user, currentMapSessionID: action.payload } }
        case SET_PHOTO:
            return { ...state, user: { ...state.user, photo: action.payload } }
        case SET_TYPE:
            return { ...state, type: action.payload }
        case SET_USER:
            return { ...state, user: action.payload }
        case SET_USERNAME:
            return { ...state, user: { ...state.user, name: action.payload } }
        default:
            return state;
    }
};

export default UserReducer;