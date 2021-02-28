import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
} from "./companyTypes"
import axios from "axios"

export const fetchStudentRequest = () => {
    return {
        type: FETCH_COMPANY_REQUEST,
    }
}

export const fetchStudentSuccess = company => {
    return {
        type: FETCH_COMPANY_SUCCESS,
        payload: company,
    }
}

export const fetchStudentFailure = error => {
    return {
        type: FETCH_COMPANY_FAILURE,
        payload: error,
    }
}

export const fetchStudent = () => {
    return dispatch => {
        dispatch(fetchStudentRequest)
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                const company = response.data
                dispatch(fetchStudentSuccess(company))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchStudentFailure(errorMsg))
            })
    }
}