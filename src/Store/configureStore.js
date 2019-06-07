import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { persistCombineReducers } from 'redux-persist'
// import Storage from 'redux-persist/lib/storage'
import AuthReducer from './Reducers/AuthReducer'
import PatientFormReducer from './Reducers/PatientFormReducer'
import PatientReducer from './Reducers/PatientReducer'
import AppointementFormReducer from './Reducers/AppointementFormReducer'
import AppointementReducer from './Reducers/AppointementReducer'
// import PatientFetchReducer from './Reducers/PatientFetchReducer'
import ReduxThunk from 'redux-thunk';

// const rootPersistConfig = {
//     key: 'root',
//     storage: Storage
// }

const reducer = combineReducers({
	AuthReducer: AuthReducer,
	patientForm: PatientFormReducer,
	patient: PatientReducer,
	AppointementForm: AppointementFormReducer,
	Appointement: AppointementReducer
	// PatientFetchReducer: PatientFetchReducer
});

// export default createStore(persistCombineReducers( rootPersistConfig, {AuthReducer}))
export default createStore(reducer, {}, applyMiddleware(ReduxThunk))