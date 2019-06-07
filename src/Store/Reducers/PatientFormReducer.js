import {
	PATIENT_UPDATE,
	PATIENT_CREATE,
	PATIENT_SAVE_SUCCESS
} from '../../actions/types';

var date = new Date().getDate(); 
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var hours = new Date().getHours();
var min = new Date().getMinutes();
var sec = new Date().getSeconds();

const INITIAL_STATE = {
	name: '',
	nCarte: '',
	phone:'',
	maladie:'',
	gendre: '',
	// avatar: require('../../images/ic_tag_faces.png'),
	date: year + '/' + month + '/' + date+ ' ' + hours + ':' + min + ':' + sec,
	favorite: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PATIENT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case PATIENT_CREATE:
			return INITIAL_STATE;
		case PATIENT_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
};