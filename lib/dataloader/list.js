"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function createDataLoaderListReducer(prefix = "") {
    const initialState = {
        data: [],
        error: undefined,
        status: "STATUS.LOADING",
    };
    return function (state = initialState, action) {
        switch (action.type) {
            case prefix + __1.LIST_REQUEST:
                return { ...state, status: "STATUS.LOADING" };
            case prefix + __1.LIST_SUCCESS:
                return {
                    ...state,
                    data: action.payload ? action.payload : [],
                    status: "STATUS.SUCCESS",
                };
            case prefix + __1.LIST_FAILURE:
                return {
                    ...state,
                    data: [],
                    status: "STATUS.FAILURE",
                    error: action ? action.error : false,
                };
            default:
                return state;
        }
    };
}
exports.createDataLoaderListReducer = createDataLoaderListReducer;
