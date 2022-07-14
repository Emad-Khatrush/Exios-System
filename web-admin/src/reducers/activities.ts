import { GET_ACTIVITIES, STATUS_ERROR, STATUS_START, STATUS_SUCCESS } from "../constants/actions";
import { IStatus } from "./expenses";

export interface IActivities{
  listStatus: IStatus
  list: any[]
  total: number
}

export const initialState: IActivities = {
  listStatus: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null
  },
  list: [],
  total: 0
};

export const activity = (state: IActivities = initialState, action: any) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      switch (action.status) {
        case STATUS_START: {
          return {
            ...initialState,
            listStatus: {
              isLoading: true
            }
          };
        }
        
        case STATUS_SUCCESS: {                      
          return {
            ...state,
            listStatus: {
              isError: false,
              isSuccess: true,
              isLoading: false,
            },
            list: action.payload.data,
            total: action.payload?.data?.length
          }
        }
        case STATUS_ERROR: {
          return {
            ...state,
            listStatus: {
              isError: true,
              isSuccess: false,
              isLoading: false,
              message: action.payload.error.data.message
            }
          }
        }
      }
      break;

      default:
      return state;
  }
}