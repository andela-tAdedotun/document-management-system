import axios from 'axios';

export const buildDispatchWithGet = (dispatch, apiEndpoint, actionType,
   payloadName) =>
  axios.get(apiEndpoint)
      .then((res) => {
        dispatch({
          type: actionType,
          [`${payloadName}`]: res.data
        });
      });

export const buildDispatchWithPost = (dispatch, apiEndpoint, postData,
      actionType, payloadName, responseProperty) =>
  axios.post(apiEndpoint, postData)
    .then((res) => {
      dispatch({
        type: actionType,
        [`${payloadName}`]: responseProperty ?
                            res.data[responseProperty] :
                            res.data
      });
    });

export const dispatchAction = (dispatch, actionObject) =>
  dispatch(actionObject);
