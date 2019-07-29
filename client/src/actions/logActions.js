import {
	GET_LOGS,
	SET_LOADING,
	LOGS_ERROR,
	ADD_LOG,
	DELETE_LOG,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOG,
	SEARCH_LOGS
} from './types';

// export const getLogs = () => {
// 	return async (dispatch) => {
// 		setLoading();
// 		const res = await fetch('/logs');
// 		const data = await res.json();
// 		dispatch({ type: GET_LOGS, payload: data });
// 	};
// };

// get existing logs
export const getLogs = () => async (dispatch) => {
	setLoading();
	try {
		const res = await fetch('/logs');
		const data = await res.json();
		dispatch({ type: GET_LOGS, payload: data });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.data });
	}
};

// Add a new log
export const addLog = (log) => async (dispatch) => {
	setLoading();
	try {
		const config = {
			body: JSON.stringify(log),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		};
		const res = await fetch('/logs', config);
		const data = await res.json();
		dispatch({ type: ADD_LOG, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({ type: LOGS_ERROR, payload: error.response.data });
	}
};

// delete log
export const deleteLog = (id) => async (dispatch) => {
	setLoading();
	try {
		await fetch(`/logs/${id}`, { method: 'DELETE' });
		dispatch({ type: DELETE_LOG, payload: id });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.data });
	}
};

// Update log
export const updateLog = (update) => async (dispatch) => {
	setLoading();
	try {
		const config = {
			body: JSON.stringify(update),
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' }
		};
		const res = await fetch(`/logs/${update.id}`, config);
		const data = await res.json();
		dispatch({ type: UPDATE_LOG, payload: data });
		clearCurrent();
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.data });
	}
};

// search logs
export const searchLogs = (text) => async (dispatch) => {
	setLoading();
	try {
		const res = await fetch(`/logs?q=${text}`);
		const data = await res.json();
		dispatch({ type: SEARCH_LOGS, payload: data });
	} catch (error) {
		dispatch({ type: LOGS_ERROR, payload: error.response.data });
	}
};

// set current log
export const setCurrent = (log) => {
	return {
		type: SET_CURRENT,
		payload: log
	};
};

// Clear current log
export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT
	};
};

// set loading
export const setLoading = () => {
	return { type: SET_LOADING };
};
