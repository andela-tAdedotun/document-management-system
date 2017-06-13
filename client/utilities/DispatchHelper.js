import axios from 'axios';

/**
 * buildDispatchWithGet - dispatches action after making GET ajax call
 *
 * @param  {function} dispatch - dispatch function
 * @param  {string} apiEndpoint - endpoint to call
 * @param  {string} actionType - action type to be dispatched
 * @param  {string} payloadName - name of payload for action
 * @return {Promise}       axios AJAX call to api endpoint
 */
export const buildDispatchWithGet = (dispatch, apiEndpoint, actionType,
   payloadName) =>
  axios.get(apiEndpoint)
      .then((res) => {
        dispatch({
          type: actionType,
          [`${payloadName}`]: res.data
        });
      });

/**
 * buildDispatchWithPost - dispatches action after making POST ajax call
 *
 * @param  {function} dispatch - dispatch function
 * @param  {string} apiEndpoint - endpoint to call
 * @param  {object} postData - data to be posted
 * @param  {string} actionType - action type to be dispatched
 * @param  {string} payloadName - name of payload for action
 * @param  {string} responseProperty - property of response object
 * @return {Promise}       axios AJAX call to api endpoint
 */
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

/**
 * dispatchAction - dispatches action object
 *
 * @param  {function} dispatch - dispatch function
 * @param  {object} actionObject - object to be dispatched
 * @return {function}       dispatch function
 */
export const dispatchAction = (dispatch, actionObject) =>
  dispatch(actionObject);
