import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ADMIN_AUTH_FAILURE,
  ADMIN_AUTH_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN_FAILURE,
  LOGOUT_ADMIN_SUCCESS,
} from "../constants/admin";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

const loginAdminAction = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_ADMIN_REQUEST });
  try {
    const response = await axios.post("/admin/login_admin", userData);

    if (response.data.success) {
      dispatch({
        type: LOGIN_ADMIN_SUCCESS,
        payload: { Data: response.data.Data, message: response.data.message },
      });
    } else {
      dispatch({
        type: LOGIN_ADMIN_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_ADMIN_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const adminAuthenticationAction = () => async (dispatch) => {
  try {
    const response = await axios.get("/admin/admin_auth");

    if (response.data.success) {
      dispatch({
        type: ADMIN_AUTH_SUCCESS,
        payload: response.data.Data,
      });
    } else {
      dispatch({
        type: ADMIN_AUTH_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const logoutAdminAction = () => async (dispatch) => {
  try {
    const response = await axios.get("/admin/admin_logout");

    if (response.data.success) {
      dispatch({
        type: LOGOUT_ADMIN_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({
        type: LOGOUT_ADMIN_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_ADMIN_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const addStaffMembersAction = (formData) => async (dispatch) => {
  dispatch({ type: ADD_STAFF_REQUEST });
  try {
    const response = await axios.post("/admin/add_staff", formData);

    if (response.data.success) {
      dispatch({
        type: ADD_STAFF_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({ type: ADD_STAFF_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: ADD_STAFF_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export { loginAdminAction, adminAuthenticationAction, logoutAdminAction , addStaffMembersAction };
