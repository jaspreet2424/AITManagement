import {configureStore} from '@reduxjs/toolkit';
import { adminReducer } from './reducers/admin';

const myStore = new configureStore({
    reducer : {
        AdminGS : adminReducer,
    }
})

export default myStore;