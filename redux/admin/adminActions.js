import {
    FETCH_ADMIN_REQUEST,
    FETCH_ADMIN_SUCCESS,
    FETCH_ADMIN_FAILURE,
} from "./adminTypes"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"

export const fetchAdminRequest = () => {
    return {
        type: FETCH_ADMIN_REQUEST,
    }
}

export const fetchAdminSuccess = admin => {
    return {
        type: FETCH_ADMIN_SUCCESS,
        payload: admin,
    }
}

export const fetchAdminFailure = error => {
    return {
        type: FETCH_ADMIN_FAILURE,
        payload: error,
    }
}

export const fetchAdmin = () => {
    return dispatch => {
        dispatch(fetchAdminRequest)
        auth().onAuthStateChanged(admin => {
            if (admin)
                dispatch(fetchAdminSuccess(admin))
            else
                dispatch(fetchAdminFailure("LoginFirst"))
        })
    }
}