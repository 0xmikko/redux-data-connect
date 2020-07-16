"use strict";
/**
 * Copyright 2020 Mikael Lazarev
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const redux_api_middleware_1 = require("redux-api-middleware");
const __1 = require("..");
exports.journaledOperation = (action, opHash) => async (dispatch) => {
    dispatch(exports.updateStatus(opHash || "0", "STATUS.LOADING"));
    const result = await dispatch(action);
    if (result === undefined || result.error) {
        if (result instanceof redux_api_middleware_1.InternalError || result instanceof redux_api_middleware_1.RequestError) {
            dispatch(exports.updateStatus(opHash || "0", "STATUS.FAILURE", result.message));
        }
        else if (result instanceof redux_api_middleware_1.ApiError) {
            dispatch(exports.updateStatus(opHash || "0", "STATUS.FAILURE", result.message));
        }
        else {
            dispatch(exports.updateStatus(opHash || "0", "STATUS.FAILURE", "Network error"));
        }
    }
    else
        dispatch(exports.updateStatus(opHash || "0", "STATUS.SUCCESS"));
    return result;
};
exports.updateStatus = (opHash, status, error) => ({
    type: index_1.OPERATION_PREFIX + __1.DETAIL_SUCCESS,
    payload: {
        id: opHash,
        status,
        error,
    },
});
exports.connectSocket = () => async (dispatch) => {
    dispatch({
        type: "SOCKET_ON",
        namespace: index_1.namespace,
        event: "operations:update",
        typeOnSuccess: index_1.OPERATION_PREFIX + __1.DETAIL_SUCCESS,
    });
};
