import * as firebase from 'firebase';
import {
	PATIENT_UPDATE,
	PATIENT_CREATE,
	PATIENTS_FETCH_SUCCESS,
	PATIENT_SAVE_SUCCESS
} from './types';


export const patientUpdate = ({ prop, value }) => {
    return {
        type: PATIENT_UPDATE,
        payload: { prop, value }
    };
};

// uploadImage = async (avatar) => {
// 	// console.log(avatar)
// 	const response = await fetch(avatar)
// 	console.log(response)
// 	// const blob = await response.blob()
// 	// var ref = firebase.storage().ref().child("images/test")
// 	// ref.put(blob).then(() => {
// 	// 	console.log('success')
// 	// }).catch((error) => {
// 	// 	console.log('error')
// 	// });
// }

export const patientCreate = ({ name, nCarte, phone, maladie, date, email, gendre, favorite, navigate }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/patient`)
		.push({ name, nCarte, phone, maladie, date, email, gendre, favorite })
		.then(() => {
			// this.uploadImage(avatar)
			dispatch({ type: PATIENT_CREATE });
			navigate.goBack()
		});
	};
};

export const patientFetch = () => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/patient`)
		.on('value', snapshot => {
			dispatch({ type: PATIENTS_FETCH_SUCCESS, payload: snapshot.val() });
		});
	};
};

export const patientEdited = ({ name, nCarte, phone, maladie, date, email, gendre, favorite, uid, navigate }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}`)
			.set({ name, nCarte, phone, maladie, date, email, gendre, favorite, uid })
			.then(() => {
				dispatch({ type: PATIENT_SAVE_SUCCESS });
				// navigate.navigate('PatientAction')
				navigate.goBack()
			});
	};
};


export const patientDelete = ({ uid, navigate }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}`)
			.remove()
			.then(() => {
				navigate.goBack()
			});
	};
};