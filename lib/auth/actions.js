"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_api_middleware_1 = require("redux-api-middleware");
const actions_1 = require("../operations/actions");
exports.createLoginAction = (endpoint) => {
    return (email, password) => async (dispatch) => dispatch(authenticate(endpoint, JSON.stringify({ email, password })));
};
exports.createOAuthCodeAction = (endpoint) => {
    return (provider, code) => async (dispatch) => dispatch(authenticate(endpoint, JSON.stringify({ provider, code })));
};
exports.refreshAccessToken = (endpoint, token) => redux_api_middleware_1.createAction({
    endpoint: endpoint,
    method: "POST",
    body: JSON.stringify({ refresh: token }),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    // @ts-ignore
    options: { timeout: 10000 },
    types: [
        "AUTH_REFRESH_REQUEST",
        "AUTH_REFRESH_SUCCESS",
        "AUTH_REFRESH_FAILURE",
    ],
});
// export const signup = (
//   email: string,
//   password: string
// ): RSAAAction<any, AuthPayload, void> =>
//   createAction({
//     endpoint: getFullAPIAddress("/auth/signup/", undefined, SSO_ADDR),
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//     headers: { "Content-Type": "application/json" },
//     types: [
//       actionTypes.SIGNUP_REQUEST,
//       actionTypes.SIGNUP_SUCCESS,
//       actionTypes.SIGNUP_FAILURE,
//     ],
//   });
/*
  Authenticate flow
  @param endpoint
  @param body
 */
const authenticate = (endpoint, body) => async (dispatch) => {
    const result = await dispatch(actions_1.journaledOperation(redux_api_middleware_1.createAction({
        endpoint,
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        types: [
            "AUTH_LOGIN_REQUEST",
            "AUTH_LOGIN_SUCCESS",
            "AUTH_LOGIN_FAILURE",
        ],
    }), "f"));
    if (!result.error) {
        localStorage.setItem("token", result.payload.refresh);
    }
};
exports.logout = () => async (dispatch) => {
    // Clear local storage at logout
    await localStorage.clear();
    dispatch({
        type: "AUTH_LOGOUT",
    });
};
exports.createGetTokenAtStartupAction = (endpoint) => {
    return () => async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            await dispatch(exports.refreshAccessToken(endpoint, token));
        }
        else {
            dispatch({
                type: "AUTH_STARTUP_TOKEN_FAILURE",
            });
        }
    };
};
