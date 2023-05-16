import { LOGIN, STORE_DEVICES, STORE_VIEWABLE_DEVICE, STORE_EDITABLE_DEVICE, STORE_SUPPORTS } from "./actions";

const initialState = {
    user: {},
    devices: null,
    supports: null,
    editableDevice: null,
    viewableDevice: null,
}

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload}        
        case STORE_DEVICES:
            return {...state, devices: action.payload}
        case STORE_SUPPORTS:
            return {...state, supports: action.payload}
        case STORE_EDITABLE_DEVICE:
            return {...state, editableDevice: action.payload}
        case STORE_VIEWABLE_DEVICE:
            return {...state, viewableDevice: action.payload}
        default:
            return {...state}
    }
}

export default rootReducer



