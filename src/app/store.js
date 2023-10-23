import {configureStore} from "@reduxjs/toolkit"
import studentInfoReducer from "../features/student/studentInfoSlice"

export const store = configureStore({
    reducer:{student : studentInfoReducer},
})