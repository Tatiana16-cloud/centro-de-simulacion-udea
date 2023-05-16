export const LOGIN = "LOGIN"
export const STORE_DEVICES = "DEVICES"
export const STORE_EDITABLE_DEVICE = "EDITABLE_DEVICE"
export const STORE_VIEWABLE_DEVICE = "VIEWABLE_DEVICE"
export const STORE_SUPPORTS = "SUPPORTS"


export const logInSuccess = ({user}) => {
    return async function (dispatch) {
        dispatch({type: LOGIN, payload: user})
    }
}

export const storeDevices = ({devices}) => {
    return async function (dispatch) {
        dispatch({type: STORE_DEVICES, payload: devices})
    }
}

export const storeSupports = ({supports}) => {
    return async function (dispatch) {
        dispatch({type: STORE_SUPPORTS, payload: supports})
    }
}

export const storeEditableDevice = ({device}) => {
    return async function (dispatch) {
        dispatch({type: STORE_EDITABLE_DEVICE, payload: device})
    }
}

export const storeViewableDevice = ({device}) => {
    return async function (dispatch) {
        dispatch({type: STORE_VIEWABLE_DEVICE, payload: device})
    }
}