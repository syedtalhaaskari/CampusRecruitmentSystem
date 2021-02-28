import {
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAILURE,
} from "./studentTypes"

const initialState = {
    loading: false,
    student: [],
    error: "",
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_STUDENT_SUCCESS:
            return {
                loading: false,
                student: [...state.student, action.payload],
                error: "",
            }
        case FETCH_STUDENT_FAILURE:
            return {
                loading: false,
                student: [],
                error: action.payload,
            }
        default:
            return state
    }
}

export default reducer;