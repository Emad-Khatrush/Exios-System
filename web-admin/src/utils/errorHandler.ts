import { ApiErrorMessages } from "../models";
import { EXPENSE_ID_TAKEN, EXPENSE_NOT_FOUND, FIELDS_EMPTY, IMAGE_NOT_FOUND, INVALID_CREDENTIALS, INVALID_TOKEN, ORDER_ID_TAKEN, ORDER_NOT_FOUND, SERVER_ERROR, Token_EXPIRED, TOKEN_NOT_FOUND, USER_NOT_FOUND } from "../constants/errors";

export const getErrorMessage = (errorId: ApiErrorMessages): string => {
  
  switch (errorId) {
    case USER_NOT_FOUND:
      return 'We could not find the username';

    case INVALID_CREDENTIALS:
      return 'Username or password is wrong';

    case TOKEN_NOT_FOUND:
      return 'The session has been expired, please login again';
    
    case Token_EXPIRED:
      window.location.reload();
      return 'The session has been expired, please login again';

    case INVALID_TOKEN:
      // this is a temportary fix, unit i fix it from api
      window.location.reload();
      return 'The session has been expired, please login again';

    case ORDER_ID_TAKEN:
      return 'The order id is already taken, please try again';

    case ORDER_NOT_FOUND:
      return 'Order are not found';

    case EXPENSE_ID_TAKEN:
      return 'The Expense id is already taken, please try again';

    case EXPENSE_NOT_FOUND:
      return 'The Expense are not found';
      
    case IMAGE_NOT_FOUND:
      return 'The Image is not found';
    
    case FIELDS_EMPTY:
      return 'The fields of the form is empty, please fill the form and try again';

    case SERVER_ERROR:
      return 'Something went wrong, please try again later';
  
    default:
      return 'unexpected error, please try again later';
  }
}