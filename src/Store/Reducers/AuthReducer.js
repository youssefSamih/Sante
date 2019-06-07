import {
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	EMAIL_CHANGED, 
	PASSWORD_CHANGED
} from '../../actions/types';

const INITIAL_STATE = { email: 'test@test.com', password: 'Azerty@1234', user: null, error: '', loading: false };

export default (state = INITIAL_STATE, action) => {
	// console.log(action);

	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_FAIL:
			return { ...state, error: 'Authentication Failed.', loading: false, password: '' };
		default:
			return state;
	}
};
