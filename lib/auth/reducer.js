"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const initialState = {
    access: undefined,
    refresh: undefined,
    status: "AUTH_STARTUP",
};
exports.authReducer = (state = initialState, action) => {
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
                    ...jwt_decode_1.default(action.payload.access),
                    token: action.payload.access,
                },
                refresh: {
                    ...jwt_decode_1.default(action.payload.refresh || ""),
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
