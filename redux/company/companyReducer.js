import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
} from "./companyTypes"

const initialState = {
    loading: false,
    company: [],
    error: "",
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_COMPANY_SUCCESS:
            return {
                loading: false,
                company: action.payload,
                error: "",
            }
        case FETCH_COMPANY_FAILURE:
            return {
                loading: false,
                company: [],
                error: action.payload,
            }
        default:
            return state
    }
}

export default reducer;