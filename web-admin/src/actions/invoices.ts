import { Action, Dispatch } from "redux"
import api from "../api";
import { CREATE_INVOICE, GET_INVOICES, RESET_INVOICE, STATUS_ERROR, STATUS_LOADING, STATUS_START, STATUS_SUCCESS, SWITCH_TAB } from "../constants/actions";

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
        dispatch({
          payload: { error },
          status: STATUS_ERROR,
          type: CREATE_INVOICE,
        });
      })
  }
}

export const getAllInvoices = (config?: { skip?: number, limit?: number, tabType?: string }) => {
  
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: STATUS_START,
      type: GET_INVOICES,
    });

    api.get('invoices', config)
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

export const getCurrentTabInvoices = (config?: { skip?: number, limit?: number, tabType?: string }) => {
  
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: SWITCH_TAB,
      type: GET_INVOICES,
    });

    api.get('orders', config)
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

export const getDefualtInvoices = (config?: { skip?: number, limit?: number, tabType?: string }) => {
  
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: STATUS_START,
      type: GET_INVOICES,
    });

    api.get('orders', config)
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

export const getInvoices = (config?: { skip?: number, limit?: number, tabType?: string }) => {
  
  return (dispatch: Dispatch<Action>): void => {
    dispatch({
      status: STATUS_LOADING,
      type: GET_INVOICES,
    });

    api.get('orders', config)
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

export const getInvoicesBySearch = (query?: { searchValue: string, selectorValue: string, tabType: string }) => {
  return (dispatch: Dispatch<Action>): void => {

    dispatch({
      status: SWITCH_TAB,
      type: GET_INVOICES,
    });

    api.get(`orders/${query?.searchValue}/${query?.selectorValue}?tabType=${query?.tabType}`)
      .then(({ data }) => {
        dispatch({
          payload: { data, searching: true },
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
