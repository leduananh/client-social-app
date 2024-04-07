import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slice/auth'

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
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