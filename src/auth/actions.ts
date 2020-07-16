import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  createAction,
  RSAAAction,
} from "redux-api-middleware";
import { AuthActions, TokenPayload } from "./index";
import { journaledOperation } from "../operations/actions";
import { DataConnectRootStateI } from "..";

export const createLoginAction = (endpoint: string) => {
  return (
    email: string,
    password: string
  ): ThunkAction<void, DataConnectRootStateI, unknown, AuthActions> => async (
    dispatch
  ) => dispatch(authenticate(endpoint, JSON.stringify({ email, password })));
};

export const createOAuthCodeAction = (endpoint: string) => {
  return (
    provider: string,
    code: string
  ): ThunkAction<void, DataConnectRootStateI, unknown, AuthActions> => async (
    dispatch
  ) => dispatch(authenticate(endpoint, JSON.stringify({ provider, code })));
};

export const refreshAccessToken = (
  endpoint: string,
  token: string
): RSAAAction<any, TokenPayload, void> =>
  createAction({
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
const authenticate = (
  endpoint: string,
  body: string
): ThunkAction<void, DataConnectRootStateI, unknown, Action<string>> => async (
  dispatch
) => {
  const result = await dispatch(
    journaledOperation(
      createAction({
        endpoint,
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        types: [
          "AUTH_LOGIN_REQUEST",
          "AUTH_LOGIN_SUCCESS",
          "AUTH_LOGIN_FAILURE",
        ],
      }),
      "f"
    )
  );

  if (!result.error) {
    localStorage.setItem("token", (result.payload as TokenPayload).refresh);
  }
};

export const logout = (): ThunkAction<
  void,
  DataConnectRootStateI,
  unknown,
  AuthActions
> => async (dispatch) => {
  // Clear local storage at logout
  await localStorage.clear();
  dispatch({
    type: "AUTH_LOGOUT",
  });
};

export const createGetTokenAtStartupAction = (endpoint: string) => {
  return (): ThunkAction<
    void,
    DataConnectRootStateI,
    unknown,
    AuthActions
  > => async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      await dispatch(refreshAccessToken(endpoint, token));
    } else {
      dispatch({
        type: "AUTH_STARTUP_TOKEN_FAILURE",
      });
    }
  };
};
