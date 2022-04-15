import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userConstant";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const { data } = await axios.post(
            SERVER_URL + "account/login/",
            formData,
            config
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });

    }
};

export const register =
    (first_name, last_name, email, password) => async dispatch => {
        try {
            const formData = new FormData();
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("email", email);
            formData.append("password", password);
            dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
            console.log(formData);
            const { data } = await axios.post(
                SERVER_URL + "account/register/",
                formData
            );
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch(login(email, password));
        } catch (error) {
            dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message });
        }
    };

export const logout = () => dispatch => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
};

export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(SERVER_URL + `user/`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
    }
};
