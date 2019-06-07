import * as firebase from 'firebase';
import {
	APPOINTEMET_UPDATE,
	APPOINTEMET_CREATE,
	APPOINTEMET_FETCH_SUCCESS
} from './types';


export const appointementUpdate = ({ prop, value }) => {
    return {
        type: APPOINTEMET_UPDATE,
        payload: { prop, value }
    };
};

export const appointementCreate = ({ uid, date, navigate }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}/appointement`).once("value", snapshot => {
			if (snapshot.exists()){
				firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}/appointement`).remove().then(() => {
					firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}/appointement`)
					.push({ date })
					.then(() => {
						dispatch({ type: APPOINTEMET_CREATE });
						navigate.goBack()
					});
				})
			}else{
				firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}/appointement`).push({ date }).then(() => {
					dispatch({ type: APPOINTEMET_CREATE });
					navigate.goBack()
				});
			}
		})
	};
};

export const appointementFetch = () => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/patient`)
		.on('value', snapshot => {
			dispatch({ type: APPOINTEMET_FETCH_SUCCESS, payload: snapshot.val() });
		});
	};
};


export const appointementDelete = ({ uid, navigate }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/patient/${uid}/appointement`)
			.remove()
	};
};