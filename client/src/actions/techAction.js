import { ADD_TECH, GET_TECHS, DELETE_TECH, TECHS_ERROR, SET_LOADING } from './types';

// get existing techs
export const getTechs = () => async (dispatch) => {
	setLoading();
	try {
		const res = await fetch('/techs');
		const data = await res.json();
		dispatch({ type: GET_TECHS, payload: data });
	} catch (error) {
		dispatch({ type: TECHS_ERROR, payload: error.response.data });
	}
};

// Add tech
export const addTech = (tech) => async (dispatch) => {
	setLoading();
	try {
		const config = {
			body: JSON.stringify(tech),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		};
		const res = await fetch('/techs', config);
		const data = await res.json();
		dispatch({ type: ADD_TECH, payload: data });
	} catch (error) {
		dispatch({ type: TECHS_ERROR, payload: error.response.data });
	}
};

// delete tech
export const deleteTech = (id) => async (dispatch) => {
	setLoading();
	try {
		await fetch(`/techs/${id}`, { method: 'DELETE' });
		dispatch({ type: DELETE_TECH, payload: id });
	} catch (error) {
		dispatch({ type: TECHS_ERROR, payload: error.response.data });
	}
};

// set loading
export const setLoading = () => {
	return { type: SET_LOADING };
};
