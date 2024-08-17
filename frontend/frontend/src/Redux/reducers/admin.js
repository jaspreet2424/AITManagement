import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ADMIN_AUTH_FAILURE,
  ADMIN_AUTH_SUCCESS,
  EMPTY_FAILURE_MESSAGE,
  EMPTY_SUCCESS_MESSAGE,
  LOGIN_ADMIN_FAILURE,
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN_FAILURE,
  LOGOUT_ADMIN_SUCCESS,
} from "../constants/admin";

const adminInitialState = {
  Admin: {},
  isLoading: false,
  success: "",
  failure: "",
};

const adminReducer = (state = adminInitialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        Admin: action.payload.Data,
      };

    case LOGIN_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    case ADMIN_AUTH_SUCCESS:
      return {
        ...state,
        Admin: action.payload,
      };

    case ADMIN_AUTH_FAILURE:
      return {
        ...state,
        failure: action.payload,
      };

    case LOGOUT_ADMIN_SUCCESS:
      return {
        ...state,
        Admin: {},
        success: action.payload,
      };

    case LOGOUT_ADMIN_FAILURE:
      return {
        ...state,
        failure: action.payload,
      };

    case ADD_STAFF_REQUEST:
      return {
        ...state,
        isLoading : true,
      }

    case ADD_STAFF_SUCCESS:
      return {
        ...state , 
        isLoading : false,
        success : action.payload,
      }

    case ADD_STAFF_FAILURE:
      return {
        ...state,
        isLoading : false,
        failure : action.payload,
      }

    case EMPTY_SUCCESS_MESSAGE:
      return {
        ...state,
        success: "",
      };

    case EMPTY_FAILURE_MESSAGE:
      return {
        ...state,
        failure: "",
      };

    default:
      return state;
  }
};

export { adminReducer };
