import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
    FETCH_VACANCY_REQUEST,
    FETCH_VACANCY_SUCCESS,
    FETCH_VACANCY_FAILURE,
    COMPANY_POST_DELETE_REQUEST,
    COMPANY_POST_DELETE_SUCCESS,
    COMPANY_POST_DELETE_FAILURE,
} from "./companyTypes"

const initialState = {
    loading: false,
    company: [],
    error: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        case FETCH_VACANCY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_VACANCY_SUCCESS:
            return {
                loading: false,
                company: [...state.company, action.payload],
                error: "",
            }
        case FETCH_VACANCY_FAILURE:
            return {
                loading: false,
                company: [],
                error: action.payload,
            }
        case COMPANY_POST_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMPANY_POST_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case COMPANY_POST_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default reducer;