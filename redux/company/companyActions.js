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
import database from "@react-native-firebase/database"

export const postVacancyRequest = () => {
    return {
        type: FETCH_COMPANY_REQUEST,
    }
}

export const postVacancySuccess = company => {
    return {
        type: FETCH_COMPANY_SUCCESS,
        payload: company,
    }
}

export const postVacancyFailure = error => {
    return {
        type: FETCH_COMPANY_FAILURE,
        payload: error,
    }
}

export const postVacancy = (data, uid) => {
    return dispatch => {
        dispatch(postVacancyRequest)
        database().ref(`/posts/${uid}`).update(data)
            .then(() => dispatch(postVacancySuccess(data)))
            .catch((error) => dispatch(postVacancyFailure(error.message)))
    }
}

export const fetchVacancyRequest = () => {
    return {
        type: FETCH_VACANCY_REQUEST,
    }
}

export const fetchVacancySuccess = company => {
    return {
        type: FETCH_VACANCY_SUCCESS,
        payload: company,
    }
}

export const fetchVacancyFailure = error => {
    return {
        type: FETCH_VACANCY_FAILURE,
        payload: error,
    }
}

export const fetchVacancy = () => {
    return dispatch => {
        dispatch(fetchVacancyRequest)
        database().ref(`/posts`).orderByKey().once("value", function (snapshot) {
            snapshot.forEach(function (child) {
                dispatch(fetchVacancySuccess(child.val()))
            })
        })
    }
}

export const companyPostDeleteRequest = () => {
    return {
        type: COMPANY_POST_DELETE_REQUEST,
    }
}

export const companyPostDeleteSuccess = () => {
    return {
        type: COMPANY_POST_DELETE_SUCCESS,
    }
}

export const companyPostDeleteFailure = error => {
    return {
        type: COMPANY_POST_DELETE_FAILURE,
        payload: error,
    }
}

export const companyPostDelete = (data) => {
    return dispatch => {
        dispatch(companyPostDeleteRequest)
        database().ref(`/posts/${data}`).remove()
            .then(() => dispatch(companyPostDeleteSuccess()))
            .catch((error) => dispatch(companyPostDeleteFailure(error.message)))
    }
}