import { CREATE_INVOICE, GET_INVOICES, RESET_INVOICE, STATUS_ERROR, STATUS_START, STATUS_SUCCESS } from "../constants/actions";
import { Invoice } from "../models";

export interface IStatus {
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  message: string | null
}

export interface IInvoice{
  listStatus: IStatus
  list: Invoice[]
  total: number
}

export const initialState: IInvoice = {
  listStatus: {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null
  },
  list: [],
  total: 0
};

export const invoice = (state: IInvoice = initialState, action: any) => {
  switch (action.type) {
    case RESET_INVOICE:
      return initialState;

    case CREATE_INVOICE:
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
              message: 'Invoice has been created Successfully',
            }
          }
        }
        case STATUS_ERROR: {
          return {
            ...state,
            listStatus: {
              isError: true,
              isSuccess: false,
              isLoading: false,
              message: action.payload.error?.data?.message
            }
          }
        }
      }
      break;

      case GET_INVOICES: 
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
                message: action.payload.error?.data?.message
              }
            }
          }
        }
        break;
  
    default:
      return state;
  }
}