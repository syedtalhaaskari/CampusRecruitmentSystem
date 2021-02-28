import companyReducer from "./company/companyReducer"
import studentReducer from "./student/studentReducer"
import adminReducer from "./admin/adminReducer"
import userReducer from "./user/userReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    company: companyReducer,
    student: studentReducer,
    admin: adminReducer,
    user: userReducer,
})

export default rootReducer;