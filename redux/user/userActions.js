import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_CHECK_REQUEST,
    USER_LOGIN_CHECK_SUCCESS,
    USER_LOGIN_CHECK_FAILURE,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAILURE,
    USER_MARKS_UPDATE_REQUEST,
    USER_MARKS_UPDATE_SUCCESS,
    USER_MARKS_UPDATE_FAILURE,
} from "./userTypes"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"

export const userRegisterRequest = () => {
    return {
        type: USER_REGISTER_REQUEST,
    }
}

export const userRegisterSuccess = user => {
    return {
        type: USER_REGISTER_SUCCESS,
        payload: user,
    }
}

export const userRegisterFailure = error => {
    return {
        type: USER_REGISTER_FAILURE,
        payload: error,
    }
}

export const userRegister = data => {
    return dispatch => {
        dispatch(userRegisterRequest())
        auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                delete data.password
                let key = database().ref().push().key
                data.uid = key
                database().ref(`/${key}`).update(data)
                    .then(() => dispatch(userRegisterSuccess(data)))
            })
            .catch((error) => {
                dispatch(userRegisterFailure(error.message))
            })
    }
}

export const userLoginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST,
    }
}

export const userLoginSuccess = user => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: user,
    }
}

export const userLoginFailure = error => {
    return {
        type: USER_LOGIN_FAILURE,
        payload: error,
    }
}

export const userLogin = data => {
    return dispatch => {
        dispatch(userLoginRequest())
        auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                database().ref("/").orderByChild("email").equalTo(data.email).once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        dispatch(userLoginSuccess(child.val())) // NOW THE CHILDREN PRINT IN ORDER    
                    });
                })
            })
            .catch((error) => {
                dispatch(userLoginFailure(error.message))
            })
    }
}

export const userLoginCheckRequest = () => {
    return {
        type: USER_LOGIN_CHECK_REQUEST,
    }
}

export const userLoginCheckSuccess = user => {
    return {
        type: USER_LOGIN_CHECK_SUCCESS,
        payload: user,
    }
}

export const userLoginCheckFailure = error => {
    return {
        type: USER_LOGIN_CHECK_FAILURE,
        payload: error,
    }
}

export const userLoginCheck = () => {
    return dispatch => {
        dispatch(userLoginCheckRequest())
        auth().onAuthStateChanged(user => {
            if (user) {
                database().ref("/").orderByChild("email").equalTo(user.email).once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        dispatch(userLoginCheckSuccess(child.val())) // NOW THE CHILDREN PRINT IN ORDER    
                    });
                })
            }
            else
                dispatch(userLoginCheckFailure("Please Login To Continue"))
        })
    }
}

export const userLogoutRequest = () => {
    return {
        type: USER_LOGOUT_REQUEST,
    }
}

export const userLogoutSuccess = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    }
}

export const userLogoutFailure = error => {
    return {
        type: USER_LOGOUT_FAILURE,
        payload: error,
    }
}

export const userLogout = () => {
    return dispatch => {
        dispatch(userLogoutRequest())
        auth().signOut()
            .then(() => dispatch(userLogoutSuccess()))
            .catch((error) => dispatch(userLogoutFailure(error)))
    }
}

export const userProfileUpdateRequest = () => {
    return {
        type: USER_PROFILE_UPDATE_REQUEST,
    }
}

export const userProfileUpdateSuccess = user => {
    return {
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: user,
    }
}

export const userProfileUpdateFailure = error => {
    return {
        type: USER_PROFILE_UPDATE_FAILURE,
        payload: error,
    }
}

export const userProfileUpdate = (data, uid) => {
    return dispatch => {
        dispatch(userProfileUpdateRequest())
        database().ref(`/${uid}`).update(data)
            .then(() => {
                dispatch(userProfileUpdateSuccess(data))
            })
            .catch((error) => dispatch(userProfileUpdateFailure(error)))
    }
}

export const userMarksUpdateRequest = () => {
    return {
        type: USER_MARKS_UPDATE_REQUEST,
    }
}

export const userMarksUpdateSuccess = user => {
    return {
        type: USER_MARKS_UPDATE_SUCCESS,
        payload: user,
    }
}

export const userMarksUpdateFailure = error => {
    return {
        type: USER_MARKS_UPDATE_FAILURE,
        payload: error,
    }
}

export const userMarksUpdate = (data, uid) => {
    return dispatch => {
        dispatch(userMarksUpdateRequest())
        database().ref(`/${uid}`).update({report: data})
            .then(() => 
                dispatch(userMarksUpdateSuccess(data))
            )
            .catch((error) => dispatch(userMarksUpdateFailure(error)))
    }
}