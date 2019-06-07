import {
	APPOINTEMET_UPDATE,
	APPOINTEMET_CREATE,
	APPOINTEMET_SAVE_SUCCESS
} from '../../actions/types';

var date = new Date().getDate(); 
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var hours = new Date().getHours();
var min = new Date().getMinutes();
var sec = new Date().getSeconds();

const INITIAL_STATE = {
	uid: '',
	date: year + '/' + month + '/' + date+ ' ' + hours + ':' + min + ':' + sec,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case APPOINTEMET_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case APPOINTEMET_CREATE:
			return INITIAL_STATE;
		case APPOINTEMET_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
};