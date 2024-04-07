import { configureStore } from '@reduxjs/toolkit'
import {  reducer as authReducer } from './slice/auth'

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// có slice 
// window.redux_store = {
//     auth: {
//         isAuth: true,
//         userInfo: {
            
//         }
//     },
//     notification: {
//     }
// }

//  ko có
// window.redux_store = {

// }