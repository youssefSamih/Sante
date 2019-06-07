import firebase from 'firebase';
import { 
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAIL, 
	LOGIN_USER,
	EMAIL_CHANGED, 
	PASSWORD_CHANGED
} from './types';

export const loginUser = ({ email, password, navigate }) => {
	// console.log(email +' '+ password)
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });
		
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user, navigate))
			.catch((error) => {
				// console.log(error);
					loginUserFail(dispatch);
		});
	};
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user, navigate) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	navigate.navigate("Dashboard");
};

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};