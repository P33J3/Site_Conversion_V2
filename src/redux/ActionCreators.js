import * as ActionTypes from "./ActionTypes";
// import { CAMPSITES } from '../shared/campsites';
import { baseUrl } from "../shared/baseUrl";

export const addComment = (campsiteId, rating, author, text) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: {
		campsiteId: campsiteId,
		rating: rating,
		author: author,
		text: text,
	},
});

export const fetchCampsites = () => (dispatch) => {
	dispatch(campsitesLoading());

	return (
		fetch(baseUrl + "campsites")
			//fetch api automatically returns a promise which is chained with response.json to turn json into javascript;
			// the result is automatically captured in your following variable (eg campsites)
			.then(
				(response) => {
					if (response.ok) {
						return response;
					} else {
						const error = new Error(
							`Error ${response.status} : ${response.statusText}`
						);
						error.response = response;
						throw error;
					}
				},
				// rejected promise (did not receive a response from the server at all)
				(error) => {
					const errMess = new Error(error.message);
					throw errMess;
				}
			)
			.then((response) => response.json())
			.then((campsites) => dispatch(addCampsites(campsites)))
			.catch((error) => dispatch(campsitesFailed(error.message)))
	);

	//following code was used to simulate a call to a server
	// setTimeout(() => {
	//     dispatch(addCampsites(CAMPSITES));
	// }, 2000);
};

export const campsitesLoading = () => ({
	type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMess) => ({
	type: ActionTypes.CAMPSITES_FAILED,
	payload: errMess,
});

export const addCampsites = (campsites) => ({
	type: ActionTypes.ADD_CAMPSITES,
	payload: campsites,
});

export const fetchComments = () => (dispatch) => {
	return fetch(baseUrl + "comments")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status} : ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			// rejected promise (did not receive a response from the server at all)
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errMess,
});

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments,
});

export const fetchPromotions = () => (dispatch) => {
	dispatch(promotionsLoading());

	return fetch(baseUrl + "promotions")
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(
						`Error ${response.status} : ${response.statusText}`
					);
					error.response = response;
					throw error;
				}
			},
			// rejected promise (did not receive a response from the server at all)
			(error) => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then((response) => response.json())
		.then((promotions) => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
	type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errMess) => ({
	type: ActionTypes.PROMOTIONS_FAILED,
	payload: errMess,
});

export const addPromotions = (promotions) => ({
	type: ActionTypes.ADD_PROMOTIONS,
	payload: promotions,
});
