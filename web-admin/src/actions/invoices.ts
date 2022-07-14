import { Action, Dispatch } from "redux"
import api from "../api";
import { CREATE_INVOICE, GET_INVOICES, RESET_INVOICE, STATUS_ERROR, STATUS_START, STATUS_SUCCESS } from "../constants/actions";

export const resetInvoice = () => {
  return (dispatch: Dispatch<Action>): void => {    
    dispatch({
      type: RESET_INVOICE
    });
  }
}

export const createInvoice = (data: any) => {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: STATUS_START,
      type: CREATE_INVOICE,
    });

    api.fetchFormData('orders', 'POST', data)
      .then((res: any) => {
        console.log(res);
        
        if (res.status === 200) {
          dispatch({
            status: STATUS_SUCCESS,
            type: CREATE_INVOICE,
          });
        } else {
          dispatch({
            payload: { error: res.statusText },
            status: STATUS_ERROR,
            type: CREATE_INVOICE,
          });
        }
        // window.setTimeout(function(){
        //   window.location.replace('/expenses');
        // }, 2500);
      })
      .catch(error => {
        console.log(error);
        
        dispatch({
          payload: { error },
          status: STATUS_ERROR,
          type: CREATE_INVOICE,
        });
      })
  }
}

export const getInvoices = () => {
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: STATUS_START,
      type: GET_INVOICES,
    });

    api.get('orders')
      .then(({ data }) => {
        dispatch({
          payload: { data },
          status: STATUS_SUCCESS,
          type: GET_INVOICES,
        });
      })
      .catch(error => {
        dispatch({
          payload: { error },
          status: STATUS_ERROR,
          type: GET_INVOICES,
        });
      })
  }
}
