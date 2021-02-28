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

const initialState = {
    loading: false,
    user: {
        name: "",
        email: "",
        contact: "",
        type: "",
        address: "",
    },
    error: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: "",
            }
        case USER_REGISTER_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: "",
            }
        case USER_LOGIN_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        case USER_LOGIN_CHECK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGIN_CHECK_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: "",
            }
        case USER_LOGIN_CHECK_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: {},
                error: "",
            }
        case USER_LOGOUT_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        case USER_PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                user: {
                    ...state,
                    contact: action.payload.contact,
                    address: action.payload.address,
                },
                error: "",
            }
        case USER_PROFILE_UPDATE_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        case USER_MARKS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_MARKS_UPDATE_SUCCESS:
            return {
                loading: false,
                user: {
                    ...state,
                    report: action.payload,
                },
                error: "",
            }
        case USER_MARKS_UPDATE_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.payload,
            }
        default:
            return state
    }
}

export default reducer;