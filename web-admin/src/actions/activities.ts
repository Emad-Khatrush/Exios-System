import { Action, Dispatch } from "redux"
import api from "../api";
import { GET_ACTIVITIES, STATUS_ERROR, STATUS_START, STATUS_SUCCESS } from "../constants/actions";

export const getActivities = () => {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: STATUS_START,
      type: GET_ACTIVITIES,
    });

    api.get('activities')
      .then(({ data }) => {
        dispatch({
          payload: { data },
          status: STATUS_SUCCESS,
          type: GET_ACTIVITIES,
        });
      })
      .catch(error => {
        dispatch({
          payload: { error },
          status: STATUS_ERROR,
          type: GET_ACTIVITIES,
        });
      })
  }
}