import { STATUS_CHANGE, TOGGLE_ENABLE_LOCATION_MODAL_VISIBLE, SET_LOCATION } from "../Actions/Types/UserTypes";

// Initial State
const INITIAL_STATE = {
    user: {
        name: 'Ashish Gupta',
        status: 'Offline',
        id: '2ozBcyRGLOZjOR73g6FHhpIYLuz2',
        photo: "http://keenthemes.com/preview/metronic/theme/as...",
    },
    location: null,
    isEnableLocationModalVisible: false,
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
        default:
            return state;
    }
};

export default UserReducer;