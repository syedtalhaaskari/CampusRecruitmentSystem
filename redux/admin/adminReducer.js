import {
    FETCH_ADMIN_REQUEST,
    FETCH_ADMIN_SUCCESS,
    FETCH_ADMIN_FAILURE,
} from "./adminTypes"

const initialState = {
    loading: false,
    admin: [],
    error: "",
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ADMIN_SUCCESS:
            return {
                loading: false,
                admin: action.payload,
                error: "",
            }
        case FETCH_ADMIN_FAILURE:
            return {
                loading: false,
                admin: [],
                error: action.payload,
            }
        default:
            return state
    }
}

export default reducer;