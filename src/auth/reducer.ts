/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import jwtDecode from "jwt-decode";
import { AuthStateType, AuthActions, TokenDTO, } from "./index";

const initialState: AuthStateType = {
  access: undefined,
  refresh: undefined,
  status: "AUTH_STARTUP",
};

export default (
  state: AuthStateType = initialState,
  action: AuthActions
): AuthStateType => {

  switch (action.type) {
    case "AUTH_STARTUP_TOKEN_FAILURE":
      return {
        ...state,
        status: "AUTH_REQUIRED",
      };

    case "AUTH_LOGIN_SUCCESS":
    case "AUTH_REFRESH_SUCCESS":
    case "AUTH_SIGNUP_SUCCESS":
      return {
        ...state,
        access: {
          ...jwtDecode<TokenDTO>(action.payload.access),
          token: action.payload.access,
        },
        refresh: {
          ...jwtDecode<TokenDTO>(action.payload.refresh || ""),
          token: action.payload.refresh || "",
        },
        status: "AUTH_SUCCESS",
      };

    case "AUTH_LOGIN_FAILURE":
    case "AUTH_REFRESH_FAILURE":
    case "AUTH_SIGNUP_FAILURE":
    case "AUTH_LOGOUT":
      return {
        ...state,
        access: undefined,
        refresh: undefined,
        status: "AUTH_REQUIRED",
      };

    default:
      return state;
  }
};
