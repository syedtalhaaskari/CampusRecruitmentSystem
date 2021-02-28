import {
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAILURE,
} from "./studentTypes"
import database from "@react-native-firebase/database"

export const fetchStudentRequest = () => {
    return {
        type: FETCH_STUDENT_REQUEST,
    }
}

export const fetchStudentSuccess = student => {
    return {
        type: FETCH_STUDENT_SUCCESS,
        payload: student,
    }
}

export const fetchStudentFailure = error => {
    return {
        type: FETCH_STUDENT_FAILURE,
        payload: error,
    }
}

export const fetchStudent = () => {
    return dispatch => {
        dispatch(fetchStudentRequest)
        database().ref("/").orderByChild("type").equalTo("Student").on("value", function (snapshot) {
            snapshot.forEach(function (child) {
                dispatch(fetchStudentSuccess(child.val())) // NOW THE CHILDREN PRINT IN ORDER    
            });
        })
    }
}